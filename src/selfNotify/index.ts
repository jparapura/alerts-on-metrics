import config from '../config/runtime';
import { MessageType } from '../mediums/interfaces';
import mediumsManager from '../mediums/mediumsManager';

export const sendIamAliveMessages = () => {
  // TODO: This is absolutely pathetic way to handle scenario when on service startup
  // we try to send service-alive message but there are mediums (like Discord) that
  // are not yet ready to receive requests.
  setTimeout(() => postponeInitialMessage(), 5000);
};

const postponeInitialMessage = () => {
  const output = generateServiceAliveMessage();
  mediumsManager.notifyAllMediums(MessageType.serviceAlive, output);
  setTimeout(
    sendIamAliveMessages,
    1000 * (config.timing.iamAliveMessageInterval as unknown as number),
  );
};

const generateServiceAliveMessage = () => {
  return `**Alert on Metrics Service Status**
**Check output:**
\`\`\`
Service is alive.
\`\`\``;
};
