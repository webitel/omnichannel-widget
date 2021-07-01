import Channels from '../enums/MessageChannels.enum';
import MessageEvents from '../enums/MessageEvents.enum';

export default class WorkerMessageClient {
  constructor({ broadcast, port }) {
    this._broadcastChannel = broadcast;
    this._port = port;
  }

  sendMessage(receiver, data) {
    const msg = { type: MessageEvents.MESSAGE, data };
    return this._sendMessage(receiver, msg);
  }

  sendInfo(receiver, data) {
    const msg = { type: MessageEvents.INFO, data };
    return this._sendMessage(receiver, msg);
  }

  sendError(receiver, { error, params }) {
    const msg = {
      type: MessageEvents.ERROR,
      data: { error, params },
    };
    return this._sendMessage(receiver, msg);
  }

  sendWSState(receiver, data) {
    const msg = { type: MessageEvents.WS_STATE, data };
    return this._sendMessage(receiver, msg);
  }

  _sendMessage(receiver, msg) {
    if (receiver === Channels.BROADCAST) {
      this._broadcastMessage(msg);
    } else {
      this._portMessage(msg);
    }
  }

  _broadcastMessage(msg) {
    return this._broadcastChannel.postMessage(msg);
  }

  _portMessage(msg) {
    return this._port.postMessage(msg);
  }
}
