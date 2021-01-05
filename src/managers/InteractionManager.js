'use strict';

const BaseManager = require('./BaseManager');
const { TypeError } = require('../errors');
const Interaction = require('../structures/Interaction');
const Collection = require('../util/Collection');

/**
 * Manages API methods for Interactions and holds their cache.
 * @extends {BaseManager}
 */
class InteractionManager extends BaseManager {
  constructor(channel) {
    super(channel.client, Interaction, Collection);
    /**
     * The channel that the interaction belong to
     * @type {TextBasedChannel}
     */
    this.channel = channel;
  }
  
  /**
   * The cache of Interactions
   * @type {Collection<Snowflake, Interaction>}
   * @name InteractionManager#cache
   */

  add(data, cache) {
    return super.add(data, cache, { extras: [this.channel] });
  }
}

module.exports = InteractionManager;
