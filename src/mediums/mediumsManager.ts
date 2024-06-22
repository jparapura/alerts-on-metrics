import discord from './discord';
import { Medium, MessageType } from './interfaces';
import stdout from './stdout';

class MediumsManager {
  private readonly mediums: Medium[] = [stdout, discord];

  public async initializeAllMediums() {
    await Promise.all(
      this.mediums.map(async (medium) => {
        return medium.initializeMedium();
      }),
    );
  }

  public async notifyAllMediums(
    messageType: MessageType,
    message: string,
  ): Promise<void> {
    await Promise.all(
      this.mediums.map((medium) => {
        return medium.sendMessage(messageType, message);
      }),
    );
  }
}

const mediumsManager: MediumsManager = new MediumsManager();
export default mediumsManager;
