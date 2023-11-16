import { type User } from "@prisma/client";
import { Theme as RadixTheme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type LinksFunction,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/store/theme/theme";
import { getTheme } from "~/store/theme/theme.server";
import type { Theme } from "~/store/theme/util";
import { UserProvider } from "~/store/user/user";
import { getUser } from "~/store/user/user.server";
import "~/styles/global.css";
import "~/styles/theme-config.css";

export default function App() {
  const data = useLoaderData<typeof loader>();
  const { theme, user } = data;

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <UserProvider user={user}>
          <ThemeProvider theme={theme}>
            <RadixTheme appearance={theme} accentColor="mint">
              <Navbar />
              <Outlet />
            </RadixTheme>
          </ThemeProvider>
        </UserProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export type LoaderData = {
  theme: Theme;
  user: User | null;
};

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const { theme } = await getTheme(request);
  const user = await getUser(request);

  const data: LoaderData = {
    theme,
    user,
  };

  return json(data);
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap",
  },
];
