'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class InteractionCreateAction extends Action {
  handle(data) {
    const channel = this.client.channels.get(data.channel_id);
    /**
     * Emitted whenever a interaction is created.
     * @event Client#interactionCreate
     * @param {Interaction} The interaction that was created      
     */
    this.client.emit(Events.INTERACTION_CREATE, data, channel);
    return { data };
  }
}

module.exports = InteractionCreateAction;
