import { useApp } from "ink";
import { useState } from "react";
import {
  CertificatesScreen,
  DNSRecordsScreen,
  DNSZonesScreen,
  FirewallsScreen,
  FloatingIPsScreen,
  LoadBalancersScreen,
  MainMenuScreen,
  type MenuAction,
  NetworksScreen,
  PlacementGroupsScreen,
  PrimaryIPsScreen,
  SSHKeysScreen,
  ServersScreen,
  SettingsScreen,
  SetupWizard,
  VolumesScreen,
  WelcomeScreen,
} from "./screens/index.js";

type Screen = "welcome" | "menu" | "setup" | MenuAction;

export default function App() {
  const { exit } = useApp();
  const [screen, setScreen] = useState<Screen>("welcome");

  const handleQuit = () => {
    exit();
  };

  const handleBack = () => {
    setScreen("menu");
  };

  const handleMenuSelect = (action: MenuAction) => {
    setScreen(action);
  };

  switch (screen) {
    case "welcome":
      return <WelcomeScreen onContinue={() => setScreen("menu")} />;
    case "menu":
      return <MainMenuScreen onSelect={handleMenuSelect} onQuit={handleQuit} />;
    case "setup":
      return (
        <SetupWizard
          onComplete={() => setScreen("settings")}
          onSkip={() => setScreen("settings")}
        />
      );
    case "servers":
      return <ServersScreen onBack={handleBack} />;
    case "volumes":
      return <VolumesScreen onBack={handleBack} />;
    case "networks":
      return <NetworksScreen onBack={handleBack} />;
    case "firewalls":
      return <FirewallsScreen onBack={handleBack} />;
    case "floating-ips":
      return <FloatingIPsScreen onBack={handleBack} />;
    case "load-balancers":
      return <LoadBalancersScreen onBack={handleBack} />;
    case "certificates":
      return <CertificatesScreen onBack={handleBack} />;
    case "primary-ips":
      return <PrimaryIPsScreen onBack={handleBack} />;
    case "placement-groups":
      return <PlacementGroupsScreen onBack={handleBack} />;
    case "ssh-keys":
      return <SSHKeysScreen onBack={handleBack} />;
    case "dns-zones":
      return <DNSZonesScreen onBack={handleBack} />;
    case "dns-records":
      return <DNSRecordsScreen onBack={handleBack} />;
    case "settings":
      return (
        <SettingsScreen
          onBack={handleBack}
          onRunSetup={() => setScreen("setup")}
        />
      );
    default:
      return <MainMenuScreen onSelect={handleMenuSelect} onQuit={handleQuit} />;
  }
}
