import { executeAlertsPolicy } from './alerts';
import config from './config/runtime';
import { updateMetricsState } from './metrics';
import { sendIamAliveMessages } from './selfNotify';

export const startApp = () => {
  sendIamAliveMessages();
  processEvents();
};

const processEvents = () => {
  updateMetricsState();
  executeAlertsPolicy();
  setTimeout(
    processEvents,
    1000 * (config.timing.updateInterval as unknown as number),
  );
};
