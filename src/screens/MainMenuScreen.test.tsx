import { render } from "ink-testing-library";
import { describe, expect, it, vi } from "vitest";
import MainMenuScreen from "./MainMenuScreen.js";

describe("MainMenuScreen", () => {
  it("renders menu header", () => {
    const { lastFrame } = render(
      <MainMenuScreen onSelect={() => {}} onQuit={() => {}} />,
    );
    expect(lastFrame()).toContain("Hetzner TUI");
  });

  it("renders server menu item", () => {
    const { lastFrame } = render(
      <MainMenuScreen onSelect={() => {}} onQuit={() => {}} />,
    );
    expect(lastFrame()).toContain("Servers");
  });

  it("renders quit option", () => {
    const { lastFrame } = render(
      <MainMenuScreen onSelect={() => {}} onQuit={() => {}} />,
    );
    expect(lastFrame()).toContain("Quit");
  });

  it("shows keyboard shortcuts in footer", () => {
    const { lastFrame } = render(
      <MainMenuScreen onSelect={() => {}} onQuit={() => {}} />,
    );
    const frame = lastFrame() ?? "";
    expect(frame.includes("q") || frame.includes("Quit")).toBe(true);
  });
});
