export enum MessageType {
  serviceAlive,
  metricOk,
  metricWarning,
  metricCritical,
  invalidRequest,
  internalError,
}

export interface Medium {
  initializeMedium(): void;
  sendMessage(messageType: MessageType, message: string): void;
}
