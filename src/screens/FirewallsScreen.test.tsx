import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import FirewallsScreen from "./FirewallsScreen.js";

describe("FirewallsScreen", () => {
  it("renders header with Firewalls title", () => {
    const { lastFrame } = render(<FirewallsScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Firewalls");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<FirewallsScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
