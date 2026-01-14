import { Box, Text } from "ink";
import type { ReactNode } from "react";
import { colors } from "../ui/index.js";

interface CardBoxProps {
  title?: string;
  children: ReactNode;
  borderColor?: string;
}

export default function CardBox({
  title,
  children,
  borderColor = colors.primary,
}: CardBoxProps) {
  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={borderColor}
      paddingX={1}
    >
      {title && (
        <Text bold color={colors.primary}>
          {title}
        </Text>
      )}
      {children}
    </Box>
  );
}
