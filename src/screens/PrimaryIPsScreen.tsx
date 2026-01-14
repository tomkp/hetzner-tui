import { Hetzner, type PrimaryIP } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, symbols } from "../ui/index.js";

interface PrimaryIPsScreenProps {
  onBack: () => void;
}

export default function PrimaryIPsScreen({ onBack }: PrimaryIPsScreenProps) {
  const fetchPrimaryIPs = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.primaryIPs.list();
    return response.primary_ips;
  }, []);

  const renderPrimaryIP = (ip: PrimaryIP) => {
    const isAssigned = ip.assignee_id !== null;
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Box gap={1}>
            <Text color={isAssigned ? colors.success : colors.muted}>
              {isAssigned ? symbols.running : symbols.stopped}
            </Text>
            <Text bold>{ip.ip}</Text>
          </Box>
          <Text color={colors.muted}>{ip.type}</Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>
            Assigned: {isAssigned ? `Server #${ip.assignee_id}` : "No"}
          </Text>
          <Text color={colors.muted}>
            Datacenter: {ip.datacenter?.name ?? "Unknown"}
          </Text>
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="Primary IPs"
      subtitle="Manage your Hetzner Cloud primary IPs"
      onBack={onBack}
      fetchData={fetchPrimaryIPs}
      renderItem={renderPrimaryIP}
      getItemKey={(ip) => String(ip.id)}
      emptyMessage="No primary IPs found."
      loadingMessage="Fetching primary IPs..."
    />
  );
}
