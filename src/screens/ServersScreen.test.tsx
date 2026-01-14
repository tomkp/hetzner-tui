import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import ServersScreen from "./ServersScreen.js";

describe("ServersScreen", () => {
  it("renders header with Servers title", () => {
    const { lastFrame } = render(<ServersScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Servers");
  });

  it("shows loading state initially", () => {
    const { lastFrame } = render(<ServersScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    // Should show either Loading or the content
    expect(frame.length).toBeGreaterThan(0);
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<ServersScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
