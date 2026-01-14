import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import { colors } from "../ui/index.js";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <Box>
      <Text color={colors.primary}>
        <Spinner type="dots" />
      </Text>
      <Text> {message}</Text>
    </Box>
  );
}
