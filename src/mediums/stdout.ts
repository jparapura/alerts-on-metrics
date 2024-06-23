import { Medium, MessageType } from './interfaces';

class Stdout implements Medium {
  public initializeMedium(): void {
    // initialization not needed
  }

  public sendMessage(messageType: MessageType, message: string): void {
    console.log(`[ALERT]: ${message}`);
  }
}

const stdout: Stdout = new Stdout();
export default stdout;
