import { HetznerDns, type Zone } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getDnsToken } from "../config/index.js";
import { colors, formatDate } from "../ui/index.js";

interface DNSZonesScreenProps {
  onBack: () => void;
}

export default function DNSZonesScreen({ onBack }: DNSZonesScreenProps) {
  const fetchZones = useCallback(async () => {
    const token = getDnsToken();
    if (!token) {
      throw new Error(
        "No DNS API token configured. Please run setup first or set HETZNER_DNS_TOKEN.",
      );
    }
    const client = new HetznerDns(token);
    const response = await client.zones.list();
    return response.zones;
  }, []);

  const renderZone = (zone: Zone) => {
    const recordCount = zone.records_count ?? 0;
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Text bold>{zone.name}</Text>
          <Text color={colors.muted}>TTL: {zone.ttl ?? "default"}</Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>Records: {recordCount}</Text>
          {zone.created && (
            <Text color={colors.muted}>
              Created: {formatDate(zone.created)}
            </Text>
          )}
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="DNS Zones"
      subtitle="Manage your Hetzner DNS zones"
      onBack={onBack}
      fetchData={fetchZones}
      renderItem={renderZone}
      getItemKey={(z) => z.id}
      emptyMessage="No DNS zones found."
      loadingMessage="Fetching DNS zones..."
    />
  );
}
