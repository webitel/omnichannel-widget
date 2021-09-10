// https://dev.to/ayushgp/scaling-websocket-connections-using-shared-workers-14mj
import WebsocketController from '../../../WebsocketController';
import WorkerMessageType from '../enum/WorkerMessageType.enum';
import BROADCAST_NAME from '../const/BROADCAST_NAME.const';

// Event handler called when a tab tries to connect to this worker.
// eslint-disable-next-line no-restricted-globals
self.onconnect = (event) => {
  // Get the MessagePort from the event. This will be the
  // communication channel between SharedWorker and the Tab
  const port = event.ports[0];
// Create a broadcast channel to notify about state changes
  const broadcast = new BroadcastChannel(BROADCAST_NAME);

  let ws;

  const wsOnMessage = (msg) => {
    broadcast.postMessage(msg);
    // const { type, data } = msg;
    // switch (type) {
    //   case MessageEvents.WS_STATE:
    //     broadcast.postMessage(data);
    //     break;
    //   case MessageEvents.INFO:
    //     broadcast.postMessage(data);
    //     break;
    //   case MessageEvents.ERROR:
    //     broadcast.postMessage(data);
    //     break;
    //   case MessageEvents.MESSAGE:
    //     broadcast.postMessage(data);
    //     break;
    //   default:
    // }
  };
  const sendToWS = (msg) => ws.send(msg);
  const openWS = (url) => {
    ws = new WebsocketController({ url, msgCallback: wsOnMessage });
  };

  port.onmessage = async (msg) => {
    console.info(msg);
    const { type, data } = msg.data;
    switch (type) {
      case WorkerMessageType.INIT:
        openWS(data.url);
        break;
      case WorkerMessageType.MESSAGE:
        try {
          await sendToWS(data);
          // msgClient.sendInfo(Channels.PORT, `${JSON.stringify(msg.data.data)} is sent to ws`);
        } catch (err) {
          throw err;
          // msgClient.sendError(Channels.PORT, { error });
        }
        break;
      default:
        // msgClient.sendError(Channels.PORT, {
        //   error: 'Unknown message type',
        //   params: [msg.data.type, msg],
        // });
    }
  };
};
