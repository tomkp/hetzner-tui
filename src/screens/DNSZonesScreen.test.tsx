import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import DNSZonesScreen from "./DNSZonesScreen.js";

describe("DNSZonesScreen", () => {
  it("renders header with DNS Zones title", () => {
    const { lastFrame } = render(<DNSZonesScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("DNS Zones");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<DNSZonesScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
