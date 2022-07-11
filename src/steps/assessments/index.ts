import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  IntegrationMissingKeyError,
  getRawData,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Steps, Relationships, Entities } from '../constants';
import {
   createAssessmentEntity,
   createAssessmentResultsEntity,
   createAssessmentResultsRelationship
 } from './converter';
import { ACCOUNT_ENTITY_KEY } from '../account';


export async function fetchAssessmentsDetails({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config, logger);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateAssessments(async (assessment) => {
    const assessmentEntity = await jobState.addEntity(createAssessmentEntity(assessment))
  });
}

export async function fetchAssessmentsResultsDetails({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config, logger);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateAssessmentsResults(async (assessmentResults) => {
    const assessmentResultsEntity = await jobState.addEntity(createAssessmentResultsEntity(assessmentResults))
  });

  await jobState.addRelationship(
    createDirectRelationship({
      _class: RelationshipClass.HAS,
      from: assessmentEntity,
      to: assessmentResultsEntity
,    })
  )
}


export function buildAssessmentResultsRelationships({
  jobState,
  logger,
} : IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.ASSESSMENT._type },
    async (assessmentEntity) => {
      const assessment = getRawData<Assessment>(assessmentEntity);
      if (!assessment) {
        lgger.warn(
          {_key: assessmentEntity._key },
          'Could not get raw data for assessment entity',
        );
        return;
      }

      for (const result of assessment.results || []) {
        const resultEntity = await jobState.findEntity(result.id);
        if (!resultEntity) {
          throw new IntegrationMissingKeyError(
            `Expected result with key to exist (key={result.id})`,
          );
        }

        await jobState.addRelationship(
          createAssessmentResultsRelationship(assessmentEntity, resultEntity),
        );
      }
    },
  );
}

export const assessmentSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ASSESSMENTS,
    name: 'Fetch Assessments Details',
    entities: [Entities.ASSESSMENT],
    relationships: [],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchAssessmentsDetails,
  },
  {
    id: Steps.ASSESSMENTRESULTS,
    name: 'Fetch Assessments Details',
    entities: [Entities.ASSESSMENTRESULTS],
    relationships: [Relationships.ASSESSMENT_HAS_RESULTS],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchAssessmentsResultsDetails,
  },
  {
    id: Steps.ASSESSMENT_RESULTS_RELATIONSHIPS,
    name: 'Build Group -> Result Relationships',
    entities: [],
    relationships: [Relationships.ASSESSMENT_HAS_RESULTS],
    dependsOn: [Steps.ASSESSMENT, Steps.ASSESSMENTRESULTS],
    executionHandler: buildAssessmentResultsRelationships,
  }

];
