/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../base/Page');
import Response = require('../../../http/response');
import V1 = require('../V1');
import { CustomerProfilesChannelEndpointAssignmentList } from './customerProfiles/customerProfilesChannelEndpointAssignment';
import { CustomerProfilesChannelEndpointAssignmentListInstance } from './customerProfiles/customerProfilesChannelEndpointAssignment';
import { CustomerProfilesEntityAssignmentsList } from './customerProfiles/customerProfilesEntityAssignments';
import { CustomerProfilesEntityAssignmentsListInstance } from './customerProfiles/customerProfilesEntityAssignments';
import { CustomerProfilesEvaluationsList } from './customerProfiles/customerProfilesEvaluations';
import { CustomerProfilesEvaluationsListInstance } from './customerProfiles/customerProfilesEvaluations';
import { SerializableClass } from '../../../interfaces';

type CustomerProfilesEndUserType = 'individual'|'business';

type CustomerProfilesStatus = 'draft'|'pending-review'|'in-review'|'twilio-rejected'|'twilio-approved';

/**
 * Initialize the CustomerProfilesList
 *
 * @param version - Version of the resource
 */
declare function CustomerProfilesList(version: V1): CustomerProfilesListInstance;

/**
 * Options to pass to update
 *
 * @property email - The email address
 * @property friendlyName - The string that you assigned to describe the resource
 * @property status - The verification status of the Customer-Profile resource
 * @property statusCallback - The URL we call to inform your application of status changes.
 */
interface CustomerProfilesInstanceUpdateOptions {
  email?: string;
  friendlyName?: string;
  status?: CustomerProfilesStatus;
  statusCallback?: string;
}

interface CustomerProfilesListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): CustomerProfilesContext;
  /**
   * create a CustomerProfilesInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  create(opts: CustomerProfilesListInstanceCreateOptions, callback?: (error: Error | null, item: CustomerProfilesInstance) => any): Promise<CustomerProfilesInstance>;
  /**
   * Streams CustomerProfilesInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Function to process each record
   */
  each(callback?: (item: CustomerProfilesInstance, done: (err?: Error) => void) => void): void;
  /**
   * Streams CustomerProfilesInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param opts - Options for request
   * @param callback - Function to process each record
   */
  each(opts?: CustomerProfilesListInstanceEachOptions, callback?: (item: CustomerProfilesInstance, done: (err?: Error) => void) => void): void;
  /**
   * Constructs a customer_profiles
   *
   * @param sid - The unique string that identifies the resource.
   */
  get(sid: string): CustomerProfilesContext;
  /**
   * Retrieve a single target page of CustomerProfilesInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  getPage(callback?: (error: Error | null, items: CustomerProfilesPage) => any): Promise<CustomerProfilesPage>;
  /**
   * Retrieve a single target page of CustomerProfilesInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param targetUrl - API-generated URL for the requested results page
   * @param callback - Callback to handle list of records
   */
  getPage(targetUrl?: string, callback?: (error: Error | null, items: CustomerProfilesPage) => any): Promise<CustomerProfilesPage>;
  /**
   * Lists CustomerProfilesInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  list(callback?: (error: Error | null, items: CustomerProfilesInstance[]) => any): Promise<CustomerProfilesInstance[]>;
  /**
   * Lists CustomerProfilesInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  list(opts?: CustomerProfilesListInstanceOptions, callback?: (error: Error | null, items: CustomerProfilesInstance[]) => any): Promise<CustomerProfilesInstance[]>;
  /**
   * Retrieve a single page of CustomerProfilesInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  page(callback?: (error: Error | null, items: CustomerProfilesPage) => any): Promise<CustomerProfilesPage>;
  /**
   * Retrieve a single page of CustomerProfilesInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  page(opts?: CustomerProfilesListInstancePageOptions, callback?: (error: Error | null, items: CustomerProfilesPage) => any): Promise<CustomerProfilesPage>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

/**
 * Options to pass to create
 *
 * @property email - The email address
 * @property friendlyName - The string that you assigned to describe the resource
 * @property policySid - The unique string of a policy.
 * @property statusCallback - The URL we call to inform your application of status changes.
 */
interface CustomerProfilesListInstanceCreateOptions {
  email: string;
  friendlyName: string;
  policySid: string;
  statusCallback?: string;
}

/**
 * Options to pass to each
 *
 * @property callback -
 *                         Function to process each record. If this and a positional
 *                         callback are passed, this one will be used
 * @property done - Function to be called upon completion of streaming
 * @property friendlyName - The string that you assigned to describe the resource
 * @property limit -
 *                         Upper limit for the number of records to return.
 *                         each() guarantees never to return more than limit.
 *                         Default is no limit
 * @property pageSize -
 *                         Number of records to fetch per request,
 *                         when not set will use the default value of 50 records.
 *                         If no pageSize is defined but a limit is defined,
 *                         each() will attempt to read the limit with the most efficient
 *                         page size, i.e. min(limit, 1000)
 * @property policySid - The unique string of a policy.
 * @property status - The verification status of the Customer-Profile resource
 */
interface CustomerProfilesListInstanceEachOptions {
  callback?: (item: CustomerProfilesInstance, done: (err?: Error) => void) => void;
  done?: Function;
  friendlyName?: string;
  limit?: number;
  pageSize?: number;
  policySid?: string;
  status?: CustomerProfilesStatus;
}

/**
 * Options to pass to list
 *
 * @property friendlyName - The string that you assigned to describe the resource
 * @property limit -
 *                         Upper limit for the number of records to return.
 *                         list() guarantees never to return more than limit.
 *                         Default is no limit
 * @property pageSize -
 *                         Number of records to fetch per request,
 *                         when not set will use the default value of 50 records.
 *                         If no page_size is defined but a limit is defined,
 *                         list() will attempt to read the limit with the most
 *                         efficient page size, i.e. min(limit, 1000)
 * @property policySid - The unique string of a policy.
 * @property status - The verification status of the Customer-Profile resource
 */
interface CustomerProfilesListInstanceOptions {
  friendlyName?: string;
  limit?: number;
  pageSize?: number;
  policySid?: string;
  status?: CustomerProfilesStatus;
}

/**
 * Options to pass to page
 *
 * @property friendlyName - The string that you assigned to describe the resource
 * @property pageNumber - Page Number, this value is simply for client state
 * @property pageSize - Number of records to return, defaults to 50
 * @property pageToken - PageToken provided by the API
 * @property policySid - The unique string of a policy.
 * @property status - The verification status of the Customer-Profile resource
 */
interface CustomerProfilesListInstancePageOptions {
  friendlyName?: string;
  pageNumber?: number;
  pageSize?: number;
  pageToken?: string;
  policySid?: string;
  status?: CustomerProfilesStatus;
}

interface CustomerProfilesPayload extends CustomerProfilesResource, Page.TwilioResponsePayload {
}

interface CustomerProfilesResource {
  account_sid: string;
  date_created: Date;
  date_updated: Date;
  email: string;
  friendly_name: string;
  links: string;
  policy_sid: string;
  sid: string;
  status: CustomerProfilesStatus;
  status_callback: string;
  url: string;
  valid_until: Date;
}

interface CustomerProfilesSolution {
}


declare class CustomerProfilesContext {
  /**
   * Initialize the CustomerProfilesContext
   *
   * @param version - Version of the resource
   * @param sid - The unique string that identifies the resource.
   */
  constructor(version: V1, sid: string);

  customerProfilesChannelEndpointAssignment: CustomerProfilesChannelEndpointAssignmentListInstance;
  customerProfilesEntityAssignments: CustomerProfilesEntityAssignmentsListInstance;
  customerProfilesEvaluations: CustomerProfilesEvaluationsListInstance;
  /**
   * fetch a CustomerProfilesInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: CustomerProfilesInstance) => any): Promise<CustomerProfilesInstance>;
  /**
   * remove a CustomerProfilesInstance
   *
   * @param callback - Callback to handle processed record
   */
  remove(callback?: (error: Error | null, items: CustomerProfilesInstance) => any): Promise<boolean>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  /**
   * update a CustomerProfilesInstance
   *
   * @param callback - Callback to handle processed record
   */
  update(callback?: (error: Error | null, items: CustomerProfilesInstance) => any): Promise<CustomerProfilesInstance>;
  /**
   * update a CustomerProfilesInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts?: CustomerProfilesInstanceUpdateOptions, callback?: (error: Error | null, items: CustomerProfilesInstance) => any): Promise<CustomerProfilesInstance>;
}


declare class CustomerProfilesInstance extends SerializableClass {
  /**
   * Initialize the CustomerProfilesContext
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param sid - The unique string that identifies the resource.
   */
  constructor(version: V1, payload: CustomerProfilesPayload, sid: string);

  private _proxy: CustomerProfilesContext;
  accountSid: string;
  /**
   * Access the customerProfilesChannelEndpointAssignment
   */
  customerProfilesChannelEndpointAssignment(): CustomerProfilesChannelEndpointAssignmentListInstance;
  /**
   * Access the customerProfilesEntityAssignments
   */
  customerProfilesEntityAssignments(): CustomerProfilesEntityAssignmentsListInstance;
  /**
   * Access the customerProfilesEvaluations
   */
  customerProfilesEvaluations(): CustomerProfilesEvaluationsListInstance;
  dateCreated: Date;
  dateUpdated: Date;
  email: string;
  /**
   * fetch a CustomerProfilesInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: CustomerProfilesInstance) => any): Promise<CustomerProfilesInstance>;
  friendlyName: string;
  links: string;
  policySid: string;
  /**
   * remove a CustomerProfilesInstance
   *
   * @param callback - Callback to handle processed record
   */
  remove(callback?: (error: Error | null, items: CustomerProfilesInstance) => any): Promise<boolean>;
  sid: string;
  status: CustomerProfilesStatus;
  statusCallback: string;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  /**
   * update a CustomerProfilesInstance
   *
   * @param callback - Callback to handle processed record
   */
  update(callback?: (error: Error | null, items: CustomerProfilesInstance) => any): Promise<CustomerProfilesInstance>;
  /**
   * update a CustomerProfilesInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts?: CustomerProfilesInstanceUpdateOptions, callback?: (error: Error | null, items: CustomerProfilesInstance) => any): Promise<CustomerProfilesInstance>;
  url: string;
  validUntil: Date;
}


declare class CustomerProfilesPage extends Page<V1, CustomerProfilesPayload, CustomerProfilesResource, CustomerProfilesInstance> {
  /**
   * Initialize the CustomerProfilesPage
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: CustomerProfilesSolution);

  /**
   * Build an instance of CustomerProfilesInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: CustomerProfilesPayload): CustomerProfilesInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { CustomerProfilesContext, CustomerProfilesEndUserType, CustomerProfilesInstance, CustomerProfilesInstanceUpdateOptions, CustomerProfilesList, CustomerProfilesListInstance, CustomerProfilesListInstanceCreateOptions, CustomerProfilesListInstanceEachOptions, CustomerProfilesListInstanceOptions, CustomerProfilesListInstancePageOptions, CustomerProfilesPage, CustomerProfilesPayload, CustomerProfilesResource, CustomerProfilesSolution, CustomerProfilesStatus }