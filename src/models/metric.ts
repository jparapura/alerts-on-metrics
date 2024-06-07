export interface MetricState {
  name: string,
  receivedEvents: [number];
  currentValue: number;
  severityState: MetricSeverity;
  previousSeverityState: MetricSeverity;
};

export type MetricSeverity = 'error' | 'warning' | 'ok' | 'invalid state';
