import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { OneTrustAssessments, OneTrustAssessmentResults } from '../../types';

import { Entities } from '../constants';

export function createAssessmentEntity(assessment: OneTrustAssessments): Entity {
  return createIntegrationEntity({
    entityData: {
      source: assessment,
      assign: {
        _key: `assesment_id:${assessment.assessmentId}`,
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
        inherentRiskScore: assessment.inherentRiskScore,
        lastUpdated: assessment.lastUpdated,
        openRiskCount: assessment.openRiskCount,
        residualRiskScore: assessment.residualRiskScore,
        targetRiskScore: assessment.targetRiskScore,
      },
    },
  });
}

export function createAssessmentResultsEntity(assessmentResults: OneTrustAssessmentResults): Entity {
  return createIntegrationEntity({
    entityData: {
      source: assessmentResults,
      assign: {
        _key: `assessmentResults_id:${assessmentResults.assessmentId}`,
        _type: Entities.ASSESSMENTRESULTS._type,
        _class: Entities.ASSESSMENTRESULTS._class,
        name: 'Assessment-results',
        assessmentId: assessmentResults.assessmentId,
      },
    },
  });
}

export function createAssessmentResultsRelationship(
  assessment: Entity,
  assessmentResults: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: assessment,
    to: assessmentResults,
  });
}
