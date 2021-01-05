'use strict';

const Base = require('./Base');

class Command extends Base {
  constructor(client, data) {
    super(client);
    
    this.name = data.name;
    
    this.description = data.descriptionİ
    
    this.options = data.options;
  }
  
  _patch(data) {
    this.name = data.name;
    
    this.description = data.description;
    
    this.options = data.options;
  }
}
