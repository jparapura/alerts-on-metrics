import { executeAlertsPolicy } from "./alerts";
import { UPDATE_INTERVAL } from "./config/runtime";
import { updateMetricsState } from "./metrics";
import { sendIamAliveMessages } from "./selfNotify";

export const startApp = () => {
  sendIamAliveMessages();
  processEvents();
};

const processEvents = () => {
  updateMetricsState();
  executeAlertsPolicy();
  setTimeout(processEvents, 1000 * UPDATE_INTERVAL);
};