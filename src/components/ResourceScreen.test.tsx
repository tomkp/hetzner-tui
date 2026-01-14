import { Text } from "ink";
import { render } from "ink-testing-library";
import { describe, expect, it, vi } from "vitest";
import ResourceScreen from "./ResourceScreen.js";

describe("ResourceScreen", () => {
  it("renders title", () => {
    const { lastFrame } = render(
      <ResourceScreen
        title="Test Resources"
        subtitle="Test subtitle"
        onBack={() => {}}
        fetchData={async () => []}
        renderItem={() => <Text>Item</Text>}
        getItemKey={(item) => String(item)}
      />,
    );
    expect(lastFrame()).toContain("Test Resources");
  });

  it("shows loading state initially", () => {
    const { lastFrame } = render(
      <ResourceScreen
        title="Resources"
        onBack={() => {}}
        fetchData={() => new Promise(() => {})} // Never resolves
        renderItem={() => <Text>Item</Text>}
        getItemKey={(item) => String(item)}
      />,
    );
    expect(lastFrame()).toContain("Loading");
  });

  it("shows empty state when no items", async () => {
    const { lastFrame } = render(
      <ResourceScreen
        title="Resources"
        onBack={() => {}}
        fetchData={async () => []}
        renderItem={() => <Text>Item</Text>}
        getItemKey={(item) => String(item)}
        emptyMessage="No items found"
      />,
    );
    // Wait for state update
    await vi.waitFor(() => {
      expect(lastFrame()).toContain("No items found");
    });
  });

  it("renders items when data is loaded", async () => {
    const items = [{ id: 1, name: "Item 1" }];
    const { lastFrame } = render(
      <ResourceScreen
        title="Resources"
        onBack={() => {}}
        fetchData={async () => items}
        renderItem={(item) => <Text>{item.name}</Text>}
        getItemKey={(item) => String(item.id)}
      />,
    );
    await vi.waitFor(() => {
      expect(lastFrame()).toContain("Item 1");
    });
  });
});
