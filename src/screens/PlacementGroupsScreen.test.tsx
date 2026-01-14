import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import PlacementGroupsScreen from "./PlacementGroupsScreen.js";

describe("PlacementGroupsScreen", () => {
  it("renders header with Placement Groups title", () => {
    const { lastFrame } = render(<PlacementGroupsScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Placement Groups");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<PlacementGroupsScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
