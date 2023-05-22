import type { CommandLibrary } from "samepage/internal/types";
import { WebClient } from "@slack/web-api";

const commands = ({ accessToken }: { accessToken: string }): CommandLibrary => {
  const client = new WebClient(accessToken);
  return {
    CHATPOSTMESSAGE: {
      handler: async ({ text, channel }) => {
        const content = await client.chat
          .postMessage({
            channel,
            text,
          })
          .then((r) => {
            if (r.ok) return `Successfully posted to Slack!`;
            else return `Failed to post to Slack: ${r.error}`;
          })
          .catch((e) => `Failed to call post channel API: ${e.message}`);
        return {
          content,
          annotations: [],
        };
      },
    },
  };
};

export default commands;
