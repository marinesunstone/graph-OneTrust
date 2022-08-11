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
      const assessment = getRawData<Assessment>(assessmentEntity);
      if (
        assessment.tags.length > 0 &&
        (assessment.status == 'Completed' ||
          assessment.status == 'In Progress' ||
          assessment.status == 'Under Review')
      ) {
        const assessmentId = assessment.assessmentId;
        assessment.tags.forEach(async (vendor) => {
          const vendors = await jobState.addEntity(
            createVendorEntity(vendor, assessment),
          );
          const vendorKey = getVendorAssessmentKey(vendor, assessmentId);
          const vendorEntity = await jobState.findEntity(vendorKey);
          await jobState.addRelationship(
            createDirectRelationship({
              from: vendorEntity,
              to: assessmentEntity,
              _class: RelationshipClass.HAS,
            }),
          );
        });
      }
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
