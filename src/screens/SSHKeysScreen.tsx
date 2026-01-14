import { Hetzner, type SshKey } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, formatDate } from "../ui/index.js";

interface SSHKeysScreenProps {
  onBack: () => void;
}

export default function SSHKeysScreen({ onBack }: SSHKeysScreenProps) {
  const fetchSSHKeys = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.sshKeys.list();
    return response.ssh_keys;
  }, []);

  const renderSSHKey = (key: SshKey) => {
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Text bold>{key.name}</Text>
          {key.created && (
            <Text color={colors.muted}>Created: {formatDate(key.created)}</Text>
          )}
        </Box>
        <Text color={colors.muted}>Fingerprint: {key.fingerprint}</Text>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="SSH Keys"
      subtitle="Manage your Hetzner Cloud SSH keys"
      onBack={onBack}
      fetchData={fetchSSHKeys}
      renderItem={renderSSHKey}
      getItemKey={(k) => String(k.id)}
      emptyMessage="No SSH keys found."
      loadingMessage="Fetching SSH keys..."
    />
  );
}
