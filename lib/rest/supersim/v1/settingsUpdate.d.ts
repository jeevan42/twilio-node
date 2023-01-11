/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../base/Page');
import Response = require('../../../http/response');
import V1 = require('../V1');
import { SerializableClass } from '../../../interfaces';

type SettingsUpdateStatus = 'scheduled'|'in-progress'|'successful'|'failed';

/**
 * Initialize the SettingsUpdateList
 *
 * PLEASE NOTE that this class contains beta products that are subject to change.
 * Use them with caution.
 *
 * @param version - Version of the resource
 */
declare function SettingsUpdateList(version: V1): SettingsUpdateListInstance;

interface SettingsUpdateListInstance {
  /**
   * Streams SettingsUpdateInstance records from the API.
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
  each(callback?: (item: SettingsUpdateInstance, done: (err?: Error) => void) => void): void;
  /**
   * Streams SettingsUpdateInstance records from the API.
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
  each(opts?: SettingsUpdateListInstanceEachOptions, callback?: (item: SettingsUpdateInstance, done: (err?: Error) => void) => void): void;
  /**
   * Retrieve a single target page of SettingsUpdateInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  getPage(callback?: (error: Error | null, items: SettingsUpdatePage) => any): Promise<SettingsUpdatePage>;
  /**
   * Retrieve a single target page of SettingsUpdateInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param targetUrl - API-generated URL for the requested results page
   * @param callback - Callback to handle list of records
   */
  getPage(targetUrl?: string, callback?: (error: Error | null, items: SettingsUpdatePage) => any): Promise<SettingsUpdatePage>;
  /**
   * Lists SettingsUpdateInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  list(callback?: (error: Error | null, items: SettingsUpdateInstance[]) => any): Promise<SettingsUpdateInstance[]>;
  /**
   * Lists SettingsUpdateInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  list(opts?: SettingsUpdateListInstanceOptions, callback?: (error: Error | null, items: SettingsUpdateInstance[]) => any): Promise<SettingsUpdateInstance[]>;
  /**
   * Retrieve a single page of SettingsUpdateInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param callback - Callback to handle list of records
   */
  page(callback?: (error: Error | null, items: SettingsUpdatePage) => any): Promise<SettingsUpdatePage>;
  /**
   * Retrieve a single page of SettingsUpdateInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  page(opts?: SettingsUpdateListInstancePageOptions, callback?: (error: Error | null, items: SettingsUpdatePage) => any): Promise<SettingsUpdatePage>;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

/**
 * Options to pass to each
 *
 * @property callback -
 *                         Function to process each record. If this and a positional
 *                         callback are passed, this one will be used
 * @property done - Function to be called upon completion of streaming
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
 * @property sim - Filter the Settings Updates by Super SIM
 * @property status - Filter the Settings Updates by status
 */
interface SettingsUpdateListInstanceEachOptions {
  callback?: (item: SettingsUpdateInstance, done: (err?: Error) => void) => void;
  done?: Function;
  limit?: number;
  pageSize?: number;
  sim?: string;
  status?: SettingsUpdateStatus;
}

/**
 * Options to pass to list
 *
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
 * @property sim - Filter the Settings Updates by Super SIM
 * @property status - Filter the Settings Updates by status
 */
interface SettingsUpdateListInstanceOptions {
  limit?: number;
  pageSize?: number;
  sim?: string;
  status?: SettingsUpdateStatus;
}

/**
 * Options to pass to page
 *
 * @property pageNumber - Page Number, this value is simply for client state
 * @property pageSize - Number of records to return, defaults to 50
 * @property pageToken - PageToken provided by the API
 * @property sim - Filter the Settings Updates by Super SIM
 * @property status - Filter the Settings Updates by status
 */
interface SettingsUpdateListInstancePageOptions {
  pageNumber?: number;
  pageSize?: number;
  pageToken?: string;
  sim?: string;
  status?: SettingsUpdateStatus;
}

interface SettingsUpdatePayload extends SettingsUpdateResource, Page.TwilioResponsePayload {
}

interface SettingsUpdateResource {
  date_completed: Date;
  date_created: Date;
  date_updated: Date;
  iccid: string;
  packages: object[];
  sid: string;
  sim_sid: string;
  status: SettingsUpdateStatus;
}

interface SettingsUpdateSolution {
}


declare class SettingsUpdateInstance extends SerializableClass {
  /**
   * Initialize the SettingsUpdateContext
   *
   * PLEASE NOTE that this class contains beta products that are subject to change.
   * Use them with caution.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   */
  constructor(version: V1, payload: SettingsUpdatePayload);

  dateCompleted: Date;
  dateCreated: Date;
  dateUpdated: Date;
  iccid: string;
  packages: object[];
  sid: string;
  simSid: string;
  status: SettingsUpdateStatus;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}


declare class SettingsUpdatePage extends Page<V1, SettingsUpdatePayload, SettingsUpdateResource, SettingsUpdateInstance> {
  /**
   * Initialize the SettingsUpdatePage
   *
   * PLEASE NOTE that this class contains beta products that are subject to change.
   * Use them with caution.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: SettingsUpdateSolution);

  /**
   * Build an instance of SettingsUpdateInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: SettingsUpdatePayload): SettingsUpdateInstance;
  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
}

export { SettingsUpdateInstance, SettingsUpdateList, SettingsUpdateListInstance, SettingsUpdateListInstanceEachOptions, SettingsUpdateListInstanceOptions, SettingsUpdateListInstancePageOptions, SettingsUpdatePage, SettingsUpdatePayload, SettingsUpdateResource, SettingsUpdateSolution, SettingsUpdateStatus }