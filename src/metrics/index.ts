import { currentMetricState } from '../alerts/store';
import config from '../config/runtime';
import testAlertConfig from '../config/testAlert';
import { MetricSeverity } from '../models/metric';

export const updateMetricsState = () => {
  const now = Date.now();
  const eventsThreshold =
    now -
    testAlertConfig.okThreshold *
      1000 *
      (config.timing.updateInterval as unknown as number);
  const relevantEvents = currentMetricState.receivedEvents.filter(
    (date) => date >= eventsThreshold,
  );
  currentMetricState.receivedEvents = relevantEvents as [number];
  currentMetricState.currentValue = relevantEvents.length;
  let severityState: MetricSeverity = 'invalid state';
  if (currentMetricState.currentValue <= testAlertConfig.errorThreshold) {
    severityState = 'error';
  } else if (currentMetricState.currentValue >= testAlertConfig.okThreshold) {
    severityState = 'ok';
  } else {
    severityState = 'warning';
  }
  currentMetricState.severityState = severityState;
};

export const registerAliveEvent = () => {
  const now = Date.now();
  currentMetricState.receivedEvents.push(now);
  return now;
};
