import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import NetworksScreen from "./NetworksScreen.js";

describe("NetworksScreen", () => {
  it("renders header with Networks title", () => {
    const { lastFrame } = render(<NetworksScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Networks");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<NetworksScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
