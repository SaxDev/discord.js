'use strict';

const Base = require('./Base');
const { Error } = require('../errors');
const Snowflake = require('../util/Snowflake');

class User extends Base {
  /**
   * @param {Client} client The instantiating client
   * @param {Object} data The data for the user
   */
  constructor(client, data) {
    super(client);

    /**
     * The ID of the user
     * @type {Snowflake}
     */
    this.id = data.id;

    this._patch(data);
  }
  
  _patch(data) {
    this.name = data.name;
    this.description = data.description;
    this.options = data.options;
  }
}

module.exports = Command;
