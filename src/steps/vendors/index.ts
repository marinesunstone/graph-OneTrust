import {
  createDirectRelationship,
  createIntegrationEntity,
  getRawData,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Steps, Entities, Relationships } from '../constants';
import { createVendorEntity, getVendorAssessmentKey } from './converter';

export async function fetchVendorsDetails({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config, logger);
  await jobState.iterateEntities(
    { _type: Entities.ASSESSMENT._type },
    async (assessmentEntity) => {
      await apiClient.iterateVendorAssessments(async (assessment) => {
        if (
          assessment.tags.length > 0 &&
          (assessment.status == 'Completed' ||
            assessment.status == 'In Progress' ||
            assessment.status == 'Under Review')
        ) {
          const assessmentId = assessment.assessmentId;
          assessment.tags.forEach(async (vendor) => {
            const hasKey = await jobState.hasKey(
              getVendorAssessmentKey(vendor, assessmentId),
            );
            if (!hasKey) {
              const vendorEntity = await jobState.addEntity(
                createVendorEntity(vendor, assessment),
              );
              await jobState.addRelationship(
                createDirectRelationship({
                  from: assessmentEntity,
                  to: vendorEntity,
                  _class: RelationshipClass.HAS,
                }),
              );
            }
          });
        }
      });
    },
  );
}

export const vendorSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.VENDORS,
    name: 'Fetch Vendors Details',
    entities: [Entities.VENDORS],
    relationships: [Relationships.VENDOR_HAS_ASSESSMENTS],
    dependsOn: [Steps.ASSESSMENTS],
    executionHandler: fetchVendorsDetails,
  },
];
