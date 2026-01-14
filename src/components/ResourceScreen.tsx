import { Box, Text, useInput } from "ink";
import { type ReactNode, useEffect, useState } from "react";
import { colors, symbols } from "../ui/index.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import LoadingSpinner from "./LoadingSpinner.js";

interface ResourceScreenProps<T> {
  title: string;
  subtitle?: string;
  onBack: () => void;
  fetchData: () => Promise<T[]>;
  renderItem: (item: T) => ReactNode;
  getItemKey: (item: T) => string;
  emptyMessage?: string;
  loadingMessage?: string;
  footerBindings?: Array<{ key: string; label: string }>;
}

export default function ResourceScreen<T>({
  title,
  subtitle,
  onBack,
  fetchData,
  renderItem,
  getItemKey,
  emptyMessage = "No items found.",
  loadingMessage = "Loading...",
  footerBindings = [],
}: ResourceScreenProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useInput((_input, key) => {
    if (key.escape) {
      onBack();
    }
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchData();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetchData]);

  const defaultBindings = [
    { key: "Esc", label: "Back" },
    { key: "r", label: "Refresh" },
    ...footerBindings,
  ];

  return (
    <Box flexDirection="column" padding={1}>
      <Header title={title} subtitle={subtitle} />

      <Box flexDirection="column" marginY={1}>
        {loading && <LoadingSpinner message={loadingMessage} />}

        {error && (
          <Box>
            <Text color={colors.error}>
              {symbols.error} {error}
            </Text>
          </Box>
        )}

        {!loading && !error && items.length === 0 && (
          <Text color={colors.muted}>{emptyMessage}</Text>
        )}

        {!loading &&
          !error &&
          items.map((item) => (
            <Box key={getItemKey(item)} marginBottom={1}>
              {renderItem(item)}
            </Box>
          ))}
      </Box>

      <Footer bindings={defaultBindings} status={`${items.length} items`} />
    </Box>
  );
}
