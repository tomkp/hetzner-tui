import { Hetzner, type LoadBalancer } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, symbols } from "../ui/index.js";

interface LoadBalancersScreenProps {
  onBack: () => void;
}

export default function LoadBalancersScreen({
  onBack,
}: LoadBalancersScreenProps) {
  const fetchLoadBalancers = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.loadBalancers.list();
    return response.load_balancers;
  }, []);

  const renderLoadBalancer = (lb: LoadBalancer) => {
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Box gap={1}>
            <Text color={colors.success}>{symbols.running}</Text>
            <Text bold>{lb.name}</Text>
          </Box>
          <Text color={colors.muted}>
            {lb.load_balancer_type?.name ?? "Unknown"}
          </Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>
            IP: {lb.public_net?.ipv4?.ip ?? "No IP"}
          </Text>
          <Text color={colors.muted}>Targets: {lb.targets?.length ?? 0}</Text>
          <Text color={colors.muted}>
            Location: {lb.location?.name ?? "Unknown"}
          </Text>
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="Load Balancers"
      subtitle="Manage your Hetzner Cloud load balancers"
      onBack={onBack}
      fetchData={fetchLoadBalancers}
      renderItem={renderLoadBalancer}
      getItemKey={(lb) => String(lb.id)}
      emptyMessage="No load balancers found."
      loadingMessage="Fetching load balancers..."
    />
  );
}
