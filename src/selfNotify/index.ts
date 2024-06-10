import { logInfo } from "../basicService/logging/applicationLogging";
import { IAM_ALIVE_MESSAGE_INTERVAL } from "../config/runtime";

export const sendIamAliveMessages = () => {
  logInfo('[SERVICE HEALTH] Alerts On Metrics Service is alive.')
  setTimeout(sendIamAliveMessages, 1000 * IAM_ALIVE_MESSAGE_INTERVAL);
};
