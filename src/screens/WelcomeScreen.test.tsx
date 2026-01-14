import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import WelcomeScreen from "./WelcomeScreen.js";

describe("WelcomeScreen", () => {
  it("renders welcome message", () => {
    const { lastFrame } = render(<WelcomeScreen onContinue={() => {}} />);
    expect(lastFrame()).toContain("Hetzner");
  });

  it("shows continue instruction", () => {
    const { lastFrame } = render(<WelcomeScreen onContinue={() => {}} />);
    expect(lastFrame()).toContain("continue");
  });
});
