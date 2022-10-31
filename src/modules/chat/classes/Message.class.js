import MessageStatus from '../enums/MessageStatus.enum';
import MessageType from '../enums/MessageType.enum';

export default class Message {
  /*
    We mark this property as private (_), but do not use private modifier (#)
    because Vue needs to see this property to make getter reactive somehow
   */
  _notSent = false;

  constructor(msg) {
    if (msg.id) {
      this.#initMessage(msg);
    } else {
      this.#initPreview(msg);
    }
  }

  get preview() {
    return !this.id;
  }

  get status() {
    if (this._notSent) return MessageStatus.ERROR;
    if (this.seq) return MessageStatus.SENDING;
    return MessageStatus.SENT;
  }

  #initMessage(message) {
    switch (message.type) {
      case MessageType.ERROR:
      case MessageType.TEXT:
      case MessageType.FILE:
      case MessageType.CONTACT:
      case MessageType.JOINED:
      case MessageType.LEFT:
      case MessageType.CLOSED:
      default:
        Object.assign(this, message);
    }
  }

  #initPreview({ seq, ...rest }) {
    this.createdAt = new Date().setSeconds(0);
    Object.assign(this, rest);
    this.seq = seq;
  }

  setSendingTimeout(timeout = 5) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this._notSent = true;
        resolve();
      }, timeout * 1000);
    });
  }
}
