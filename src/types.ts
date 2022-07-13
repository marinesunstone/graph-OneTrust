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
      lastUpdated: string;
      openRiskCount: int64;
      residualRiskScore: number;
      targetRiskScore: number;
    }
  ];
}


export interface OneTrustAssessmentResults {
  assessmentId: string;
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
