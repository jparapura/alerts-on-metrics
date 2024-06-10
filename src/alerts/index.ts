import testAlertConfig from "../config/testAlert";
import { currentMetricState } from "./store";

export const executeAlertsPolicy = () => {
  if (currentMetricState.severityState === currentMetricState.previousSeverityState) {
    return;
  }

  currentMetricState.previousSeverityState = currentMetricState.severityState;
  // TODO output medium
  const output = `${currentMetricState.severityState}
Metric:
${currentMetricState.name}
${getInvalidMetricPrompt()}`;

  console.log(output);
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
}