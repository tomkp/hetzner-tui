# hetzner-tui

[![npm](https://img.shields.io/npm/v/@tomkp/hetzner-tui)](https://www.npmjs.com/package/@tomkp/hetzner-tui)

An interactive terminal UI for managing Hetzner Cloud and DNS resources. Built with React and Ink for a modern terminal experience.

<img width="2002" height="734" alt="CleanShot 2026-01-15 at 09 55 03@2x" src="https://github.com/user-attachments/assets/19b73514-53e9-45c4-91b4-0c6797409ada" />

> **Looking for a CLI instead?** Check out [@tomkp/hetzner-cli](https://github.com/tomkp/hetzner-cli)

## Installation

```bash
npm install -g @tomkp/hetzner-tui
```

This will make the `hetzner` command available globally.

### From source

```bash
git clone https://github.com/tomkp/hetzner-tui.git
cd hetzner-tui
npm install
npm run build
npm link
```

## Quick Start

```bash
hetzner
```

On first run, you'll be guided through a setup wizard to configure your API tokens.

## Features

### Resource Management

Browse and manage all your Hetzner Cloud resources:

- **Servers** - View server status, power on/off, reboot
- **Volumes** - View attached/detached volumes
- **Networks** - View private networks and IP ranges
- **Firewalls** - View firewall rules and applied resources
- **Floating IPs** - View floating IP assignments
- **Load Balancers** - View load balancer configuration
- **Certificates** - View SSL/TLS certificates and status
- **Primary IPs** - View primary IP assignments
- **Placement Groups** - View server placement groups
- **SSH Keys** - View registered SSH keys

### DNS Management

Manage your Hetzner DNS zones and records:

- **DNS Zones** - View all DNS zones and record counts
- **DNS Records** - View all DNS records across zones

### Settings

- View and manage API token configuration
- Clear settings and reconfigure

## Configuration

### API Tokens

The TUI requires API tokens to interact with Hetzner services:

- **Cloud API Token** - For managing servers, volumes, networks, etc.
- **DNS API Token** - For managing DNS zones and records (optional)

Get your tokens from:
- Cloud: [Hetzner Cloud Console](https://console.hetzner.cloud/) → Project → Security → API Tokens
- DNS: [Hetzner DNS Console](https://dns.hetzner.com/settings/api-token)

### Token Configuration

Tokens can be provided via:

1. **Environment variables**:
   ```bash
   export HETZNER_TOKEN=<your-cloud-token>
   export HETZNER_DNS_TOKEN=<your-dns-token>
   ```

2. **Configuration file** (via setup wizard or settings):
   - Stored in `~/.config/hetzner/config.json`
   - Run the setup wizard: launch `hetzner` and select "Run Setup Wizard" from Settings

## Navigation

| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate menu items |
| `Enter` | Select item |
| `Esc` | Go back / Exit |
| `r` | Refresh current view |
| `q` | Quit application |

## Screenshots

```
┌─────────────────────────────────────┐
│  Hetzner TUI                        │
│  Manage your Hetzner Cloud          │
├─────────────────────────────────────┤
│  → Servers                          │
│    Volumes                          │
│    Networks                         │
│    Firewalls                        │
│    Floating IPs                     │
│    Load Balancers                   │
│    ...                              │
├─────────────────────────────────────┤
│  ↑↓ Navigate  Enter Select  q Quit  │
└─────────────────────────────────────┘
```

## Related

- [@tomkp/hetzner](https://www.npmjs.com/package/@tomkp/hetzner) - TypeScript API client for Hetzner Cloud and DNS
- [@tomkp/hetzner-cli](https://www.npmjs.com/package/@tomkp/hetzner-cli) - Command-line interface for Hetzner (`hz` command)

## License

MIT
