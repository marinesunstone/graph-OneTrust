import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { OneTrustAccount } from '../../types';

import { Entities } from '../constants';

export function createAccountEntity(account: OneTrustAccount): Entity {
  return {
    entityData: {
      source: account,
      assign: {
        _key: account.organizationId,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        name: 'Account',
        organizationId: account.organizationId,
        externalId: account.externalId,
        parentOrganizationId: account.parentOrganizationId,
        parentExternalId: account.parentExternalId,
        name: account.name,
        defaultApprover: account.defaultApprover,
        defaultLanguageCode: account.defaultLanguageCode,
        description: account.description,
        children: account.children,
      },
    },
  };
}
