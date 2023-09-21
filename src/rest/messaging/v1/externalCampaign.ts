/*
 * This code was generated by
 * ___ _ _ _ _ _    _ ____    ____ ____ _    ____ ____ _  _ ____ ____ ____ ___ __   __
 *  |  | | | | |    | |  | __ |  | |__| | __ | __ |___ |\ | |___ |__/ |__|  | |  | |__/
 *  |  |_|_| | |___ | |__|    |__| |  | |    |__] |___ | \| |___ |  \ |  |  | |__| |  \
 *
 * Twilio - Messaging
 * This is the public Twilio REST API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator.
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { inspect, InspectOptions } from "util";
import V1 from "../V1";
const deserialize = require("../../../base/deserialize");
const serialize = require("../../../base/serialize");
import { isValidPathParam } from "../../../base/utility";

/**
 * Options to pass to create a ExternalCampaignInstance
 */
export interface ExternalCampaignListInstanceCreateOptions {
  /** ID of the preregistered campaign. */
  campaignId: string;
  /** The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) that the resource is associated with. */
  messagingServiceSid: string;
}

export interface ExternalCampaignSolution {}

export interface ExternalCampaignListInstance {
  _version: V1;
  _solution: ExternalCampaignSolution;
  _uri: string;

  /**
   * Create a ExternalCampaignInstance
   *
   * @param params - Parameter for request
   * @param callback - Callback to handle processed record
   *
   * @returns Resolves to processed ExternalCampaignInstance
   */
  create(
    params: ExternalCampaignListInstanceCreateOptions,
    callback?: (error: Error | null, item?: ExternalCampaignInstance) => any
  ): Promise<ExternalCampaignInstance>;

  /**
   * Provide a user-friendly representation
   */
  toJSON(): any;
  [inspect.custom](_depth: any, options: InspectOptions): any;
}

export function ExternalCampaignListInstance(
  version: V1
): ExternalCampaignListInstance {
  const instance = {} as ExternalCampaignListInstance;

  instance._version = version;
  instance._solution = {};
  instance._uri = `/Services/PreregisteredUsa2p`;

  instance.create = function create(
    params: ExternalCampaignListInstanceCreateOptions,
    callback?: (error: Error | null, items: ExternalCampaignInstance) => any
  ): Promise<ExternalCampaignInstance> {
    if (params === null || params === undefined) {
      throw new Error('Required parameter "params" missing.');
    }

    if (params["campaignId"] === null || params["campaignId"] === undefined) {
      throw new Error("Required parameter \"params['campaignId']\" missing.");
    }

    if (
      params["messagingServiceSid"] === null ||
      params["messagingServiceSid"] === undefined
    ) {
      throw new Error(
        "Required parameter \"params['messagingServiceSid']\" missing."
      );
    }

    let data: any = {};

    data["CampaignId"] = params["campaignId"];

    data["MessagingServiceSid"] = params["messagingServiceSid"];

    const headers: any = {};
    headers["Content-Type"] = "application/x-www-form-urlencoded";

    let operationVersion = version,
      operationPromise = operationVersion.create({
        uri: instance._uri,
        method: "post",
        data,
        headers,
      });

    operationPromise = operationPromise.then(
      (payload) => new ExternalCampaignInstance(operationVersion, payload)
    );

    operationPromise = instance._version.setPromiseCallback(
      operationPromise,
      callback
    );
    return operationPromise;
  };

  instance.toJSON = function toJSON() {
    return instance._solution;
  };

  instance[inspect.custom] = function inspectImpl(
    _depth: any,
    options: InspectOptions
  ) {
    return inspect(instance.toJSON(), options);
  };

  return instance;
}

interface ExternalCampaignPayload extends ExternalCampaignResource {}

interface ExternalCampaignResource {
  sid: string;
  account_sid: string;
  campaign_id: string;
  messaging_service_sid: string;
  date_created: Date;
}

export class ExternalCampaignInstance {
  constructor(protected _version: V1, payload: ExternalCampaignResource) {
    this.sid = payload.sid;
    this.accountSid = payload.account_sid;
    this.campaignId = payload.campaign_id;
    this.messagingServiceSid = payload.messaging_service_sid;
    this.dateCreated = deserialize.iso8601DateTime(payload.date_created);
  }

  /**
   * The unique string that identifies a US A2P Compliance resource `QE2c6890da8086d771620e9b13fadeba0b`.
   */
  sid: string;
  /**
   * The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the Campaign belongs to.
   */
  accountSid: string;
  /**
   * ID of the preregistered campaign.
   */
  campaignId: string;
  /**
   * The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) that the resource is associated with.
   */
  messagingServiceSid: string;
  /**
   * The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
   */
  dateCreated: Date;

  /**
   * Provide a user-friendly representation
   *
   * @returns Object
   */
  toJSON() {
    return {
      sid: this.sid,
      accountSid: this.accountSid,
      campaignId: this.campaignId,
      messagingServiceSid: this.messagingServiceSid,
      dateCreated: this.dateCreated,
    };
  }

  [inspect.custom](_depth: any, options: InspectOptions) {
    return inspect(this.toJSON(), options);
  }
}
