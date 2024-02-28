'use strict';

class EventBus {
  constructor() {
    if (!window.EventBus) {
      this.subscribers = {};
      window.EventBus = this;
    }

    return window.EventBus;

  }

  subscribe(eventType, callback) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(callback);
  }

  publish(eventType, data) {
    if (this.subscribers[eventType]) {
      this.subscribers[eventType].forEach(callback => callback(data));
    }
  }
}

export default new EventBus();