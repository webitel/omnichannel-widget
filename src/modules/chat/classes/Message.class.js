import MessageStatus from '../enums/MessageStatus.enum';
import MessageType from '../enums/MessageType.enum';

export default class Message {
  notSent = false;

  constructor(msg) {
    if (msg.id) {
      this.#initMessage(msg);
    } else {
      this.#initPreview(msg);
    }
  }

  get preview() {
    return !!this.id;
  }

  get status() {
    if (this.notSent) return MessageStatus.ERROR;
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
    Object.assign(this, rest);
    this.createdAt = Date.now();
    this.seq = seq;
  }

  setSendingTimeout(timeout = 5) {
    setTimeout(() => {
      this.notSent = true;
    }, timeout * 1000);
  }
}
