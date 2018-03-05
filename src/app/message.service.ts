import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  /*
   The service exposes its cache of messages and two methods: one to add() a message to the cache and another to clear() the cache.
   */

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

}
