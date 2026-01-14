import { Box, Text, useInput } from "ink";
import Gradient from "ink-gradient";
import { colors } from "../ui/index.js";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  useInput((input, key) => {
    if (key.return || input === " ") {
      onContinue();
    }
  });

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
    >
      <Box marginBottom={1}>
        <Gradient name="rainbow">
          <Text bold>
            {`
  _   _      _                        _____ _   _ ___
 | | | | ___| |_ _____ __   ___ _ _  |_   _| | | |_ _|
 | |_| |/ _ \\ __|_  / '_ \\ / _ \\ '_|   | | | | | || |
 |  _  |  __/ |_ / /| | | |  __/ |     | | | |_| || |
 |_| |_|\\___|\\__/___|_| |_|\\___|_|     |_|  \\___/|___|
            `}
          </Text>
        </Gradient>
      </Box>

      <Text color={colors.muted}>
        Interactive terminal UI for Hetzner Cloud and DNS
      </Text>

      <Box marginTop={2}>
        <Text dimColor>Press </Text>
        <Text color={colors.accent} bold>
          Enter
        </Text>
        <Text dimColor> to continue</Text>
      </Box>
    </Box>
  );
}
