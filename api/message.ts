import createBackendClientHandler from "samepage/backend/createBackendClientHandler";
import decodeState from "src/util/decodeState";
import encodeState from "src/util/encodeState";
import { notebookRequestNodeQuerySchema } from "samepage/internal/types";
import { z } from "zod";

const fireNodeQuery = async (
  args: z.infer<typeof notebookRequestNodeQuerySchema>,
  token: string
) => {
  // TODO
  return [];
};

const message = (args: Record<string, unknown>) => {
  return createBackendClientHandler({
    getDecodeState: (token) => (id, state) => {
      return decodeState(id, state, token);
    },
    getNotebookRequestHandler:
      (token) =>
      async ({ request }) => {
        // TODO
        if (request.schema === "node-query") {
          const result = notebookRequestNodeQuerySchema.safeParse(request);
          if (!result.success) return {};
          const results = await fireNodeQuery(result.data, token);
          return {
            results,
          };
        } else if (typeof request.notebookPageId === "string") {
          const pageData = await encodeState({
            notebookPageId: request.notebookPageId,
            token,
          });
          return pageData;
        }
        return {};
      },
    getNotebookResponseHandler: (token) => async (response) => {
      // TODO
    },
  })(args);
};

export default message;
