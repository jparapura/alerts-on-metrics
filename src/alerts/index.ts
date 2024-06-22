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

  const output = generateAlertMessage();

  // TODO proper message type
  mediumsManager.notifyAllMediums(MessageType.metricOk, output);
};

const generateAlertMessage = () => {
  // TODO: power_availiability is hard coded here. This should be known as
  // alert name. Alert configuration should also allow for location field.
  const severityState = currentMetricState.severityState.toUpperCase();
  return `**${severityState}: power_availability
Check output:**
\`\`\`
Metric: ${currentMetricState.name}
${getInvalidMetricPrompt()}
\`\`\``;
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
