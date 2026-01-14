import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import SettingsScreen from "./SettingsScreen.js";

describe("SettingsScreen", () => {
  it("renders header with Settings title", () => {
    const { lastFrame } = render(
      <SettingsScreen onBack={() => {}} onRunSetup={() => {}} />,
    );
    expect(lastFrame()).toContain("Settings");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(
      <SettingsScreen onBack={() => {}} onRunSetup={() => {}} />,
    );
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
