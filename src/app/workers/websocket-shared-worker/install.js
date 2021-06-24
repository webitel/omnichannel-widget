// https://dev.to/ayushgp/scaling-websocket-connections-using-shared-workers-14mj
import { v4 as uuidv4 } from 'uuid';
import Worker from './websocket-shared-worker.worker';

class WorkerController {
// Set initial web socket state to connecting. We'll modify this based
// on events.
  _wsState = WebSocket.CONNECTING;

// Create a unique identifier using the uuid lib. This will help us
// in identifying the tab from which a message was sent. And if a
// response is sent from server for this tab, we can redirect it using
// this id.
  _id = uuidv4();

  _msgCallbacks = [];

  constructor(url) {
    if (!url) throw new ReferenceError('no websocket url were passed to WorkerController');
    this._url = url;

    // Create a SharedWorker Instance using the worker.js file.
    // You need this to be present in all JS files that want access to the socket
    this._worker = new Worker();
    // Connect to the shared worker
    this._worker.port.start();

    // Set an event listener that either sets state of the web socket
// Or handles data coming in for ONLY this tab.
    this._worker.port.onmessage = this._handleMessageFromPort;

    // Set up the broadcast channel to listen to web socket events.
// This is also similar to above handler. But the handler here is
// for events being broadcasted to all the tabs.
    const broadcastChannel = new BroadcastChannel('WSChannel');
    broadcastChannel.addEventListener('message', this._handleBroadcast);
  }

// Use this method to send data to the server.
  postMessageToWSServer(data) {
    if (this._wsState === WebSocket.CONNECTING) {
      console.info('Still connecting to the server, try again later!');
    } else if (
      this._wsState === WebSocket.CLOSING || this._wsState === WebSocket.CLOSED) {
      console.log('Connection Closed!');
    } else {
      this._worker.port.postMessage({ from: this._id, data });
    }
  }

  addMsgCallback(callback) {
    this._msgCallbacks.push(callback);
  }

  replaceMsgCallback(oldCallback, newCallback) {
    this._msgCallbacks.splice(this._msgCallbacks.indexOf(oldCallback), 1, newCallback);
  }

  _handleBroadcastMessage(event) {
    console.info('message', event.data);
    switch (event.data.type) {
      case 'WSState':
        this._wsState = event.data.state;
        break;
      case 'message':
        this._handleBroadcast(event.data);
        break;
      case 'error':
        this._handleBroadcast(event.data);
        throw new Error(event.data);
        break;
      case 'info':
        this._handleBroadcast(event.data);
        break;
      default:
        console.warn('unknown WS BROADCAST event type', event);
    }
  }

  _handleWorkerMessage(event) {
    console.info('message', event.data);
    switch (event.data.type) {
      case 'WSState':
        this._wsState = event.data.state;
        break;
      case 'message':
        this._handleMessageFromPort(event.data);
        break;
      case 'error':
        this._handleMessageFromPort(event.data);
        throw new Error(event.data);
        break;
      case 'info':
        this._handleMessageFromPort(event.data);
        break;
      default:
        console.warn('unknown WS WORKER event type', event);
    }
  }

// Listen to broadcasts from server
  _handleBroadcast(data) {
    console.log('This message is meant for everyone!');
    console.log(data);
    this._msgCallbacks.forEach((callback) => callback(data));
  }

// Handle event only meant for this tab
  _handleMessageFromPort(data) {
    console.log(`This message is meant only for user with id: ${id}`);
    console.log(data);
    this._msgCallbacks.forEach((callback) => callback(data));
  }
}

const workerController = new WorkerController();

export {
  w
};
