import { Theme as RadixTheme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type LinksFunction,
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
import { UserProvider } from "~/store/user/user";
import { getUser } from "~/store/user/user.server";
import "~/styles/global.css";
import "~/styles/theme-config.css";

export default function App() {
  const { theme, user } = useLoaderData<typeof loader>();

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [user, theme] = await Promise.all([
    getUser(request),
    getTheme(request),
  ]);

  const data = {
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
