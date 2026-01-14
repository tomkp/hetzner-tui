import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import Header from "./Header.js";

describe("Header", () => {
  it("renders the title", () => {
    const { lastFrame } = render(<Header title="Test Title" />);
    expect(lastFrame()).toContain("Test Title");
  });

  it("renders the subtitle when provided", () => {
    const { lastFrame } = render(
      <Header title="Title" subtitle="Subtitle text" />,
    );
    expect(lastFrame()).toContain("Subtitle text");
  });
});
