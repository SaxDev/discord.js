'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class InteractionCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const channel = client.channels.cache.get(data.channel_id);
    if (channel) {
      const existing = channel.interactions.cache.get(data.id);
      if (existing) return { interaction: existing };
      const interaction = channel.interactions.add(data);
      const user = interaction.author;
      let member = interaction.member;
      
      /**
      * Emitted whenever a interaction is created.
      * @event Client#interactionCreate
      * @param {Interaction} The interaction that was created      
      */
      this.client.emit(Events.INTERACTION_CREATE, interaction);
    }
    return { interaction };
  }
}

module.exports = InteractionCreateAction;
