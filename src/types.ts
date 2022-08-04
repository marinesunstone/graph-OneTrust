
// Providers often supply types with their API libraries.



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
      inherentRiskScore: number;
      lastUpdated: string;
      openRiskCount: int64;
      residualRiskScore: number;
      targetRiskScore: number;
    };
  ];
};

export interface OneTrustAssessmentResults {
  assessmentResults: {
    assessmentId: string;
    name: string;
    description: string;
    welcomeText: string;
    orgGroup: {
      id: string;
      name: string;
      nameKey: string;
    };
    template: {
      id: string;
      name: string;
      nameKey: string
    };
    status: string;
    createdBy : {
      id: string;
      name: string;
      nameKey: string;
    };
    createdDT: string;
    sections: [
      {
        header: {
          sectionId: string;
          name: string;
          description: string;
          sequence: number;
          hidden: boolean;
          invalidQuestionIds: array;
          requiredUnansweredQuestionIds: array;
          unansweredQuestionIds: array;
          effectivenessQuestionIds: array;
          riskStatistics: string;
          submitted: boolean
        };
        questions: [
          {
            question: {
              id: string;
              rootVersionId: string;
              sequence: number;
              questionType: string;
              required: boolean;
              attributes: string;
              friendlyName: string;
              description: string;
              hint: string;
              parentQuestionId: string;
              prePopulatedResponse: boolean;
              linkAssessmentToInventory: boolean;
              options: array;
              valid: boolean;
              businessKeyReference: string;
              topic: string;
              questionLaws: array;
              attachementRequired: boolean;
              reponseFilter: string;
              linkAssessmentToResponseEntity: boolean;
              readOnly: boolean;
              type: string;
              allowMultiSelect: boolean;
              attributeId: string;
              seeded: string;
              assetQuestion: boolean;
              vendorQuestion: boolean;
              entityQuestion: boolean;
              allowJustification: boolean;
              paquestion: boolean;
              inventoryTypeEnum: string;
              requireJustification: boolean;
              schema: string;
              content: string;
              isParentQuestionMultiselect: boolean;
            };
            hidden: boolean;
            lockReason: string;
            copyErrors: string;
            hasNavigationRules: boolean;
            questionResponses: [
              {
                responses: [
                    {
                      dataCategory: object;
                      dataElement: object;
                      dataSubject: object;
                      errorCode: string;
                      response: string;
                      responseId: string;
                      responseKey: string;
                      responseMap: object;
                      responseSourceType: string;
                      type: string;
                      contractResponse: string;
                      controlResponse: string;
                      relationShipResponseDetails: array;
                      valid: boolean;
                  }
                ];
                justification: string;
                maturityScale: string;
                effectivenessScale: string;
                parentAssessmentDetailId: string;
              };
            ];
            risks: object;
            rootRequestedInformationIds: array;
            totalAttachements: int64;
            attachementIds: array;
            canReopenWithAllowEditOption: boolean;
            riskCreationAllowed: boolean;
            allowMaturityScaleOnQuestions: boolean;
            questionAssociations: string;
            reponseEditableWhileUnderReview: boolean;
            };
          ];
          hasNavigationRules: boolean;
          submittedBy: string;
          submittedDt: string;
          name: string;
          hidden: boolean;
          valid: boolean;
          description: string;
          sectionId: string;
          sequence: number;
          submitted: boolean
        };
      ];
      approvers: [
        {
          id: string;
          workflowStageId: string;
          name: string;
          approver : {
            id: string;
            fullName: string;
            email: string;
            deleted: boolean;
            assigneeType: string;
          };
          approvalState: string;
          approvedOn: string;
          resultId: string;
          resultName: string;
          resultNameKey: string;
        };
      ];
      respondents: [
        {
          id: string;
          name: string;
          nameKey: string;
        };
      ];
      respondent: {
        id: string;
        name: string;
        nameKey: string;
      };
      completedOn: string;
      deadline: string;
      submittedOn: string;
      result: string;
      resultId: string;
      resultName: string;
      lowRisk: int32;
      MediumRisk: int32;
      highRisk: int32;
      veryHighRisk: int32;
      totalRiskCount: int64;
      riskLevel: string;
      residualRiskScore: number;
      openRiskCount: int64;
      inherentRiskScore: number;
      targetRiskScore: number;
      lastUpdated: string;
      primaryEntityDetails: array;
      primaryRecordType: string;
      tags: array;
    };
  };


  export interface OneTrustVendorAssessments {
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
        inherentRiskScore: number;
        lastUpdated: string;
        openRiskCount: int64;
        residualRiskScore: number;
        targetRiskScore: number;
      };
    ];
  };

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
