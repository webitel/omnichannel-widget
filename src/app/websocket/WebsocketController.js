import MessageEvents from './enums/MessageEvents.enum';

export default class WebsocketController {
  _ws = null;

  _callback = null;

  async send(msg) {
    return this._sendToWS(msg);
  }

  _sendToWS(msg) {
    const wsMsg = JSON.stringify(msg);
    return this._ws.send(wsMsg);
  }

  _wsOnOpen() {
    this._callback({ type: MessageEvents.WS_STATE, data: this._ws.readyState });
  }

  _wsOnClose(event) {
    this._callback({
      type: MessageEvents.INFO,
      data: { code: event.code, reason: event.reason },
    });
  }

  _wsOnError() {
    this._callback({
      type: MessageEvents.ERROR,
      data: 'ws error have occured',
    });
  }

  _wsOnMessage({ data }) {
    const message = JSON.parse(data);
    this._callback({ type: MessageEvents.MESSAGE, data: message });
  }

  _openWS(url) {
    if (!url) throw new Error('no url were passed to WS Controller');
    this._ws = new WebSocket(url);
    this._ws.onopen = this._wsOnOpen.bind(this);
    this._ws.onclose = this._wsOnClose.bind(this);
    this._ws.onerror = this._wsOnError.bind(this);
    this._ws.onmessage = this._wsOnMessage.bind(this);
  }

  constructor({ url, msgCallback }) {
    this._callback = msgCallback;
    this._openWS(url);
  }
}
