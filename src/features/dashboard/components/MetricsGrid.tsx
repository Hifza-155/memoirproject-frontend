import React from "react";

interface MetricItem {
  label: string;
  value: string | number;
}

interface MetricsGridProps {
  metrics: MetricItem[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-memory-light p-5 rounded-xl border border-memory-maroon shadow-2xs">
          <p className="text-xs font-medium text-memory-muted uppercase tracking-wider">{metric.label}</p>
          <p className="text-2xl font-serif font-bold text-memory-primary mt-1">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}