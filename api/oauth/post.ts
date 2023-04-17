import createAPIGatewayHandler from "samepage/backend/createAPIGatewayProxyHandler";
import { zOauthRequest, zOauthResponse } from "samepage/internal/types";
import { z } from "zod";
import axios from "axios";
import qs from "querystring";

const logic = async (
  args: z.infer<typeof zOauthRequest>
): Promise<z.infer<typeof zOauthResponse>> => {
  const { data } = await axios
    .post<{ access_token: string; team: { name: string } }>(
      "https://slack.com/api/oauth.v2.access",
      qs.stringify({
        code: args.code,
        redirect_uri:
          process.env.NODE_ENV === "production"
            ? "https://samepage.network/oauth/slack"
            : "https://samepage.ngrok.io/oauth/slack",
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
      }),
      {
        headers: {
          Accept: "application/x-www-form-urlencoded",
        },
      }
    )
    .catch((e) =>
      Promise.reject(
        new Error(`Failed to get access token: ${e.response.data}`)
      )
    );
  const { access_token, team } = data;
  return {
    accessToken: access_token,
    workspace: team.name,
  };
};

export default createAPIGatewayHandler(logic);
