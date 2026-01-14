import { TextInput } from "@inkjs/ui";
import { Box, Text, useInput } from "ink";
import { useState } from "react";
import { Header } from "../components/index.js";
import { setConfig } from "../config/index.js";
import { colors, symbols } from "../ui/index.js";

type Step = "cloud" | "dns" | "complete";

interface SetupWizardProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export default function SetupWizard({ onComplete, onSkip }: SetupWizardProps) {
  const [step, setStep] = useState<Step>("cloud");
  const [cloudToken, setCloudToken] = useState("");

  useInput((_input, key) => {
    if (key.escape && onSkip) {
      onSkip();
    }
  });

  const handleCloudTokenSubmit = (value: string) => {
    if (value.trim()) {
      setCloudToken(value.trim());
      setConfig({ token: value.trim() });
    }
    setStep("dns");
  };

  const handleDnsTokenSubmit = (value: string) => {
    if (value.trim()) {
      setConfig({ dnsToken: value.trim() });
    }
    setStep("complete");
    onComplete();
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Header title="Setup Wizard" subtitle="Configure your Hetzner tokens" />

      <Box flexDirection="column" marginTop={1}>
        {step === "cloud" && (
          <Box flexDirection="column">
            <Text>
              <Text color={colors.primary} bold>
                Step 1:
              </Text>{" "}
              Hetzner Cloud API Token
            </Text>
            <Text color={colors.muted}>
              Get your token from: https://console.hetzner.cloud/projects
            </Text>
            <Text color={colors.muted}>
              {symbols.arrow} Select a project {symbols.arrow} Security{" "}
              {symbols.arrow} API Tokens
            </Text>
            <Box marginTop={1}>
              <Text>Token: </Text>
              <TextInput
                placeholder="Enter token (or press Enter to skip)"
                onSubmit={handleCloudTokenSubmit}
              />
            </Box>
          </Box>
        )}

        {step === "dns" && (
          <Box flexDirection="column">
            <Text color={colors.success}>
              {symbols.success} Cloud token {cloudToken ? "saved" : "skipped"}
            </Text>
            <Box marginTop={1} flexDirection="column">
              <Text>
                <Text color={colors.primary} bold>
                  Step 2:
                </Text>{" "}
                Hetzner DNS API Token (optional)
              </Text>
              <Text color={colors.muted}>
                Get your token from: https://dns.hetzner.com/settings/api-token
              </Text>
              <Box marginTop={1}>
                <Text>Token: </Text>
                <TextInput
                  placeholder="Enter token (or press Enter to skip)"
                  onSubmit={handleDnsTokenSubmit}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box marginTop={2}>
        <Text dimColor>
          Press <Text color={colors.muted}>Escape</Text> to skip setup
        </Text>
      </Box>
    </Box>
  );
}
