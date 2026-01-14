import { Text } from "ink";
import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import CardBox from "./CardBox.js";

describe("CardBox", () => {
  it("renders children", () => {
    const { lastFrame } = render(
      <CardBox>
        <Text>Content here</Text>
      </CardBox>,
    );
    expect(lastFrame()).toContain("Content here");
  });

  it("renders title when provided", () => {
    const { lastFrame } = render(
      <CardBox title="My Card">
        <Text>Content</Text>
      </CardBox>,
    );
    expect(lastFrame()).toContain("My Card");
  });
});
