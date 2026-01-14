import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import DNSRecordsScreen from "./DNSRecordsScreen.js";

describe("DNSRecordsScreen", () => {
  it("renders header with DNS Records title", () => {
    const { lastFrame } = render(<DNSRecordsScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("DNS Records");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<DNSRecordsScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
