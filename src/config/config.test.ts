import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearConfig,
  getDnsToken,
  getToken,
  requireDnsToken,
  requireToken,
  setConfig,
} from "./config.js";

describe("config", () => {
  beforeEach(() => {
    vi.stubEnv("HETZNER_TOKEN", "");
    vi.stubEnv("HETZNER_DNS_TOKEN", "");
    clearConfig();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    clearConfig();
  });

  describe("getToken", () => {
    it("returns CLI token when provided", () => {
      expect(getToken("cli-token")).toBe("cli-token");
    });

    it("returns env token when no CLI token", () => {
      vi.stubEnv("HETZNER_TOKEN", "env-token");
      expect(getToken()).toBe("env-token");
    });

    it("returns config token when no CLI or env token", () => {
      setConfig({ token: "config-token" });
      expect(getToken()).toBe("config-token");
    });

    it("returns undefined when no token available", () => {
      expect(getToken()).toBeUndefined();
    });
  });

  describe("getDnsToken", () => {
    it("returns CLI token when provided", () => {
      expect(getDnsToken("cli-dns-token")).toBe("cli-dns-token");
    });

    it("returns env token when no CLI token", () => {
      vi.stubEnv("HETZNER_DNS_TOKEN", "env-dns-token");
      expect(getDnsToken()).toBe("env-dns-token");
    });

    it("returns config token when no CLI or env token", () => {
      setConfig({ dnsToken: "config-dns-token" });
      expect(getDnsToken()).toBe("config-dns-token");
    });
  });

  describe("requireToken", () => {
    it("returns token when available", () => {
      setConfig({ token: "my-token" });
      expect(requireToken()).toBe("my-token");
    });

    it("throws when no token available", () => {
      expect(() => requireToken()).toThrow("No Hetzner API token found");
    });
  });

  describe("requireDnsToken", () => {
    it("returns token when available", () => {
      setConfig({ dnsToken: "my-dns-token" });
      expect(requireDnsToken()).toBe("my-dns-token");
    });

    it("throws when no token available", () => {
      expect(() => requireDnsToken()).toThrow("No Hetzner DNS token found");
    });
  });

  describe("setConfig", () => {
    it("sets multiple config values", () => {
      setConfig({ token: "test-token", defaultLocation: "fsn1" });
      expect(getToken()).toBe("test-token");
    });
  });
});
