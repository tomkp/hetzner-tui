import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import SSHKeysScreen from "./SSHKeysScreen.js";

describe("SSHKeysScreen", () => {
  it("renders header with SSH Keys title", () => {
    const { lastFrame } = render(<SSHKeysScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("SSH Keys");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<SSHKeysScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
