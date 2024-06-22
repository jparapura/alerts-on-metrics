import requireEnv from 'require-environment-variables';
import dotenv from 'dotenv';

dotenv.config();

const loadConfig = () => {
  const env = requireEnv([
    'DISCORD_TOKEN',
    'DISCORD_MAIN_CHANNEL_ID',
    'UPDATE_INTERVAL',
    'IAM_ALIVE_MESSAGE_INTERVAL',
  ]);

  return {
    timing: {
      updateInterval: env.UPDATE_INTERVAL,
      iamAliveMessageInterval: env.IAM_ALIVE_MESSAGE_INTERVAL,
    },
    mediums: {
      discordMainChannelId: env.DISCORD_MAIN_CHANNEL_ID,
    },
    secrets: {
      discordToken: env.DISCORD_TOKEN,
    },
  };
};

const config = loadConfig();
export default config;
