'use strict';

const Base = require('./Base');

/**
 * Represents a interaction on Discord.
 * @extends {Base}
 */
class Interaction extends Base {
  /**
   * @param {Client} client The instantiating client   
   */
  constructor(client) {
    super(client);
}
