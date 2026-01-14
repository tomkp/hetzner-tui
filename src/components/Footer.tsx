import { Box, Text } from "ink";
import { colors } from "../ui/index.js";

interface KeyBinding {
  key: string;
  label: string;
}

interface FooterProps {
  bindings?: KeyBinding[];
  status?: string;
}

export default function Footer({ bindings = [], status }: FooterProps) {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      marginTop={1}
      paddingTop={1}
      borderStyle="single"
      borderTop
      borderBottom={false}
      borderLeft={false}
      borderRight={false}
    >
      <Box gap={2}>
        {bindings.map(({ key, label }) => (
          <Box key={key}>
            <Text color={colors.accent} bold>
              {key}
            </Text>
            <Text color={colors.muted}> {label}</Text>
          </Box>
        ))}
      </Box>
      {status && <Text color={colors.muted}>{status}</Text>}
    </Box>
  );
}
