"use client";

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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-memory-border bg-memory-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-memory-accent hover:shadow-md"
        >
          {/* Golden accent */}
          <div className="absolute left-0 top-0 h-full w-1 bg-memory-accent" />

          <div className="pl-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-memory-accent">
              {metric.label}
            </p>

            <p className="mt-2 font-serif text-3xl font-bold text-memory-maroon">
              {metric.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}