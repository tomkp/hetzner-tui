/**
 * Theme utilities for the TUI - colors, symbols, and formatters
 */

export const symbols = {
  success: "\u2713",
  error: "\u2717",
  warning: "\u26A0",
  info: "\u2139",
  bullet: "\u2022",
  running: "\u25CF",
  stopped: "\u25CB",
  pending: "\u25CB",
  arrow: "\u2192",
  separator: "\u2500",
} as const;

export const colors = {
  primary: "cyan",
  secondary: "blue",
  accent: "magenta",
  success: "green",
  error: "red",
  warning: "yellow",
  muted: "gray",
  text: "white",
} as const;

export type StatusFormat = {
  symbol: string;
  color: string;
};

export function formatStatus(status: string): StatusFormat {
  const normalized = status.toLowerCase();

  if (normalized === "running") {
    return { symbol: symbols.running, color: colors.success };
  }

  if (normalized === "off" || normalized === "stopped") {
    return { symbol: symbols.stopped, color: colors.muted };
  }

  // Starting, stopping, initializing, etc.
  return { symbol: symbols.pending, color: colors.warning };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
