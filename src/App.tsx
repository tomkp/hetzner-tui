import { Box, Text } from "ink";

export default function App() {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        Hetzner TUI
      </Text>
      <Text dimColor>Interactive terminal UI for Hetzner Cloud</Text>
    </Box>
  );
}
