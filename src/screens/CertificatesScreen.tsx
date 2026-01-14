import { type Certificate, Hetzner } from "@tomkp/hetzner";
import { Box, Text } from "ink";
import { useCallback } from "react";
import { CardBox, ResourceScreen } from "../components/index.js";
import { getToken } from "../config/index.js";
import { colors, formatDate, formatStatus } from "../ui/index.js";

interface CertificatesScreenProps {
  onBack: () => void;
}

export default function CertificatesScreen({
  onBack,
}: CertificatesScreenProps) {
  const fetchCertificates = useCallback(async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No API token configured. Please run setup first.");
    }
    const client = new Hetzner(token);
    const response = await client.certificates.list();
    return response.certificates;
  }, []);

  const renderCertificate = (cert: Certificate) => {
    const status = formatStatus(cert.status?.issuance ?? "pending");
    return (
      <CardBox>
        <Box justifyContent="space-between">
          <Box gap={1}>
            <Text color={status.color}>{status.symbol}</Text>
            <Text bold>{cert.name}</Text>
          </Box>
          <Text color={colors.muted}>{cert.type}</Text>
        </Box>
        <Box gap={2}>
          <Text color={colors.muted}>
            Domains: {cert.domain_names?.join(", ") ?? "None"}
          </Text>
          {cert.not_valid_after && (
            <Text color={colors.muted}>
              Expires: {formatDate(cert.not_valid_after)}
            </Text>
          )}
        </Box>
      </CardBox>
    );
  };

  return (
    <ResourceScreen
      title="Certificates"
      subtitle="Manage your Hetzner Cloud SSL/TLS certificates"
      onBack={onBack}
      fetchData={fetchCertificates}
      renderItem={renderCertificate}
      getItemKey={(c) => String(c.id)}
      emptyMessage="No certificates found."
      loadingMessage="Fetching certificates..."
    />
  );
}
