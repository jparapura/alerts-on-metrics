import { MetricState } from "../models/metric";

export const currentMetricState: MetricState = {
  name: 's1_availability',
  receivedEvents: [] as unknown as [number],
  currentValue: 0,
  severityState: 'ok',
  previousSeverityState: 'error',
};