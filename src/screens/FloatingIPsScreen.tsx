import { type FloatingIP, Hetzner } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, symbols } from "../ui/index.js";

interface FloatingIPsScreenProps {
  onBack: () => void;
}

export default function FloatingIPsScreen({ onBack }: FloatingIPsScreenProps) {
  const fetchFloatingIPs = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.floatingIPs.list();
    return response.floating_ips;
  }, []);

  const renderFloatingIP = (floatingIP: FloatingIP) => {
    const isAssigned = floatingIP.server !== null;
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Box gap={1}>
            <Text color={isAssigned ? colors.success : colors.muted}>
              {isAssigned ? symbols.running : symbols.stopped}
            </Text>
            <Text bold>{floatingIP.ip}</Text>
          </Box>
          <Text color={colors.muted}>{floatingIP.type}</Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>
            Server: {floatingIP.server ? `#${floatingIP.server}` : "Unassigned"}
          </Text>
          <Text color={colors.muted}>
            Location: {floatingIP.home_location?.name ?? "Unknown"}
          </Text>
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="Floating IPs"
      subtitle="Manage your Hetzner Cloud floating IPs"
      onBack={onBack}
      fetchData={fetchFloatingIPs}
      renderItem={renderFloatingIP}
      getItemKey={(f) => String(f.id)}
      emptyMessage="No floating IPs found."
      loadingMessage="Fetching floating IPs..."
    />
  );
}
