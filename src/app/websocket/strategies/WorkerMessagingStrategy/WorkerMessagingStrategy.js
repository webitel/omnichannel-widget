import AbstractMessagingStrategy from '../AbstractMessagingStrategy';
import Worker from './workers/websocket-shared-worker.worker';
import WorkerMessageType from './enum/WorkerMessageType.enum';
import BROADCAST_NAME from './const/BROADCAST_NAME.const';

export default class WorkerMessagingStrategy extends AbstractMessagingStrategy {
  _worker = null;

  _broadcastChannel = null;

  init({ wsUrl }) {
    this._worker = new Worker();
    this._broadcastChannel = new BroadcastChannel(BROADCAST_NAME);
    this._worker.port.start();
    this._subscribeToMessages();
    this._send({ type: WorkerMessageType.INIT, data: { url: wsUrl } });
    return this;
  }

  sendMessage(data) {
    this._send({ type: WorkerMessageType.MESSAGE, data });
  }

  _send(msg) {
    return this._worker.port.postMessage(msg);
  }

  _subscribeToMessages() {
    this._worker.onmessage = this._msgCallback.bind(this);
    this._broadcastChannel.addEventListener('message', this._msgCallback.bind(this));
  }
}
