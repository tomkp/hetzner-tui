import { Hetzner, type Volume } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, formatBytes, formatStatus } from "../ui/index.js";

interface VolumesScreenProps {
  onBack: () => void;
}

export default function VolumesScreen({ onBack }: VolumesScreenProps) {
  const fetchVolumes = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.volumes.list();
    return response.volumes;
  }, []);

  const renderVolume = (volume: Volume) => {
    const status = formatStatus(volume.status);
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Box gap={1}>
            <Text color={status.color}>{status.symbol}</Text>
            <Text bold>{volume.name}</Text>
          </Box>
          <Text color={colors.muted}>
            {formatBytes(volume.size * 1024 * 1024 * 1024)}
          </Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>
            Server: {volume.server ? `#${volume.server}` : "Not attached"}
          </Text>
          <Text color={colors.muted}>
            Location: {volume.location?.name ?? "Unknown"}
          </Text>
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="Volumes"
      subtitle="Manage your Hetzner Cloud volumes"
      onBack={onBack}
      fetchData={fetchVolumes}
      renderItem={renderVolume}
      getItemKey={(v) => String(v.id)}
      emptyMessage="No volumes found."
      loadingMessage="Fetching volumes..."
    />
  );
}
