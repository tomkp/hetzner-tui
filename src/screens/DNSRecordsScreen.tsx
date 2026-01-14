import { type Record as DnsRecord, HetznerDns } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getDnsToken } from "../config/index.js";
import { colors } from "../ui/index.js";

interface DNSRecordsScreenProps {
  onBack: () => void;
}

interface RecordWithZone extends DnsRecord {
  zoneName?: string;
}

export default function DNSRecordsScreen({ onBack }: DNSRecordsScreenProps) {
  const fetchRecords = useCallback(async () => {
    const token = getDnsToken();
    if (!token) {
      throw new Error(
        "No DNS API token configured. Please run setup first or set HETZNER_DNS_TOKEN.",
      );
    }
    const client = new HetznerDns(token);

    // Fetch all zones first
    const { zones } = await client.zones.list();

    // Then fetch records for each zone
    const allRecords: RecordWithZone[] = [];
    for (const zone of zones) {
      const { records } = await client.records.list({ zone_id: zone.id });
      for (const record of records) {
        allRecords.push({ ...record, zoneName: zone.name });
      }
    }

    return allRecords;
  }, []);

  const renderRecord = (record: RecordWithZone) => {
    const typeColor =
      record.type === "A" || record.type === "AAAA"
        ? colors.success
        : record.type === "MX"
          ? colors.warning
          : colors.muted;

    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Box gap={1}>
            <Text color={typeColor} bold>
              {record.type}
            </Text>
            <Text bold>{record.name || "@"}</Text>
          </Box>
          <Text color={colors.muted}>{record.zoneName}</Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>
            Value:{" "}
            {record.value.length > 40
              ? `${record.value.slice(0, 40)}...`
              : record.value}
          </Text>
          {record.ttl && <Text color={colors.muted}>TTL: {record.ttl}</Text>}
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="DNS Records"
      subtitle="Manage your Hetzner DNS records"
      onBack={onBack}
      fetchData={fetchRecords}
      renderItem={renderRecord}
      getItemKey={(r) => r.id}
      emptyMessage="No DNS records found."
      loadingMessage="Fetching DNS records..."
    />
  );
}
