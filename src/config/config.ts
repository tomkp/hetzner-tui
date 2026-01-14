import { homedir } from "node:os";
import { join } from "node:path";
import Conf from "conf";

export interface Config {
  token?: string;
  dnsToken?: string;
  defaultLocation?: string;
  defaultServerType?: string;
  defaultImage?: string;
}

const schema = {
  token: { type: "string" as const },
  dnsToken: { type: "string" as const },
  defaultLocation: { type: "string" as const },
  defaultServerType: { type: "string" as const },
  defaultImage: { type: "string" as const },
};

let store: Conf<Config> | null = null;

function getStore(): Conf<Config> {
  if (!store) {
    store = new Conf<Config>({
      projectName: "hetzner",
      cwd: join(homedir(), ".config", "hetzner"),
      schema,
    });
  }
  return store;
}

export function getConfig(): Config {
  return getStore().store;
}

export function setConfig(config: Partial<Config>): void {
  const currentConfig = getConfig();
  const newConfig = { ...currentConfig, ...config };
  for (const [key, value] of Object.entries(newConfig)) {
    if (value !== undefined) {
      getStore().set(key, value);
    }
  }
}

export function clearConfig(): void {
  getStore().clear();
}

export function getToken(cliToken?: string): string | undefined {
  if (cliToken) {
    return cliToken;
  }
  const envToken = process.env.HETZNER_TOKEN;
  if (envToken) {
    return envToken;
  }
  return getConfig().token;
}

export function getDnsToken(cliToken?: string): string | undefined {
  if (cliToken) {
    return cliToken;
  }
  const envToken = process.env.HETZNER_DNS_TOKEN;
  if (envToken) {
    return envToken;
  }
  return getConfig().dnsToken;
}

export function requireToken(cliToken?: string): string {
  const token = getToken(cliToken);
  if (!token) {
    throw new Error(
      "No Hetzner API token found. Set HETZNER_TOKEN environment variable or configure token in the TUI.",
    );
  }
  return token;
}

export function requireDnsToken(cliToken?: string): string {
  const token = getDnsToken(cliToken);
  if (!token) {
    throw new Error(
      "No Hetzner DNS token found. Set HETZNER_DNS_TOKEN environment variable or configure token in the TUI.",
    );
  }
  return token;
}
