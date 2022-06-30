import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { OneTrustAssessment } from '../../types';

import { Entities } from '../constants';

export function createAssessmentEntity(assessment: OneTrustAssessment): Entity {
  return createIntegrationEntity({
    entityData: {
      source: assessment,
      assign: {
        _key: 'organizationId',
        _type: Entities.ASSESSMENT._type,
        _class: Entities.ASSESSMENT._class,
        name: 'Assessments',
        assessmentId: assessment.assessmentId,
        createDt: assessment.createDt,
        name: assessment.name,
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
        primaryInventoryName: assessment.primaryInventoryDetails.primaryInventoryName,
        primaryInventoryId: assessment.primaryInventoryDetails.primaryInventoryId,
        primaryInventoryNumber: assessment.primaryInventoryDetails.primaryInventoryNumber,
        inherentRiskScore: assessment.inherentRiskScore,
        lastUpdated: assessment.lastUpdated,
        openRiskCount: assessment.openRiskCount,
        residualRiskScore: assessment.residualRiskScore,
        targetRiskScore: assessment.targetRiskScore,
      },
    },
  });
}
