'use strict';

var _ = require('lodash');
var Q = require('q');
var InstanceContext = require('../../../../base/InstanceContext');
var InstanceResource = require('../../../../base/InstanceResource');
var Page = require('../../../../base/Page');
var WorkerStatisticsList = require(
    './worker/workerStatistics').WorkerStatisticsList;
var WorkersStatisticsList = require(
    './worker/workersStatistics').WorkersStatisticsList;
var deserialize = require('../../../../base/deserialize');
var values = require('../../../../base/values');

var WorkerPage;
var WorkerList;
var WorkerInstance;
var WorkerContext;

/**
 * Initialize the WorkerPage
 *
 * @param {Version} version - Version that contains the resource
 * @param {Response} response - Response from the API
 * @param {string} workspaceSid - The workspace_sid
 *
 * @returns WorkerPage
 */
function WorkerPage(version, response, workspaceSid) {
  Page.prototype.constructor.call(this, version, response);

  // Path Solution
  this._solution = {
    workspaceSid: workspaceSid
  };
}

_.extend(WorkerPage.prototype, Page.prototype);
WorkerPage.prototype.constructor = WorkerPage;

/**
 * Build an instance of WorkerInstance
 *
 * @param {obj} payload - Payload response from the API
 *
 * @returns WorkerInstance
 */
WorkerPage.prototype.getInstance = function getInstance(payload) {
  return new WorkerInstance(
    this._version,
    payload,
    this._solution.workspaceSid
  );
};


/**
 * Initialize the WorkerList
 *
 * @param {Version} version - Version that contains the resource
 * @param {string} workspaceSid - The workspace_sid
 *
 * @returns WorkerList
 */
function WorkerList(version, workspaceSid) {
  function WorkerListInstance(sid) {
    return WorkerListInstance.get(sid);
  }

  WorkerListInstance._version = version;
  // Path Solution
  WorkerListInstance._solution = {
    workspaceSid: workspaceSid
  };
  WorkerListInstance._uri = _.template(
    '/Workspaces/<%= workspaceSid %>/Workers' // jshint ignore:line
  )(WorkerListInstance._solution);

  // Components
  WorkerListInstance._statistics = undefined;

  /**
   * Streams WorkerInstance records from the API.
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * @param {Function} callback - A callback function to process records
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         list() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {string} [opts.activityName] - The activity_name
   * @param {string} [opts.activitySid] - The activity_sid
   * @param {string} [opts.available] - The available
   * @param {string} [opts.friendlyName] - The friendly_name
   * @param {string} [opts.targetWorkersExpression] - The target_workers_expression
   * @param {string} [opts.taskQueueName] - The task_queue_name
   * @param {string} [opts.taskQueueSid] - The task_queue_sid
   */
  WorkerListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    if (_.isUndefined(callback)) {
      throw new Error('Callback function must be provided');
    }

    var currentPage = 1;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    var deferred = Q.defer();
    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        deferred.resolve();
      }

      promise.then(function(page) {
        if (_.isEmpty(page.instances)) {
          deferred.resolve();
        }

        _.each(page.instances, callback);

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          deferred.resolve();
        } else {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(deferred.reject);
    }

    fetchNextPage(_.bind(this.page, this, opts));

    return deferred.promise;
  };

  /**
   * Lists WorkerInstance records from the API as a list.
   *
   * @param {string} [opts.activityName] - The activity_name
   * @param {string} [opts.activitySid] - The activity_sid
   * @param {string} [opts.available] - The available
   * @param {string} [opts.friendlyName] - The friendly_name
   * @param {string} [opts.targetWorkersExpression] - The target_workers_expression
   * @param {string} [opts.taskQueueName] - The task_queue_name
   * @param {string} [opts.taskQueueSid] - The task_queue_sid
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   *
   * @returns {Array} A list of records
   */
  WorkerListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var allResources = [];
    var append = function(resource) {
      allResources.push(resource);
    };

    var deferred = Q.defer();
    var promise = this.each(opts, append);
    promise = promise.then(function() {
      deferred.resolve(allResources);
    });

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /**
   * Retrieve a single page of WorkerInstance records from the API.
   * Request is executed immediately
   *
   * @param {string} [opts.activityName] - The activity_name
   * @param {string} [opts.activitySid] - The activity_sid
   * @param {string} [opts.available] - The available
   * @param {string} [opts.friendlyName] - The friendly_name
   * @param {string} [opts.targetWorkersExpression] - The target_workers_expression
   * @param {string} [opts.taskQueueName] - The task_queue_name
   * @param {string} [opts.taskQueueSid] - The task_queue_sid
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   *
   * @returns Page of WorkerInstance
   */
  WorkerListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'ActivityName': opts.activityName,
      'ActivitySid': opts.activitySid,
      'Available': opts.available,
      'FriendlyName': opts.friendlyName,
      'TargetWorkersExpression': opts.targetWorkersExpression,
      'TaskQueueName': opts.taskQueueName,
      'TaskQueueSid': opts.taskQueueSid,
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({
      uri: this._uri,
      method: 'GET',
      params: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new WorkerPage(
        this._version,
        payload,
        this._solution.workspaceSid
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /**
   * Create a new WorkerInstance
   *
   * @param {string} opts.friendlyName - The friendly_name
   * @param {string} [opts.activitySid] - The activity_sid
   * @param {string} [opts.attributes] - The attributes
   *
   * @returns Newly created WorkerInstance
   */
  WorkerListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameters friendlyName are missing.');  // jshint ignore:line
    }
    if (_.isUndefined(opts.friendlyName)) {
      throw new Error('Required parameter "friendlyName" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'FriendlyName': opts.friendlyName,
      'ActivitySid': opts.activitySid,
      'Attributes': opts.attributes
    });

    var promise = this._version.create({
      uri: this._uri,
      method: 'POST',
      data: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new WorkerInstance(
        this._version,
        payload,
        this._solution.workspaceSid
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  Object.defineProperty(WorkerListInstance,
    'statistics', {
    get: function statistics() {
      if (!this._statistics) {
        this._statistics = new WorkersStatisticsList(
          this._version,
          this._solution.workspaceSid
        );
      }

      return this._statistics;
    },
  });

  /**
   * Constructs a WorkerContext
   *
   * @param {string} sid - The sid
   *
   * @returns WorkerContext
   */
  WorkerListInstance.get = function get(sid) {
    return new WorkerContext(
      this._version,
      this._solution.workspaceSid,
      sid
    );
  };

  return WorkerListInstance;
}


/**
 * Initialize the WorkerContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {object} payload - The instance payload
 * @param {sid} workspaceSid - The workspace_sid
 * @param {sid} sid - The sid
 *
 * @returns {WorkerContext}
 */
function WorkerInstance(version, payload, workspaceSid, sid) {
  InstanceResource.prototype.constructor.call(this, version);

  // Marshaled Properties
  this._properties = {
    accountSid: payload.account_sid, // jshint ignore:line,
    activityName: payload.activity_name, // jshint ignore:line,
    activitySid: payload.activity_sid, // jshint ignore:line,
    attributes: payload.attributes, // jshint ignore:line,
    available: payload.available, // jshint ignore:line,
    dateCreated: deserialize.iso8601DateTime(payload.date_created), // jshint ignore:line,
    dateStatusChanged: deserialize.iso8601DateTime(payload.date_status_changed), // jshint ignore:line,
    dateUpdated: deserialize.iso8601DateTime(payload.date_updated), // jshint ignore:line,
    friendlyName: payload.friendly_name, // jshint ignore:line,
    sid: payload.sid, // jshint ignore:line,
    workspaceSid: payload.workspace_sid, // jshint ignore:line,
  };

  // Context
  this._context = undefined;
  this._solution = {
    workspaceSid: workspaceSid,
    sid: sid || this._properties.sid,
  };
}

_.extend(WorkerInstance.prototype, InstanceResource.prototype);
WorkerInstance.prototype.constructor = WorkerInstance;

Object.defineProperty(WorkerInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new WorkerContext(
        this._version,
        this._solution.workspaceSid,
        this._solution.sid
      );
    }

    return this._context;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'accountSid', {
  get: function() {
    return this._properties.accountSid;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'activityName', {
  get: function() {
    return this._properties.activityName;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'activitySid', {
  get: function() {
    return this._properties.activitySid;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'attributes', {
  get: function() {
    return this._properties.attributes;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'available', {
  get: function() {
    return this._properties.available;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'dateCreated', {
  get: function() {
    return this._properties.dateCreated;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'dateStatusChanged', {
  get: function() {
    return this._properties.dateStatusChanged;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'dateUpdated', {
  get: function() {
    return this._properties.dateUpdated;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'friendlyName', {
  get: function() {
    return this._properties.friendlyName;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'sid', {
  get: function() {
    return this._properties.sid;
  },
});

Object.defineProperty(WorkerInstance.prototype,
  'workspaceSid', {
  get: function() {
    return this._properties.workspaceSid;
  },
});

/**
 * Fetch a WorkerInstance
 *
 * @returns Fetched WorkerInstance
 */
WorkerInstance.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new WorkerInstance(
      this._version,
      payload,
      this._solution.workspaceSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Update the WorkerInstance
 *
 * @param {string} [opts.activitySid] - The activity_sid
 * @param {string} [opts.attributes] - The attributes
 * @param {string} [opts.friendlyName] - The friendly_name
 *
 * @returns Updated WorkerInstance
 */
WorkerInstance.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'ActivitySid': opts.activitySid,
    'Attributes': opts.attributes,
    'FriendlyName': opts.friendlyName
  });

  var promise = this._version.update({
    uri: this._uri,
    method: 'POST',
    data: data
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new WorkerInstance(
      this._version,
      payload,
      this._solution.workspaceSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Deletes the WorkerInstance
 *
 * @returns true if delete succeeds, false otherwise
 */
WorkerInstance.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Access the statistics
 *
 * @returns statistics
 */
WorkerInstance.prototype.statistics = function statistics() {
  return this._proxy.statistics;
};


/**
 * Initialize the WorkerContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {sid} workspaceSid - The workspace_sid
 * @param {sid} sid - The sid
 *
 * @returns {WorkerContext}
 */
function WorkerContext(version, workspaceSid, sid) {
  InstanceContext.prototype.constructor.call(this, version);

  // Path Solution
  this._solution = {
    workspaceSid: workspaceSid,
    sid: sid,
  };
  this._uri = _.template(
    '/Workspaces/<%= workspaceSid %>/Workers/<%= sid %>' // jshint ignore:line
  )(this._solution);

  // Dependents
  this._statistics = undefined;
}

_.extend(WorkerContext.prototype, InstanceContext.prototype);
WorkerContext.prototype.constructor = WorkerContext;

/**
 * Fetch a WorkerInstance
 *
 * @returns Fetched WorkerInstance
 */
WorkerContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new WorkerInstance(
      this._version,
      payload,
      this._solution.workspaceSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Update the WorkerInstance
 *
 * @param {string} [opts.activitySid] - The activity_sid
 * @param {string} [opts.attributes] - The attributes
 * @param {string} [opts.friendlyName] - The friendly_name
 *
 * @returns Updated WorkerInstance
 */
WorkerContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'ActivitySid': opts.activitySid,
    'Attributes': opts.attributes,
    'FriendlyName': opts.friendlyName
  });

  var promise = this._version.update({
    uri: this._uri,
    method: 'POST',
    data: data
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new WorkerInstance(
      this._version,
      payload,
      this._solution.workspaceSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Deletes the WorkerInstance
 *
 * @returns true if delete succeeds, false otherwise
 */
WorkerContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

Object.defineProperty(WorkerContext.prototype,
  'statistics', {
  get: function() {
    if (!this._statistics) {
      this._statistics = new WorkerStatisticsList(
        this._version,
        this._solution.workspaceSid,
        this._solution.sid
      );
    }
    return this._statistics;
  },
});

module.exports = {
  WorkerPage: WorkerPage,
  WorkerList: WorkerList,
  WorkerInstance: WorkerInstance,
  WorkerContext: WorkerContext
};