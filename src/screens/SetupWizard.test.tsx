import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import SetupWizard from "./SetupWizard.js";

describe("SetupWizard", () => {
  it("renders setup wizard header", () => {
    const { lastFrame } = render(
      <SetupWizard onComplete={() => {}} onSkip={() => {}} />,
    );
    expect(lastFrame()).toContain("Setup Wizard");
  });

  it("shows cloud token step first", () => {
    const { lastFrame } = render(
      <SetupWizard onComplete={() => {}} onSkip={() => {}} />,
    );
    expect(lastFrame()).toContain("Step 1");
    expect(lastFrame()).toContain("Cloud");
  });

  it("shows skip instruction", () => {
    const { lastFrame } = render(
      <SetupWizard onComplete={() => {}} onSkip={() => {}} />,
    );
    expect(lastFrame()).toContain("Escape");
  });
});
