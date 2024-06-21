import { logInfo } from '../basicService/logging/applicationLogging';
import config from '../config/runtime';

export const sendIamAliveMessages = () => {
  logInfo('[SERVICE HEALTH] Alerts On Metrics Service is alive.');
  setTimeout(
    sendIamAliveMessages,
    1000 * (config.timing.iamAliveMessageInterval as unknown as number),
  );
};
