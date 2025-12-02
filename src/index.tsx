import { Detail, ActionPanel, Action } from "@raycast/api";
import os from "os";
import React, { useState, useEffect } from "react";

function formatUptime(uptime: number) {
  const days = Math.floor(uptime / (3600 * 24));
  const hours = Math.floor((uptime % (3600 * 24)) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return parts.join(" ");
}

export default function Command(): JSX.Element {
  const [uptime, setUptime] = useState<number>(os.uptime());

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(os.uptime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const markdown = `
  # System Uptime
  
  **${formatUptime(uptime)}**
  `;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard
            content={formatUptime(uptime)}
            title="Copy Uptime"
          />
        </ActionPanel>
      }
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="OS Type" text={os.type()} />
          <Detail.Metadata.Label title="OS Platform" text={os.platform()} />
          <Detail.Metadata.Label title="OS Release" text={os.release()} />
        </Detail.Metadata>
      }
    />
  );
}
