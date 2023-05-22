import createApiBackendPostHandler from "samepage/backend/createApiBackendPostHandler";
import decodeState from "src/util/decodeState";
import encodeState from "src/util/encodeState";
import commands from "src/util/commands";

const backend = createApiBackendPostHandler({
  getCommandLibrary: commands,
  getDecodeState: (credentials) => (notebookPageId, state) =>
    decodeState(notebookPageId, state, credentials.accessToken),
  getEncodeState: (credentials) => (notebookPageId) =>
    encodeState({ notebookPageId, token: credentials.accessToken }),
});

export default backend;
