import createApiMessageHandler from "samepage/backend/createApiMessageHandler";
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

const message = createApiMessageHandler({
  getDecodeState:
    ({ accessToken }) =>
    (id, state) => {
      return decodeState(id, state, accessToken);
    },
  getNotebookRequestHandler:
    ({ token: accessToken }) =>
    async ({ request }) => {
      // TODO
      if (request.schema === "node-query") {
        const result = notebookRequestNodeQuerySchema.safeParse(request);
        if (!result.success) return {};
        const results = await fireNodeQuery(result.data, accessToken);
        return {
          results,
        };
      } else if (typeof request.notebookPageId === "string") {
        const pageData = await encodeState({
          notebookPageId: request.notebookPageId,
          token: accessToken,
        });
        return pageData;
      }
      return {};
    },
  getNotebookResponseHandler: (token) => async (response) => {
    // TODO
  },
});

export default message;
