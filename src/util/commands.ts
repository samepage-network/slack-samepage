import type {
  JSONData,
  SamePageState,
  SamePageSchema,
} from "samepage/internal/types";

type WorkflowContext = {
  variables: JSONData;
  target: string;
  exitWorkflow?: true;
};

type CommandHandler = (
  args: Record<string, string>,
  context: WorkflowContext
) => SamePageSchema | Promise<SamePageSchema>;
const commands: Record<string, { handler: CommandHandler; help?: string }> = {
  CHATPOSTMESSAGE: {
    handler: async ({ text, channel }) => {
      return {
        content: `Posted ${text} to ${channel}`,
        annotations: [],
      };
    },
  },
};

export default commands;
