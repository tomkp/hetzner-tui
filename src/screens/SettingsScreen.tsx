import { Box, Text, useInput } from "ink";
import { useCallback, useState } from "react";
import { CardBox, Footer, Header } from "../components/index.js";
import { type Config, clearConfig, getConfig } from "../config/index.js";
import { colors, symbols } from "../ui/index.js";

interface SettingsScreenProps {
  onBack: () => void;
  onRunSetup: () => void;
}

function maskToken(token: string | undefined): string {
  if (!token) return "Not configured";
  if (token.length <= 8) return "****";
  return `${token.slice(0, 4)}...${token.slice(-4)}`;
}

export default function SettingsScreen({
  onBack,
  onRunSetup,
}: SettingsScreenProps) {
  const [config, setConfigState] = useState<Config>(getConfig);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const menuItems = [
    { label: "Run Setup Wizard", action: "setup" },
    { label: "Clear All Settings", action: "clear" },
  ];

  const handleClear = useCallback(() => {
    clearConfig();
    setConfigState({});
    setMessage("Settings cleared successfully");
    setTimeout(() => setMessage(null), 2000);
  }, []);

  useInput((_input, key) => {
    if (key.escape) {
      onBack();
      return;
    }

    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(menuItems.length - 1, prev + 1));
    } else if (key.return) {
      const item = menuItems[selectedIndex];
      if (item.action === "setup") {
        onRunSetup();
      } else if (item.action === "clear") {
        handleClear();
      }
    }
  });

  const hasCloudToken = Boolean(config.token);
  const hasDnsToken = Boolean(config.dnsToken);

  return (
    <Box flexDirection="column" padding={1}>
      <Header title="Settings" subtitle="View and manage your configuration" />

      <Box flexDirection="column" marginTop={1} gap={1}>
        <CardBox>
          <Text bold>API Tokens</Text>
          <Box gap={2}>
            <Text color={hasCloudToken ? colors.success : colors.muted}>
              {hasCloudToken ? symbols.success : symbols.stopped} Cloud:{" "}
              {maskToken(config.token)}
            </Text>
          </Box>
          <Box gap={2}>
            <Text color={hasDnsToken ? colors.success : colors.muted}>
              {hasDnsToken ? symbols.success : symbols.stopped} DNS:{" "}
              {maskToken(config.dnsToken)}
            </Text>
          </Box>
        </CardBox>

        <CardBox>
          <Text bold>Default Settings</Text>
          <Text color={colors.muted}>
            Location: {config.defaultLocation ?? "Not set"}
          </Text>
          <Text color={colors.muted}>
            Server Type: {config.defaultServerType ?? "Not set"}
          </Text>
          <Text color={colors.muted}>
            Image: {config.defaultImage ?? "Not set"}
          </Text>
        </CardBox>

        <Box flexDirection="column" marginTop={1}>
          <Text bold>Actions</Text>
          {menuItems.map((item, index) => (
            <Text key={item.action}>
              {selectedIndex === index ? (
                <Text color={colors.primary}>{symbols.arrow} </Text>
              ) : (
                "  "
              )}
              <Text
                color={selectedIndex === index ? colors.primary : undefined}
              >
                {item.label}
              </Text>
            </Text>
          ))}
        </Box>

        {message && (
          <Box marginTop={1}>
            <Text color={colors.success}>
              {symbols.success} {message}
            </Text>
          </Box>
        )}
      </Box>

      <Footer bindings={[{ key: "Esc", label: "Back" }]} />
    </Box>
  );
}
