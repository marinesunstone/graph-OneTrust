// Providers often supply types with their API libraries.

/* export interface AcmeUser {
  id: string;
  name: string;
}

export interface AcmeGroup {
  id: string;
  name: string;
  users?: Pick<AcmeUser, 'id'>[];
}*/

export interface OneTrustAccount {
  account: {
    organizationId: string;
    externalId: string;
    parentOrganizationId: string;
    parentExternalId: string;
    name: string;
    defaultApprover: string;
    defaultLanguageCode: string;
    description: string;
    children: array;
  };
};



export interface OneTrustAssessments {
  content: [
    {
      assessmentId: string;
      createDt: string;
      name: string;
      number: int32;
      orgGroupName: string;
      result: string;
      resultId: string;
      resultName: string;
      status: string;
      tags: array;
      templateName: string;
      templateId: string;
      templateRootVersionId: string;
      primaryInventoryDetails: {
        primaryInventoryName: string;
        primaryInventoryId: string;
        primaryInventoryNumber: int32;
      };
      inherentRiskScore: number;
      lastUpdated: date-time;
      openRiskCount: int64;
      residualRiskScore: number;
      targetRiskScore: number;
    }
  ];
}


export interface OneTrustAssessmentResults {
  approvers: {
    approvalState: string;
    approvedOn: date-time;
    id: string;
    name: string;
    resultId: string;
    resultName: string;
  };
  assessmentId: string;
  assessmentNumber: int64;
  completedOn: date-time;
  createdBy : {
    id: string;
    name: string;
  };
  createdDT: date-time;
  deadline: date-time;
  description: string;
  highRist: int32;
  inherentRiskScore: number;
  lastUpdated: date-time;
  lowRisk: int32;
  mediumRist: int32;
  name: string;
  openRiskCount: int64;
  primaryEntityDetails: {
    displayName: string;
    id: string;
    name: string;
    number: int64;
  };
  primaryRecordType: string;
  residualRiskScore: number;
  orgGroup: {
    id: string;
    name: string;
  };
  respondent: {
    id: string;
    name: string;
  };
  respondents: {
    id: string;
    name: string;
  };
  result: string;
  resultId: string;
  resultName: string;
  riskLevel: string;
  sections: {
    description: string;
    hasNavigationRules: boolean;
    header: object;
    hidden: boolean;
    name: string;
    questions: {
      hasNavigationRules: boolean;
      hidden: boolean;
      lockReason: string;
      question: object;
      questionResponses: {
        justification: string;
        responses: {
          dataCategory: object;
          dataElement: object;
          dataSubject: object;
          errorCode: string;
          response: string;
          responseId: string;
          responseMap: object;
          responseSourceType: string;
          type: string;
          valid: boolean;
        };
        risks: {
          level: int64;
          questionId: string;
          riskId: string;
        };
        rootRequestedInformationIds: array;
        totalAttachements: int64;
        attachementIds: array;
      };
      setionId: string;
      valid: boolean;
    };
    status: string;
    submittedOn: date-time;
    tags: array;
    targetRiskScore: number:
    template: {
      id: string;
      name: string;
    };
    totalRiskCount: int64;
    veryHighRisk: int32;
    welcomeText: string;
  };
}



// Those can be useful to a degree, but often they're just full of optional
// values. Understanding the response data may be more reliably accomplished by
// reviewing the API response recordings produced by testing the wrapper client
// (./client.ts). However, when there are no types provided, it is necessary to define
// opaque types for each resource, to communicate the records that are expected
// to come from an endpoint and are provided to iterating functions.

/*
import { Opaque } from 'type-fest';
export type AcmeUser = Opaque<any, 'AcmeUser'>;
export type AcmeGroup = Opaque<any, 'AcmeGroup'>;
*/
