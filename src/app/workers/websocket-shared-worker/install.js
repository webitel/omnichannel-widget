// https://dev.to/ayushgp/scaling-websocket-connections-using-shared-workers-14mj
import Worker from './websocket-shared-worker.worker';
import WorkerController from './classes/WorkerController';

const worker = new Worker();
const workerController = new WorkerController(worker);

export default workerController;
