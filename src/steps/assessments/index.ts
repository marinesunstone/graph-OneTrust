import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Steps, Entities } from '../constants';
import { createAssessmentEntity } from './converter';


export async function fetchAssessmentsDetails({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config, logger);

  await apiClient.iterateAssessments(async (assessment) => {
    const assessmentEntity = await jobState.addEntity(createAssessmentEntity(assessment))
  });
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
];
