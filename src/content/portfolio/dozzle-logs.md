---
title: "Dozzle Docker Log Viewer"
description: "Real-time Docker container log monitoring and analysis tool"
category: "Hosted Applications"
technologies: ["Docker", "Go", "WebSockets"]
externalUrl: "https://dozzle-k8gs4oks8sccos0c0og4g848.omega-spiral.com/"
highlight: false
tags: ["DevOps", "Monitoring", "Self-Hosted"]
---

# Dozzle - Docker Log Viewer

A self-hosted, lightweight application that provides real-time log viewing for Docker containers. This deployment enables easy monitoring and troubleshooting of containerized applications without complex log aggregation setups.

## Features

- **Real-time Log Streaming**: View container logs as they happen with WebSocket connections
- **Container Management**: List and filter all running containers
- **Search Functionality**: Powerful search capabilities across log entries
- **No Database Required**: Zero configuration, stateless application
- **Responsive Interface**: Works on desktop and mobile devices

## Technical Implementation

This Dozzle instance is deployed as a Docker container with access to the Docker socket for monitoring all containers on the host. The implementation includes:

- Secure access controls with authentication
- SSL encryption for all connections
- Docker socket security hardening
- Integration with existing monitoring systems
