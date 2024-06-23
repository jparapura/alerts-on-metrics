import requireEnv from 'require-environment-variables';
import dotenv from 'dotenv';

dotenv.config();

const loadConfig = () => {
  const env = requireEnv([
    'DISCORD_TOKEN',
    'DISCORD_METRIC_OK_CHANNEL_ID',
    'DISCORD_METRIC_WARNING_CHANNEL_ID',
    'DISCORD_METRIC_CRITICAL_CHANNEL_ID',
    'DISCORD_SERVICE_ALIVE_CHANNEL_ID',
    'DISCORD_INVALID_REQUEST_CHANNEL_ID',
    'DISCORD_INTERNAL_ERROR_CHANNEL_ID',
    'UPDATE_INTERVAL',
    'IAM_ALIVE_MESSAGE_INTERVAL',
  ]);

  return {
    timing: {
      updateInterval: env.UPDATE_INTERVAL,
      iamAliveMessageInterval: env.IAM_ALIVE_MESSAGE_INTERVAL,
    },
    mediums: {
      discordMetricOkChannelId: env.DISCORD_METRIC_OK_CHANNEL_ID,
      discordMetricWarningChannelId: env.DISCORD_METRIC_WARNING_CHANNEL_ID,
      discordMetricCriticalChannelId: env.DISCORD_METRIC_CRITICAL_CHANNEL_ID,
      discordServiceActiveChannelId: env.DISCORD_SERVICE_ALIVE_CHANNEL_ID,
      discordInvalidRequestChannelId: env.DISCORD_INVALID_REQUEST_CHANNEL_ID,
      discordInternalErrorChannelId: env.DISCORD_INTERNAL_ERROR_CHANNEL_ID,
    },
    secrets: {
      discordToken: env.DISCORD_TOKEN,
    },
  };
};

const config = loadConfig();
export default config;
