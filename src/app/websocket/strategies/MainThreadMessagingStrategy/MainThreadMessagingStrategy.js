import AbstractMessagingStrategy from '../AbstractMessagingStrategy';
import WebsocketController from '../../WebsocketController';

export default class MainThreadMessagingStrategy extends AbstractMessagingStrategy {
  _ws = null;

  init({ wsUrl }) {
    this._ws = new WebsocketController({ url: wsUrl, msgCallback: this._msgCallback });
    return this;
  }

  sendMessage(data) {
    return this._ws.send(data);
  }
}
