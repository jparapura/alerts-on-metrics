import { executeAlertsPolicy } from './alerts';
import mediumsManager from './mediums/mediumsManager';
import { updateMetricsState } from './metrics';
import { sendIamAliveMessages } from './selfNotify';
import config from './config/runtime';

export const startApp = () => {
  mediumsManager.initializeAllMediums();
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
