// https://dev.to/ayushgp/scaling-websocket-connections-using-shared-workers-14mj

import { v4 as uuidv4 } from 'uuid';
import Worker from './websocket-shared-worker.worker';

// Create a SharedWorker Instance using the worker.js file.
// You need this to be present in all JS files that want access to the socket
const worker = new Worker();

// Create a unique identifier using the uuid lib. This will help us
// in identifying the tab from which a message was sent. And if a
// response is sent from server for this tab, we can redirect it using
// this id.
const id = uuidv4();

const msgCallbacks = [];
const addMsgCallback = (callback) => msgCallbacks.push(callback);

// Listen to broadcasts from server
const handleBroadcast = (data) => {
  console.log('This message is meant for everyone!');
  console.log(data);
  msgCallbacks.forEach((callback) => callback(data));
};

// Handle event only meant for this tab
const handleMessageFromPort = (data) => {
  console.log(`This message is meant only for user with id: ${id}`);
  console.log(data);
};

// Set initial web socket state to connecting. We'll modify this based
// on events.
let wsState = WebSocket.CONNECTING;
console.info('init shared worker for id ', id);

// Connect to the shared worker
worker.port.start();

// Set an event listener that either sets state of the web socket
// Or handles data coming in for ONLY this tab.
worker.port.onmessage = (event) => {
  console.info('message', event);
  switch (event.data.type) {
    case 'WSState':
      wsState = event.data.state;
      break;
    case 'message':
      handleMessageFromPort(event.data);
      break;
    case 'error':
      handleMessageFromPort(event.data);
      break;
    case 'info':
      handleMessageFromPort(event.data);
      break;
    default:
      console.warn('unknown WS WORKER event type', event);
  }
};

// Set up the broadcast channel to listen to web socket events.
// This is also similar to above handler. But the handler here is
// for events being broadcasted to all the tabs.
const broadcastChannel = new BroadcastChannel('WSChannel');
broadcastChannel.addEventListener('message', (event) => {
  switch (event.data.type) {
    case 'WSState':
      wsState = event.data.state;
      break;
    case 'message':
      handleBroadcast(event.data);
      break;
    case 'error':
      handleBroadcast(event.data);
      break;
    case 'info':
      handleBroadcast(event.data);
      break;
    default:
      console.warn('unknown WS BROADCAST event type', event);
  }
});

// Use this method to send data to the server.
const postMessageToWSServer = (data) => {
  if (wsState === WebSocket.CONNECTING) {
    console.info('Still connecting to the server, try again later!');
  } else if (
    wsState === WebSocket.CLOSING || wsState === WebSocket.CLOSED) {
    console.log('Connection Closed!');
  } else {
    worker.port.postMessage({ from: id, data });
  }
};

// Sent a message to server after approx 2.5 sec. This will
// give enough time to web socket connection to be created.
// setTimeout(() => postMessageToWSServer('Initial message'), 2500);

export {
  postMessageToWSServer,
  handleBroadcast,
  addMsgCallback,
};
