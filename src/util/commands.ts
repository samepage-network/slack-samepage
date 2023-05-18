import type { SamePageSchema, zWorkflowContext } from "samepage/internal/types";
import { z } from "zod";
import { apiPost } from "samepage/internal/apiClient";

type WorkflowContext = z.infer<typeof zWorkflowContext>;
type CommandHandler = (
  args: Record<string, string>,
  context: WorkflowContext & { accessToken: string }
) => SamePageSchema | Promise<SamePageSchema>;
const commands: Record<string, { handler: CommandHandler; help?: string }> = {
  CHATPOSTMESSAGE: {
    handler: async ({ text, channel }, { accessToken }) => {
      const content = await apiPost({
        domain: "https://slack.com/api",
        path: "chat.postMessage",
        authorization: `Bearer ${accessToken}`,
        data: {
          channel,
          text,
        },
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

export default commands;
