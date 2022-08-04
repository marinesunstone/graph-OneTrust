import {
  createIntegrationEntity,
  Entity,
  getRawData
} from '@jupiterone/integration-sdk-core';
import { OneTrustVendorAssessments } from '../../types';

import { Entities } from '../constants';

export function getVendorAssessmentKey(vendor: string, assessmentId: string): string {
  return `vendor_assessment_id:${vendor}-${assessmentId}`;
}

export function createVendorEntity(
  vendor: OneTrustVendorAssessments,
  assessment,
): Entity {
    return createIntegrationEntity({
      entityData: {
        source: vendor,
        assign: {
          _key: getVendorAssessmentKey(vendor, assessment.assessmentId),
          _type: Entities.VENDORS._type,
          _class: Entities.VENDORS._class,
          name: 'vendor assessments',
          assessmentId: `${assessment.assessmentId}`,
          createDt: assessment.createDt,
          name: `${vendor} - ${assessment.name}`,
          number: assessment.number,
          orgGroupName: assessment.orgGroupName,
          result: assessment.result,
          resultId: assessment.resultId,
          resultName: assessment.resultName,
          status: assessment.status,
          tags: assessment.tags,
          templateName: assessment.templateName,
          templateId: assessment.templateId,
          templateRootVersionId: assessment.templateRootVersionId,
          inherentRiskScore: assessment.inherentRiskScore,
          lastUpdated: assessment.lastUpdated,
          openRiskCount: assessment.openRiskCount,
          residualRiskScore: assessment.residualRiskScore,
          targetRiskScore: assessment.targetRiskScore,
        },
      },
    });
  }
