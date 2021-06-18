// https://dev.to/ayushgp/scaling-websocket-connections-using-shared-workers-14mj

const url = 'wss://dev.webitel.com/chat/ws';

// conn = new WebSocket("ws://" + document.location.host + "/ws");

// Create a broadcast channel to notify about state changes
const broadcastChannel = new BroadcastChannel('WSChannel');

// Mapping to keep track of ports. You can think of ports as
// mediums through we can communicate to and from tabs.
// This is a map from a uuid assigned to each context(tab)
// to its Port. This is needed because Port API does not have
// any identifier we can use to identify messages coming from it.
const idToPortMap = {};

// Open a connection. This is a common
// connection. This will be opened only once.
const ws = new WebSocket(url);

// Let all connected contexts(tabs) know about state changes
ws.onopen = () => broadcastChannel.postMessage({
  type: 'WSState',
  message: ws.readyState,
});
ws.onclose = () => broadcastChannel.postMessage({
  type: 'WSState',
  message: ws.readyState,
});

// When we receive data from the server.
ws.onmessage = ({ data }) => {
  console.info('message: ', data);
  // Construct object to be passed to handlers
  const parsed = {
    data: JSON.parse(data),
    type: 'message',
  };
  // Get the port to post to using the uuid, ie send to
  // expected tab only.
  if (parsed.data.from) idToPortMap[parsed.data.from].postMessage(parsed);
  // Broadcast to all contexts(tabs). This is because
  // no particular id was set on the from field here.
  // We're using this field to identify which tab sent
  // the message
  else broadcastChannel.postMessage(parsed);
};

// Event handler called when a tab tries to connect to this worker.
// eslint-disable-next-line no-restricted-globals
self.onconnect = (event) => {
  // Get the MessagePort from the event. This will be the
  // communication channel between SharedWorker and the Tab
  const port = event.ports[0];
  port.onmessage = async (msg) => {
    // Collect port information in the map
    idToPortMap[msg.data.from] = port;

    const wsMsg = JSON.stringify({ data: msg.data });
    console.info('msg', wsMsg);
    try {
      // Forward this message to the ws connection.
      await ws.send(wsMsg);
      port.postMessage({
        type: 'info',
        data: `${wsMsg} is sent to ws`,
      });
    } catch (err) {
      port.postMessage({
        type: 'error',
        data: err,
      });
    }
  };

  // We need this to notify the newly connected context to know
  // the current state of WS connection.
  port.postMessage({
    state: ws.readyState,
    type: 'WSState',
  });
};
