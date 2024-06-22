import testAlertConfig from '../config/testAlert';
import { MessageType } from '../mediums/interfaces';
import mediumsManager from '../mediums/mediumsManager';
import { currentMetricState } from './store';

export const executeAlertsPolicy = () => {
  if (
    currentMetricState.severityState ===
    currentMetricState.previousSeverityState
  ) {
    return;
  }

  currentMetricState.previousSeverityState = currentMetricState.severityState;

  // TODO separate function
  const output = `${currentMetricState.severityState}
Metric:
${currentMetricState.name}
${getInvalidMetricPrompt()}`;

  // TODO proper message type
  mediumsManager.notifyAllMediums(MessageType.metricOk, output);
};

const getInvalidMetricPrompt = () => {
  switch (currentMetricState.severityState) {
    case 'ok':
      return `${currentMetricState.currentValue} >= ${testAlertConfig.okThreshold}`;
    case 'warning':
      return `${currentMetricState.currentValue} < ${testAlertConfig.okThreshold}`;
    case 'error':
      return `${currentMetricState.currentValue} <= ${testAlertConfig.errorThreshold}`;
  }
};
