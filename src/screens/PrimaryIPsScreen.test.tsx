import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import PrimaryIPsScreen from "./PrimaryIPsScreen.js";

describe("PrimaryIPsScreen", () => {
  it("renders header with Primary IPs title", () => {
    const { lastFrame } = render(<PrimaryIPsScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Primary IPs");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<PrimaryIPsScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
