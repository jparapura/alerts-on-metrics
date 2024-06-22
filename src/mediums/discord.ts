import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { Medium, MessageType } from './interfaces';
import { logInfo } from '../basicService/logging/applicationLogging';
import config from '../config/runtime';

class Discord implements Medium {
  client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

  mainChannel!: TextChannel;

  channelId = config.mediums.discordMainChannelId;

  public async initializeMedium(): Promise<void> {
    this.client.login(config.secrets.discordToken);
    this.client.once(Events.ClientReady, async (readyClient) => {
      logInfo(`Discord bot is ready. Logged in as ${readyClient.user.tag}`);
      this.mainChannel = (await this.client.channels.fetch(
        this.channelId,
      )) as TextChannel;
    });
  }

  public async sendMessage(
    messageType: MessageType,
    message: string,
  ): Promise<void> {
    // TODO translate messageType to channel id / channel name
    await this.mainChannel.send(message);
  }
}

const discord: Discord = new Discord();
export default discord;
