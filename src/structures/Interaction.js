'use strict';

const Base = require('./Base');
const SnowflakeUtil = require('../util/Snowflake');
const { ApplicationCommandOptionTypes, InteractionResponseType } = require('../util/Constants.js');

/**
 * Represents a interaction on Discord.
 * @extends {Base}
 */
class Interaction extends Base {
  /**
   * @param {Client} client The instantiating client
   * @param {Object} data The data for the interaction
   * @param {TextChannel|DMChannel|NewsChannel} channel The channel the interaction was sent in
   */
  constructor(client, data, channel) {
    super(client);
    
     /**
     * The channel that the interaction was sent in
     * @type {TextChannel|DMChannel|NewsChannel}
     */
    this.channel = channel;
    
    /**
     * Whether this interaction has been used
     * @type {boolean}
     */
    this.used = false;
    
    /**
    * The unique token generated to interact with the interaction
    * @type {InteractionToken}
    */
    this.token = data.token;
    
    if (data) this._patch(data);
  }
  
  _patch(data) {
    /**
    * The ID of the interaction
    * @type {Snowflake}
    */
    this.id = data.id;
    
    if ('type' in data) {
      /**
       * The type of the interaction
       * @type {?InteractionType}
       */
      this.type = ApplicationCommandOptionTypes[data.type];
    }
    
    if ('member' in data) {
      /**
      * The author of interaction
      * @type {?User}
      */
      this.author = this.client.users.add(data.member.user, !data.webhook_id)
    } else if (!this.member) {
      this.author = null;
    }
    
    if (this.member && data.member) {
      this.member._patch(data.member);
    } else if (data.member && this.guild && this.author) {
      this.guild.members.add(Object.assign(data.member, { user: this.author }));
    }
    
    if ('data' in data) {
      if ('command_id' in data.data) this.commandId = data.data.id;
      if ('name' in data.data) this.commandName = data.data.name;
      
      if ('options' in data.data) {
        this.options = data.data.options;
      }
    }
    
    /**
     * The timestamp the message was sent at
     * @type {number}
     */
    this.createdTimestamp = SnowflakeUtil.deconstruct(this.id).timestamp;
    
    
  }

  /**
   * Represents the author of the interaction as a guild member.
   * Only available if the interaction comes from a guild where the author is still a member
   * @type {?GuildMember}
   * @readonly
   */
  get member() {
    return this.guild ? this.guild.members.resolve(this.author) || null : null;
  }
 
  /**
   * The time the interaction was sent at
   * @type {Date}
   * @readonly
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
  
  /**
   * The guild the interaction was sent in (if in a guild channel)
   * @type {?Guild}
   * @readonly
   */
  get guild() {
    return this.channel.guild || null;
  }
  
  async response(type, data) {
    this.used = true;

    return this.client.api.interactions(this.id, this.token)
      .callback.post({data: {
        type: type,
        data: data
      }})
      .then(r => console.log(r));
  }
  
  toJSON() {
    return super.toJSON({
      channel: 'channelID',
      author: 'authorID',
      guild: 'guildID',
      member: false,
    });
  }
}

module.exports = Interaction;
