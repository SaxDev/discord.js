'use strict';

const BaseManager = require('./BaseManager');
const Command = require('../structures/Command');
const { InteractionResponseType } = require('../util/Constants');

/**
 * Manages API methods for Guild Commands and stores their cache.
 * @extends {BaseManager}
 */
class GuildCommandManager extends BaseManager {
  constructor(guild, iterable) {
    super(guild.client, iterable, Command);

    /**
     * The guild this Manager belongs to
     * @type {Guild}
     */
    this.guild = guild;
  }
  
  add(data) {
    const existing = this.guild.commands.get(data.name)
    if (existing) return existing;
    return this.guild.client.api.applications(bot.user.id).guilds(this.guild.id).commands.post({data: {
      name: data.name,
      description: data.description,
      options: data.options ? data.options : []
    }})
  }
  
  update(data) {
  
  }
  
  delete(data) {
  
  }
}

module.exports = GuildCommandManager;
