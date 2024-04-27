import { Injectable, Logger } from '@nestjs/common';
import { fromEvent } from 'rxjs';
import { EventEmitter } from 'events';
import { SseEvents } from './types/events';
import { group_user, user } from '@prisma/client';

const TTLTime = 50; // 6 seconds

@Injectable()
export class EventsService {
  private readonly emitter: EventEmitter;
  private readonly eventsServiceLogger = new Logger(EventsService.name);
  private readonly clients = new Map<string, EventEmitter>();
  private readonly ttlMap = new Map<string, number>();
  private cleanupTimer: NodeJS.Timeout;

  constructor() {
    this.emitter = new EventEmitter();
  }

  cleanupExpiredEntries() {
    for (const [key, ttl] of this.ttlMap?.entries()) {
      if (Date.now() > ttl) {
        this.clients.delete(key);
        this.ttlMap.delete(key);
      }
    }
  }

  /**
   *
   * @param key the userId to set the client to in the clients map
   * @param value the EventEmitter to set to the client
   * @param ttlInSeconds Time to live in seconds
   */
  setWithTTL(key: string, value: EventEmitter, ttlInSeconds: number) {
    this.clients.set(key, value);
    this.ttlMap.set(key, Date.now() + ttlInSeconds * 1000); // Convert seconds to milliseconds

    // Start a cleanup timer if one doesn't exist
    if (!this.cleanupTimer) {
      this.cleanupTimer = setInterval(() => {
        this.cleanupExpiredEntries();
      }, 1000); // Check every second
    }
  }

  async subscribe(userId: number) {
    const clientEmitter = new EventEmitter();

    this.eventsServiceLogger.log(`Subscribing user ${userId} to events`);
    this.setWithTTL('sse-user-' + userId, clientEmitter, TTLTime);

    // Forward events from the main emitter to this client's emitter
    fromEvent(this.emitter, 'notifications').subscribe((data) =>
      clientEmitter.emit('notifications', data),
    );

    return fromEvent(clientEmitter, 'notifications');
  }

  async emitToUser(userId: number, data: SseEvents) {
    this.eventsServiceLogger.log(
      `Emitting event ${data.eventName} to user sse-user-${userId}`,
    );
    const clientEmitter = this.clients.get(`sse-user-${userId}`);

    // If the user is not subscribed to events, do nothing (temporary solution)
    if (!clientEmitter) {
      this.eventsServiceLogger.warn(
        `User ${userId} is not subscribed to events`,
      );
      return;
    }

    // debounce
    /**
     * extend the ttl for the client as long as it is not inactive
     */
    this.setWithTTL('sse-user-' + userId, clientEmitter, TTLTime);

    clientEmitter.emit('notifications', { data });
  }

  async emit(
    eligibleNotificationRecepients: group_user[] | user[],
    data: SseEvents,
  ) {
    // this encapsulation may be unnecessary
    eligibleNotificationRecepients.forEach((user: group_user | user) => {
      this.emitToUser(user.user_id, data);
    });
  }
}
