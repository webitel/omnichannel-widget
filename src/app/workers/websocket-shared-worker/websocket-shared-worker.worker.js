// https://dev.to/ayushgp/scaling-websocket-connections-using-shared-workers-14mj
import Channels from './enums/MessageChannels.enum';
import WorkerMessageController from './classes/WorkerMessageController';

// Event handler called when a tab tries to connect to this worker.
// eslint-disable-next-line no-restricted-globals
self.onconnect = (event) => {
  // Get the MessagePort from the event. This will be the
  // communication channel between SharedWorker and the Tab
  const port = event.ports[0];
// Create a broadcast channel to notify about state changes
  const broadcast = new BroadcastChannel('WSChannel');

  const msgController = new WorkerMessageController({ broadcast, port });

  let ws;

// Let all connected contexts(tabs) know about state changes
  const wsOnOpen = () => msgController.sendWSState(Channels.BROADCAST, ws.readyState);
  const wsOnClose = () => msgController.sendWSState(Channels.BROADCAST, ws.readyState);
  const wsOnError = (error) => msgController.sendError(Channels.BROADCAST, { error });

// When we receive data from the server.
  const wsOnMessage = ({ data }) => {
    // Construct object to be passed to handlers
    const message = JSON.parse(data);
    msgController.sendMessage(Channels.BROADCAST, message);
  };

  const openWS = (url) => {
    // Open a connection. This is a common
// connection. This will be opened only once.
    ws = new WebSocket(url);
    ws.onopen = wsOnOpen;
    ws.onclose = wsOnClose;
    ws.onerror = wsOnError;
    ws.onmessage = wsOnMessage;

    // We need this to notify the newly connected context to know
    // the current state of WS connection.
    // msgController.sendWSState(Channels.BROADCAST, ws.readyState);
  };

  const sendToWS = (message) => {
    // eslint-disable-next-line no-case-declarations
    const wsMsg = JSON.stringify(message);
    // Forward this message to the ws connection.
    return ws.send(wsMsg);
  };

  port.onmessage = async (msg) => {
    switch (msg.data.type) {
      case 'init':
        openWS(msg.data.data.url);
        break;
      case 'message':
        try {
          await sendToWS(msg.data.data);
          msgController.sendInfo(Channels.PORT, `${msg.data.data} is sent to ws`);
        } catch (error) {
          msgController.sendError(Channels.PORT, { error });
        }
        break;
      default:
        msgController.sendError(Channels.PORT, {
          error: 'Unknown message type',
          params: [msg.data.type, msg],
        });
    }
  };
};
