import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  ASSESSMENTS: 'fetch-assessments',
  ASSESSMENTRESULTS: 'fetch-assessment-results',
  USERS: 'fetch-users',
  GROUPS: 'fetch-groups',
  GROUP_USER_RELATIONSHIPS: 'build-user-group-relationships',
};

export const Entities: Record<
  'ACCOUNT' | 'ASSESSMENT' | 'ASSESSMENTRESULTS' | 'GROUP' | 'USER',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'onetrust_account',
    _class: ['Account'],
    schema: {
      properties: {
        name: { type: 'string' },
        defaultApprover: { type: 'string' },
      },
      required: ['name', 'defaultApprover'],
    },
  },
  ASSESSMENT: {
    resourceName: 'Assessment',
    _type: 'onetrust_assessment',
    _class: ['Assessment'],
    schema: {
      properties: {
        assessmentId: { type: 'string' },
        name: { type: 'string' },
        status: { type: 'string' },
        result: { type: 'string' },
        lastUpdated: { type: 'string' },
      },
      required: ['assessmentId', 'name', 'status', 'result', 'lastUpdated'],
    },
  },
  ASSESSMENTRESULTS: {
    resourceName: 'assessmentResults',
    _type: 'onetrust_assessment_results',
    _class: ['Question'],
    schema: {
      properties: {
        assessmentId: { type: 'string' },
        name: { type: 'string' },
      },
      required: ['assessmentId', 'name'],
    },
  },
  GROUP: {
    resourceName: 'UserGroup',
    _type: 'acme_group',
    _class: ['UserGroup'],
    schema: {
      properties: {
        email: { type: 'string' },
        logoLink: { type: 'string' },
      },
      required: ['email', 'logoLink'],
    },
  },
  USER: {
    resourceName: 'User',
    _type: 'acme_user',
    _class: ['User'],
    schema: {
      properties: {
        username: { type: 'string' },
        email: { type: 'string' },
        active: { type: 'boolean' },
        firstName: { type: 'string' },
      },
      required: ['username', 'email', 'active', 'firstName'],
    },
  },
};

export const Relationships: Record<
  'ACCOUNT_HAS_USER' | 'ACCOUNT_HAS_GROUP' | 'GROUP_HAS_USER' | 'ASSESSMENT_HAS_RESULTS',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'acme_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_GROUP: {
    _type: 'acme_account_has_group',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.GROUP._type,
  },
  GROUP_HAS_USER: {
    _type: 'acme_group_has_user',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ASSESSMENT_HAS_RESULTS: {
    _type: 'assessment_has_results',
    sourceType: Entities.ASSESSMENT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ASSESSMENTRESULTS._type,
   },
 };
