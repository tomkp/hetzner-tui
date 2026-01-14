import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import { colors } from "../ui/index.js";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Gradient name="rainbow">
        <Text bold>{title}</Text>
      </Gradient>
      {subtitle && <Text color={colors.muted}>{subtitle}</Text>}
    </Box>
  );
}
