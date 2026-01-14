import { type Firewall, Hetzner } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, symbols } from "../ui/index.js";

interface FirewallsScreenProps {
  onBack: () => void;
}

export default function FirewallsScreen({ onBack }: FirewallsScreenProps) {
  const fetchFirewalls = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.firewalls.list();
    return response.firewalls;
  }, []);

  const renderFirewall = (firewall: Firewall) => {
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Box gap={1}>
            <Text color={colors.primary}>{symbols.bullet}</Text>
            <Text bold>{firewall.name}</Text>
          </Box>
          <Text color={colors.muted}>{firewall.rules?.length ?? 0} rules</Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>
            Applied to: {firewall.applied_to?.length ?? 0} resources
          </Text>
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="Firewalls"
      subtitle="Manage your Hetzner Cloud firewalls"
      onBack={onBack}
      fetchData={fetchFirewalls}
      renderItem={renderFirewall}
      getItemKey={(f) => String(f.id)}
      emptyMessage="No firewalls found."
      loadingMessage="Fetching firewalls..."
    />
  );
}
