import { Hetzner, type Server as HetznerServer } from "@tomkp/hetzner";
import { Box, Text, useInput } from "ink";
import { useEffect, useState } from "react";
import {
  CardBox,
  Footer,
  Header,
  LoadingSpinner,
} from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, formatStatus, symbols } from "../ui/index.js";

interface Server {
  id: number;
  name: string;
  status: string;
  publicIp: string;
  serverType: string;
  datacenter: string;
}

interface ServersScreenProps {
  onBack: () => void;
}

export default function ServersScreen({ onBack }: ServersScreenProps) {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useInput((_input, key) => {
    if (key.escape) {
      onBack();
    }
  });

  useEffect(() => {
    const fetchServers = async () => {
      const token = getToken();
      if (!token) {
        setError("No API token configured. Please run setup first.");
        setLoading(false);
        return;
      }

      try {
        const client = new Hetzner(token);
        const response = await client.servers.list();
        const serverList = response.servers.map((s: HetznerServer) => ({
          id: s.id,
          name: s.name,
          status: s.status,
          publicIp: s.public_net?.ipv4?.ip ?? "No IP",
          serverType: s.server_type?.name ?? "Unknown",
          datacenter: s.datacenter?.name ?? "Unknown",
        }));
        setServers(serverList);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch servers",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const footerBindings = [
    { key: "Esc", label: "Back" },
    { key: "r", label: "Refresh" },
  ];

  return (
    <Box flexDirection="column" padding={1}>
      <Header title="Servers" subtitle="Manage your Hetzner Cloud servers" />

      <Box flexDirection="column" marginY={1}>
        {loading && <LoadingSpinner message="Fetching servers..." />}

        {error && (
          <Box>
            <Text color={colors.error}>
              {symbols.error} {error}
            </Text>
          </Box>
        )}

        {!loading && !error && servers.length === 0 && (
          <Text color={colors.muted}>No servers found.</Text>
        )}

        {!loading &&
          !error &&
          servers.map((server) => {
            const status = formatStatus(server.status);
            return (
              <CardBox key={server.id}>
                <Box justifyContent="space-between">
                  <Box gap={1}>
                    <Text color={status.color}>{status.symbol}</Text>
                    <Text bold>{server.name}</Text>
                  </Box>
                  <Text color={colors.muted}>{server.serverType}</Text>
                </Box>
                <Box gap={2}>
                  <Text color={colors.muted}>IP: {server.publicIp}</Text>
                  <Text color={colors.muted}>DC: {server.datacenter}</Text>
                </Box>
              </CardBox>
            );
          })}
      </Box>

      <Footer bindings={footerBindings} status={`${servers.length} servers`} />
    </Box>
  );
}
