import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  getRawData,
} from '@jupiterone/integration-sdk-core';


import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Steps, Entities, Relationships } from '../constants';
import { createAssessmentResultsEntity } from './converter';
import { ACCOUNT_ENTITY_KEY } from '../account';


export async function fetchAssessmentResultsDetails({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config, logger);

   await jobState.iterateEntities(
     { _type: Entities.ASSESSMENT._type },
     async(assessmentEntity) => {
       const assessmentId = getRawData<Assessment>(assessmentEntity).assessmentId;
       await apiClient.iterateAssessmentResults({assessmentId: assessmentId}, async (assessmentResults) => {
         const assessmentResultsEntity = await jobState.addEntity(createAssessmentResultsEntity(assessmentResults))
       });
  });
// await jobState.iterateEntities(
//    { _type: Entities.ASSESSMENT._type },
//    async(assessmentEntity) => {
//      const assessmentId = getRawData<Assessment>(assessmentEntity).assessmentId;
//      await apiClient.iterateAssessmentResults(
//        { assessmentId: assessmentId },
//        async (assessmentResults) => {
//          const assessmentResultsEntity = createAssessmentResultsEntity(assessmentResults);
//          await jobState.addEntity(assessmentResultsEntity);
//
//          const assessmentResultsRelationships = createDirectRelationship({
//            from: assessmentEntity,
//            _class: RelationshipClass.HAS,
//            to: assessmentResultsEntity,
//        });
//          await jobState.addRelationship(assessmentResultsRelationships);
//        }
//      )
//    }
//  )
}



export const assessmentResultsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ASSESSMENTRESULTS,
    name: 'Fetch Assessments Details',
    entities: [Entities.ASSESSMENTRESULTS],
    relationships: [],
    dependsOn: [Steps.ASSESSMENTS],
    executionHandler: fetchAssessmentResultsDetails,
  }
]
