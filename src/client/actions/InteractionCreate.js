'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class InteractionCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const interaction client.api.interactions(data.interaction.id, data.interaction.token)
    if (interaction) {
      /**
       * Emitted whenever a interaction is created.
       * @event Client#interactionCreate
       * @param {Interaction} The interaction that was created
       */
      client.emit(Events.INTERACTION_CREATE, interaction);
    }
    return { interaction };
  }
}

module.exports = InteractionCreateAction;
