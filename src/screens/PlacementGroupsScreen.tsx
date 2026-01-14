import { Hetzner, type PlacementGroup } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, formatDate } from "../ui/index.js";

interface PlacementGroupsScreenProps {
  onBack: () => void;
}

export default function PlacementGroupsScreen({
  onBack,
}: PlacementGroupsScreenProps) {
  const fetchPlacementGroups = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.placementGroups.list();
    return response.placement_groups;
  }, []);

  const renderPlacementGroup = (group: PlacementGroup) => {
    const serverCount = group.servers?.length ?? 0;
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Text bold>{group.name}</Text>
          <Text color={colors.muted}>{group.type}</Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>Servers: {serverCount}</Text>
          {group.created && (
            <Text color={colors.muted}>
              Created: {formatDate(group.created)}
            </Text>
          )}
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="Placement Groups"
      subtitle="Manage your Hetzner Cloud placement groups"
      onBack={onBack}
      fetchData={fetchPlacementGroups}
      renderItem={renderPlacementGroup}
      getItemKey={(g) => String(g.id)}
      emptyMessage="No placement groups found."
      loadingMessage="Fetching placement groups..."
    />
  );
}
