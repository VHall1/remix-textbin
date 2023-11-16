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
import "~/styles/global.css";
import "~/styles/theme-config.css";

export default function App() {
  const data = useLoaderData<typeof loader>();

  const { theme } = data;

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <RadixTheme appearance={theme} accentColor="mint">
            <Navbar />
            <Outlet />
          </RadixTheme>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export type LoaderData = {
  theme: Theme;
};

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const { theme } = await getTheme(request);

  const data: LoaderData = {
    theme,
    // themeSource: source,
    // user: user,
    // origin: getDomainUrl(request),
    // path: new URL(request.url).pathname,
    // ENV: {
    //   SITE_TITLE: process?.env?.SITE_TITLE || "Site Title",
    //   RECAPTCHA_ENABLED:
    //     process.env.NODE_ENV === "development"
    //       ? "false"
    //       : process.env.RECAPTCHA_ENABLED,
    //   RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    // },
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
