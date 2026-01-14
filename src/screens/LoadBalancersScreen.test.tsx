import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import LoadBalancersScreen from "./LoadBalancersScreen.js";

describe("LoadBalancersScreen", () => {
  it("renders header with Load Balancers title", () => {
    const { lastFrame } = render(<LoadBalancersScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Load Balancers");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<LoadBalancersScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
