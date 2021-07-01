import MessageEvents from '../enums/MessageEvents.enum';

export default class WorkerController {
// Set initial web socket state to connecting. We'll modify this based
// on events.
  _wsState = WebSocket.CONNECTING;

  _listeners = {
    [MessageEvents.INFO]: [(e) => console.info(e)],
    [MessageEvents.MESSAGE]: [],
    [MessageEvents.ERROR]: [(e) => console.error(e)],
    [MessageEvents.WS_STATE]: [],
  };

  constructor(worker) {
    // Create a SharedWorker Instance using the worker.js file.
    // You need this to be present in all JS files that want access to the socket
    this._worker = worker;
    // Connect to the shared worker
    this._worker.port.start();

    // Set an event listener that either sets state of the web socket
// Or handles data coming in for ONLY this tab.
    this._worker.port.onmessage = this._handleWorkerMessage.bind(this);

    // Set up the broadcast channel to listen to web socket events.
// This is also similar to above handler. But the handler here is
// for events being broadcasted to all the tabs.
    const broadcastChannel = new BroadcastChannel('WSChannel');
    broadcastChannel.addEventListener('message', this._handleBroadcastMessage.bind(this));
  }

  openWebSocket(url) {
    if (!url) throw new ReferenceError('no websocket url were passed to WorkerController');
    this._url = url;
    this._postMessage({ data: { url }, type: 'init' });
  }

// Use this method to send data to the server.
  postMessageToWSServer(data) {
    if (this._wsState === WebSocket.CONNECTING) {
      console.info('Still connecting to the server, try again later!');
    } else if (
      this._wsState === WebSocket.CLOSING || this._wsState === WebSocket.CLOSED) {
      console.log('Connection Closed!');
    } else {
      this._postMessage({ data, type: 'message' });
    }
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

  _handleBroadcastMessage({ data }) {
    console.info('message', data);
    switch (data.type) {
      case MessageEvents.WS_STATE:
        this._wsState = data.state;
        break;
      case MessageEvents.MESSAGE:
        this._handleBroadcast(data);
        break;
      case MessageEvents.ERROR:
        this._handleBroadcast(data);
        throw new Error(JSON.stringify(data.data));
      case MessageEvents.INFO:
        this._handleBroadcast(data);
        break;
      default:
        console.warn('unknown WS BROADCAST event type', data);
    }
  }

  _handleWorkerMessage({ data }) {
    console.info('message', data);
    switch (data.type) {
      case MessageEvents.WS_STATE:
        this._wsState = data.state;
        break;
      case MessageEvents.MESSAGE:
        this._handleMessageFromPort(data);
        break;
      case MessageEvents.ERROR:
        this._handleMessageFromPort(data);
        throw new Error(data);
      case MessageEvents.INFO:
        this._handleMessageFromPort(data);
        break;
      default:
        console.warn('unknown WS WORKER event type', data);
    }
  }

// Listen to broadcasts from server
  _handleBroadcast(data) {
    console.log('This message is meant for everyone!', data);
    this._listeners[data.type].forEach((callback) => callback(data));
  }

// Handle event only meant for this tab
  _handleMessageFromPort(data) {
    console.log('This message is meant only for this port', data);
    this._listeners[data.type].forEach((callback) => callback(data));
  }

  _postMessage({ data, type }) {
    this._worker.port.postMessage({ data, type });
  }
}
