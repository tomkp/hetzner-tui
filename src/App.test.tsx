import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import App from "./App.js";

describe("App", () => {
  it("renders without crashing", () => {
    const { lastFrame } = render(<App />);
    expect(lastFrame()).toBeDefined();
  });

  it("displays the application name", () => {
    const { lastFrame } = render(<App />);
    expect(lastFrame()).toContain("Hetzner");
  });
});
