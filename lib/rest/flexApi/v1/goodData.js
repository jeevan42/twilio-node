'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var util = require('util');  /* jshint ignore:line */
var Page = require('../../../base/Page');  /* jshint ignore:line */
var values = require('../../../base/values');  /* jshint ignore:line */

var GoodDataList;
var GoodDataPage;
var GoodDataInstance;
var GoodDataContext;

/* jshint ignore:start */
/**
 * Initialize the GoodDataList
 *
 * @constructor Twilio.FlexApi.V1.GoodDataList
 *
 * @param {Twilio.FlexApi.V1} version - Version of the resource
 */
/* jshint ignore:end */
GoodDataList = function GoodDataList(version) {
  /* jshint ignore:start */
  /**
   * @function goodData
   * @memberof Twilio.FlexApi.V1#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.FlexApi.V1.GoodDataContext}
   */
  /* jshint ignore:end */
  function GoodDataListInstance(sid) {
    return GoodDataListInstance.get(sid);
  }

  GoodDataListInstance._version = version;
  // Path Solution
  GoodDataListInstance._solution = {};
  /* jshint ignore:start */
  /**
   * Constructs a good_data
   *
   * @function get
   * @memberof Twilio.FlexApi.V1.GoodDataList#
   *
   * @returns {Twilio.FlexApi.V1.GoodDataContext}
   */
  /* jshint ignore:end */
  GoodDataListInstance.get = function get() {
    return new GoodDataContext(this._version);
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.FlexApi.V1.GoodDataList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  GoodDataListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  GoodDataListInstance[util.inspect.custom] = function inspect(depth, options) {
    return util.inspect(this.toJSON(), options);
  };

  return GoodDataListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the GoodDataPage
 *
 * @constructor Twilio.FlexApi.V1.GoodDataPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {GoodDataSolution} solution - Path solution
 *
 * @returns GoodDataPage
 */
/* jshint ignore:end */
GoodDataPage = function GoodDataPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(GoodDataPage.prototype, Page.prototype);
GoodDataPage.prototype.constructor = GoodDataPage;

/* jshint ignore:start */
/**
 * Build an instance of GoodDataInstance
 *
 * @function getInstance
 * @memberof Twilio.FlexApi.V1.GoodDataPage#
 *
 * @param {GoodDataPayload} payload - Payload response from the API
 *
 * @returns GoodDataInstance
 */
/* jshint ignore:end */
GoodDataPage.prototype.getInstance = function getInstance(payload) {
  return new GoodDataInstance(this._version, payload);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.FlexApi.V1.GoodDataPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
GoodDataPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

GoodDataPage.prototype[util.inspect.custom] = function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the GoodDataContext
 *
 * @constructor Twilio.FlexApi.V1.GoodDataInstance
 *
 * @property {string} workspaceId - Unique ID to identify the user's workspace
 * @property {string} sessionExpiry - The session expiry date and time
 * @property {string} sessionId - Unique session ID
 * @property {string} baseUrl - Base URL to fetch reports and dashboards
 * @property {string} url - The URL of this resource.
 *
 * @param {V1} version - Version of the resource
 * @param {GoodDataPayload} payload - The instance payload
 */
/* jshint ignore:end */
GoodDataInstance = function GoodDataInstance(version, payload) {
  this._version = version;

  // Marshaled Properties
  this.workspaceId = payload.workspace_id; // jshint ignore:line
  this.sessionExpiry = payload.session_expiry; // jshint ignore:line
  this.sessionId = payload.session_id; // jshint ignore:line
  this.baseUrl = payload.base_url; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {};
};

Object.defineProperty(GoodDataInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new GoodDataContext(this._version);
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * create a GoodDataInstance
 *
 * @function create
 * @memberof Twilio.FlexApi.V1.GoodDataInstance#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.token] - The Token HTTP request header
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed GoodDataInstance
 */
/* jshint ignore:end */
GoodDataInstance.prototype.create = function create(opts, callback) {
  return this._proxy.create(opts, callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.FlexApi.V1.GoodDataInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
GoodDataInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

GoodDataInstance.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the GoodDataContext
 *
 * @constructor Twilio.FlexApi.V1.GoodDataContext
 *
 * @param {V1} version - Version of the resource
 */
/* jshint ignore:end */
GoodDataContext = function GoodDataContext(version) {
  this._version = version;

  // Path Solution
  this._solution = {};
  this._uri = `/Insights/Session`;
};

/* jshint ignore:start */
/**
 * create a GoodDataInstance
 *
 * @function create
 * @memberof Twilio.FlexApi.V1.GoodDataContext#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.token] - The Token HTTP request header
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed GoodDataInstance
 */
/* jshint ignore:end */
GoodDataContext.prototype.create = function create(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var headers = values.of({'Token': _.get(opts, 'token')});

  var promise = this._version.create({uri: this._uri, method: 'POST', headers: headers});

  promise = promise.then(function(payload) {
    deferred.resolve(new GoodDataInstance(this._version, payload));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.FlexApi.V1.GoodDataContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
GoodDataContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

GoodDataContext.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  GoodDataList: GoodDataList,
  GoodDataPage: GoodDataPage,
  GoodDataInstance: GoodDataInstance,
  GoodDataContext: GoodDataContext
};