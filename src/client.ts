import http from 'http';

import {
  IntegrationLogger,
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
  IntegrationProviderAuthorizationError,
} from '@jupiterone/integration-sdk-core';
import fetch from 'node-fetch';
import { OneTrustAccount, OneTrustAssessments } from './types';
import { IntegrationConfig } from './config';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  private BASE_URL = 'https://app.onetrust.com/api';
  constructor(
    readonly config: IntegrationConfig,
    readonly logger: IntegrationLogger,
  ) {}

  public async getAccount(): Promise<OneTrustAccount> {
    const endpoint = '/access/v1/external/organizations';
    const response = await fetch(this.BASE_URL + endpoint, {
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
      },
    });
    // If the response is not ok, we should handle the error
    if (!response.ok) {
      this.handleApiError(response, this.BASE_URL + endpoint);
    }

    return (await response.json()) as OneTrustAccount;
  }


  public async getAssessments(): Promise<OneTrustAssessments> {
    const endpoint = '/assessment/v2/assessments?page=0&size=2000';
    const response = await fetch(this.BASE_URL + endpoint, {
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
      },
    });
    // If the response is not ok, we should handle the error
    if (!response.ok) {
      this.handleApiError(response, this.BASE_URL + endpoint);
    }
    return (await response.json()) as OneTrustAssessments;
  }


  private handleApiError(err: any, endpoint: string): void {
    if (err.status === 401) {
      throw new IntegrationProviderAuthenticationError({
        endpoint: endpoint,
        status: err.status,
        statusText: err.statusText,
      });
    } else if (err.status === 403) {
      throw new IntegrationProviderAuthorizationError({
        endpoint: endpoint,
        status: err.status,
        statusText: err.statusText,
      });
    } else {
      throw new IntegrationProviderAPIError({
        endpoint: endpoint,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  /**
   * Iterates each user resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */


   public async iterateAssessments(
     iteratee: ResourceIteratee<OneTrustAssessments>,
  ): Promise<void> {
    const assessments = await this.getAssessments('onetrust_assessment');
    for (const assessment of assessments.content) {
      await iteratee(assessment);
    }
    //note select only content array from json response
  }


  public async iterateUsers(
    iteratee: ResourceIteratee<AcmeUser>,
  ): Promise<void> {
    // TODO paginate an endpoint, invoke the iteratee with each record in the
    // page
    //
    // The provider API will hopefully support pagination. Functions like this
    // should maintain pagination state, and for each page, for each record in
    // the page, invoke the `ResourceIteratee`. This will encourage a pattern
    // where each resource is processed and dropped from memory.

    const users: AcmeUser[] = [
      {
        id: 'acme-user-1',
        name: 'User One',
      },
      {
        id: 'acme-user-2',
        name: 'User Two',
      },
    ];

    for (const user of users) {
      await iteratee(user);
    }
  }

  /**
   * Iterates each group resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateGroups(
    iteratee: ResourceIteratee<AcmeGroup>,
  ): Promise<void> {
    // TODO paginate an endpoint, invoke the iteratee with each record in the
    // page
    //
    // The provider API will hopefully support pagination. Functions like this
    // should maintain pagination state, and for each page, for each record in
    // the page, invoke the `ResourceIteratee`. This will encourage a pattern
    // where each resource is processed and dropped from memory.

    const groups: AcmeGroup[] = [
      {
        id: 'acme-group-1',
        name: 'Group One',
        users: [
          {
            id: 'acme-user-1',
          },
        ],
      },
    ];

    for (const group of groups) {
      await iteratee(group);
    }
  }
}

export function createAPIClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): APIClient {
  return new APIClient(config);
  return new APIClient(config, logger);
}
