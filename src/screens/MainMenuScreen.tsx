import { Box, Text, useInput } from "ink";
import SelectInput from "ink-select-input";
import { Footer, Header } from "../components/index.js";
import { colors, symbols } from "../ui/index.js";

export type MenuAction =
  | "servers"
  | "volumes"
  | "networks"
  | "firewalls"
  | "floating-ips"
  | "load-balancers"
  | "certificates"
  | "primary-ips"
  | "placement-groups"
  | "ssh-keys"
  | "dns-zones"
  | "dns-records"
  | "settings"
  | "quit";

interface MenuItem {
  label: string;
  value: MenuAction;
}

const menuItems: MenuItem[] = [
  { label: `${symbols.bullet} Servers`, value: "servers" },
  { label: `${symbols.bullet} Volumes`, value: "volumes" },
  { label: `${symbols.bullet} Networks`, value: "networks" },
  { label: `${symbols.bullet} Firewalls`, value: "firewalls" },
  { label: `${symbols.bullet} Floating IPs`, value: "floating-ips" },
  { label: `${symbols.bullet} Load Balancers`, value: "load-balancers" },
  { label: `${symbols.bullet} Certificates`, value: "certificates" },
  { label: `${symbols.bullet} Primary IPs`, value: "primary-ips" },
  { label: `${symbols.bullet} Placement Groups`, value: "placement-groups" },
  { label: `${symbols.bullet} SSH Keys`, value: "ssh-keys" },
  { label: `${symbols.bullet} DNS Zones`, value: "dns-zones" },
  { label: `${symbols.bullet} DNS Records`, value: "dns-records" },
  { label: `${symbols.info} Settings`, value: "settings" },
  { label: `${symbols.error} Quit`, value: "quit" },
];

interface MainMenuScreenProps {
  onSelect: (action: MenuAction) => void;
  onQuit: () => void;
}

export default function MainMenuScreen({
  onSelect,
  onQuit,
}: MainMenuScreenProps) {
  useInput((input) => {
    if (input === "q") {
      onQuit();
    }
  });

  const handleSelect = (item: MenuItem) => {
    if (item.value === "quit") {
      onQuit();
    } else {
      onSelect(item.value);
    }
  };

  const footerBindings = [
    { key: "↑↓", label: "Navigate" },
    { key: "Enter", label: "Select" },
    { key: "q", label: "Quit" },
  ];

  return (
    <Box flexDirection="column" padding={1}>
      <Header
        title="Hetzner TUI"
        subtitle="Manage your Hetzner Cloud and DNS resources"
      />

      <Box flexDirection="column" marginY={1}>
        <Text color={colors.muted} dimColor>
          Select a resource type:
        </Text>
        <Box marginTop={1}>
          <SelectInput
            items={menuItems}
            onSelect={handleSelect}
            indicatorComponent={({ isSelected }) => (
              <Text color={isSelected ? colors.primary : colors.muted}>
                {isSelected ? symbols.arrow : " "}{" "}
              </Text>
            )}
            itemComponent={({ isSelected, label }) => (
              <Text color={isSelected ? colors.text : colors.muted}>
                {label}
              </Text>
            )}
          />
        </Box>
      </Box>

      <Footer bindings={footerBindings} />
    </Box>
  );
}
