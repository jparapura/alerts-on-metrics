import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { Medium, MessageType } from './interfaces';
import { logInfo } from '../basicService/logging/applicationLogging';
import config from '../config/runtime';

class Discord implements Medium {
  client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

  channels!: Channel[];

  public async initializeMedium(): Promise<void> {
    this.client.login(config.secrets.discordToken);
    this.client.once(Events.ClientReady, async (readyClient) => {
      logInfo(`Discord bot is ready. Logged in as ${readyClient.user.tag}`);

      this.channels = this.getChannels();
    });
  }

  public async sendMessage(messageType: MessageType, message: string): Promise<void> {
    const channel = this.getChannelForMessageType(messageType);
    await channel.send(message);
  }

  getChannels() {
    return [
      new Channel(this.client, MessageType.metricOk, config.mediums.discordMetricOkChannelId),
      new Channel(
        this.client,
        MessageType.metricWarning,
        config.mediums.discordMetricWarningChannelId,
      ),
      new Channel(
        this.client,
        MessageType.metricCritical,
        config.mediums.discordMetricCriticalChannelId,
      ),
      new Channel(
        this.client,
        MessageType.serviceAlive,
        config.mediums.discordServiceActiveChannelId,
      ),
      new Channel(
        this.client,
        MessageType.invalidRequest,
        config.mediums.discordInvalidRequestChannelId,
      ),
      new Channel(
        this.client,
        MessageType.internalError,
        config.mediums.discordInternalErrorChannelId,
      ),
    ];
  }

  getChannelForMessageType(messageType: MessageType): TextChannel {
    const result = this.channels.find((channel) => channel.messageType === messageType);
    if (!result) {
      throw Error(`No channel found for given message type: ${messageType}.`);
    }
    return result.textChannel;
  }
}

class Channel {
  channelId: string;
  messageType: MessageType;
  textChannel!: TextChannel;

  constructor(client: Client, messageType: MessageType, channelId: string) {
    this.messageType = messageType;
    this.channelId = channelId;

    this.getTextChannel(client);
  }

  async getTextChannel(client: Client) {
    this.textChannel = (await client.channels.fetch(this.channelId)) as TextChannel;
  }
}

const discord: Discord = new Discord();
export default discord;
