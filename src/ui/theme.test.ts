import { describe, expect, it } from "vitest";
import { colors, formatStatus, symbols } from "./theme.js";

describe("theme", () => {
  describe("symbols", () => {
    it("exports status symbols", () => {
      expect(symbols.success).toBeDefined();
      expect(symbols.error).toBeDefined();
      expect(symbols.warning).toBeDefined();
      expect(symbols.info).toBeDefined();
    });

    it("exports state symbols", () => {
      expect(symbols.running).toBeDefined();
      expect(symbols.stopped).toBeDefined();
      expect(symbols.pending).toBeDefined();
    });
  });

  describe("colors", () => {
    it("exports primary colors", () => {
      expect(colors.primary).toBeDefined();
      expect(colors.secondary).toBeDefined();
      expect(colors.accent).toBeDefined();
    });

    it("exports status colors", () => {
      expect(colors.success).toBeDefined();
      expect(colors.error).toBeDefined();
      expect(colors.warning).toBeDefined();
    });
  });

  describe("formatStatus", () => {
    it("returns running format for running status", () => {
      const result = formatStatus("running");
      expect(result.symbol).toBe(symbols.running);
      expect(result.color).toBe(colors.success);
    });

    it("returns stopped format for off status", () => {
      const result = formatStatus("off");
      expect(result.symbol).toBe(symbols.stopped);
      expect(result.color).toBe(colors.muted);
    });

    it("returns pending format for unknown status", () => {
      const result = formatStatus("starting");
      expect(result.symbol).toBe(symbols.pending);
      expect(result.color).toBe(colors.warning);
    });
  });
});
