import type { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUserSession } from "~/store/user/user.server";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const userSession = await getUserSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const user = form.get("user");

  userSession.setUser(user);
  return json(
    { success: true },
    { headers: { "Set-Cookie": await userSession.commit() } }
  );
};
