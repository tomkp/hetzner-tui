import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import FloatingIPsScreen from "./FloatingIPsScreen.js";

describe("FloatingIPsScreen", () => {
  it("renders header with Floating IPs title", () => {
    const { lastFrame } = render(<FloatingIPsScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Floating IPs");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<FloatingIPsScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
