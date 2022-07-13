import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { OneTrustAssessmentResults } from '../../types';

import { Entities } from '../constants';


export function getAssessmentsResultsKey(id: number): string {
  return `assessmentResults_id:${id}`;
}

export function createAssessmentResultsEntity(assessmentResults: OneTrustAssessmentResults): Entity {
  return createIntegrationEntity({
    entityData: {
      source: assessmentResults,
      assign: {
        _key: getAssessmentsResultsKey(assessmentResults.assessmentId),
        _type: Entities.ASSESSMENTRESULTS._type,
        _class: Entities.ASSESSMENTRESULTS._class,
        name: 'Assessment-results',
        assessmentId: assessmentResults.assessmentId,
      },
    },
  });
}
