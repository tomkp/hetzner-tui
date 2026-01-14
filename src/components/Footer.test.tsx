import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import Footer from "./Footer.js";

describe("Footer", () => {
  it("renders key bindings", () => {
    const bindings = [
      { key: "q", label: "Quit" },
      { key: "r", label: "Refresh" },
    ];
    const { lastFrame } = render(<Footer bindings={bindings} />);
    expect(lastFrame()).toContain("q");
    expect(lastFrame()).toContain("Quit");
    expect(lastFrame()).toContain("r");
    expect(lastFrame()).toContain("Refresh");
  });

  it("renders status when provided", () => {
    const { lastFrame } = render(<Footer status="Connected" />);
    expect(lastFrame()).toContain("Connected");
  });
});
