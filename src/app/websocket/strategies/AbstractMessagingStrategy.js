// FIXME IMPLEMENT "openSocket()" METHOD

export default class AbstractMessagingStrategy {
  _msgCallback = null;

  init({ wsUrl }) {
    this.openSocket(wsUrl);
    return this;
  }

  subscribe(callback) {
    this._msgCallback = callback;
    return this;
  }

  // override me
  openSocket() {
    return this;
  }

  // override me
  sendMessage() {
    return this;
  }
}
