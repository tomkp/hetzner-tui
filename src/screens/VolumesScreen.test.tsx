import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import VolumesScreen from "./VolumesScreen.js";

describe("VolumesScreen", () => {
  it("renders header with Volumes title", () => {
    const { lastFrame } = render(<VolumesScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Volumes");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<VolumesScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
