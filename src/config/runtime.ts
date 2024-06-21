import requireEnv from 'require-environment-variables';
import dotenv from 'dotenv';

dotenv.config();

const loadConfig = () => {
  const env = requireEnv(['UPDATE_INTERVAL', 'IAM_ALIVE_MESSAGE_INTERVAL']);

  return {
    secrets: {
      // intentionally left blank
    },
    timing: {
      updateInterval: env.UPDATE_INTERVAL,
      iamAliveMessageInterval: env.IAM_ALIVE_MESSAGE_INTERVAL,
    },
  };
};

const config = loadConfig();
export default config;
