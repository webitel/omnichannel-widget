import MessageEvents from './enums/MessageEvents.enum';
import MainThreadMessagingStrategy from './strategies/MainThreadMessagingStrategy/MainThreadMessagingStrategy';
import WorkerMessagingStrategy from './strategies/WorkerMessagingStrategy/WorkerMessagingStrategy';

export default class MessageClient {
  _wsUrl = '';

  _msgStrategy = null;

  _listeners = {
    [MessageEvents.INFO]: [(e) => console.info(e)],
    [MessageEvents.MESSAGE]: [],
    [MessageEvents.ERROR]: [(e) => console.error(e)],
    [MessageEvents.WS_STATE]: [],
  };

  send(data) {
    return this._msgStrategy.sendMessage(data);
  }

  addEventListener(events, callback) {
    const _events = events.split(' ');
    _events.forEach((e) => {
      if (this._listeners[e]) {
        this._listeners[e].push(callback);
      } else {
        this._listeners[e] = [callback];
      }
    });
  }

  removeEventListener(events, callback) {
    const _events = events.split(' ');
    _events.forEach((e) => {
      if (this._listeners[e]) {
        this._listeners[e].splice(this._listeners[e].indexOf(callback), 1);
      } else {
        this._listeners[e] = [];
      }
    });
  }

  _handleMessage(msgEvent) {
    const { data } = msgEvent;
    const listeners = this._listeners[data.type];
    if (listeners) listeners.forEach((callback) => callback(data));
    else console.warn('there is no listeners for websocket event type: ', data.type);
  }

  _selectStrategy(workerSupport) {
    let strategy;

    if (workerSupport) strategy = new WorkerMessagingStrategy();
    else strategy = new MainThreadMessagingStrategy();

    strategy
      .subscribe(this._handleMessage.bind(this))
      .init({ wsUrl: this._wsUrl });
    this._msgStrategy = strategy;
  }

  constructor({ url, workerSupport }) {
    this._wsUrl = url;
    this._selectStrategy(workerSupport);
  }
}
