import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import LoadingSpinner from "./LoadingSpinner.js";

describe("LoadingSpinner", () => {
  it("renders default loading message", () => {
    const { lastFrame } = render(<LoadingSpinner />);
    expect(lastFrame()).toContain("Loading...");
  });

  it("renders custom message", () => {
    const { lastFrame } = render(<LoadingSpinner message="Fetching servers" />);
    expect(lastFrame()).toContain("Fetching servers");
  });
});
