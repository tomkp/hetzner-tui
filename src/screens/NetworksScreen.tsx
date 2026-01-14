import { Hetzner, type Network } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, symbols } from "../ui/index.js";

interface NetworksScreenProps {
  onBack: () => void;
}

export default function NetworksScreen({ onBack }: NetworksScreenProps) {
  const fetchNetworks = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.networks.list();
    return response.networks;
  }, []);

  const renderNetwork = (network: Network) => {
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Box gap={1}>
            <Text color={colors.success}>{symbols.running}</Text>
            <Text bold>{network.name}</Text>
          </Box>
          <Text color={colors.muted}>{network.ip_range}</Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>
            Subnets: {network.subnets?.length ?? 0}
          </Text>
          <Text color={colors.muted}>
            Servers: {network.servers?.length ?? 0}
          </Text>
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="Networks"
      subtitle="Manage your Hetzner Cloud networks"
      onBack={onBack}
      fetchData={fetchNetworks}
      renderItem={renderNetwork}
      getItemKey={(n) => String(n.id)}
      emptyMessage="No networks found."
      loadingMessage="Fetching networks..."
    />
  );
}
