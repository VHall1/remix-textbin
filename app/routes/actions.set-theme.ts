import type { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getThemeSession } from "~/store/theme/theme.server";
import { isTheme } from "~/store/theme/util";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const themeSession = await getThemeSession(request);
  const formData = await request.formData();
  const theme = formData.get("theme");

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    });
  }

  themeSession.setTheme(theme);
  return json(
    { success: true },
    { headers: { "Set-Cookie": await themeSession.commit() } }
  );
};
