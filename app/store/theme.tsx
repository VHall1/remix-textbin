// Had issues with radix injecting styles into the body, causing hydration issues. So pulled code from this repo
// https://github.com/infonomic/remix.infonomic.io/blob/develop/app/ui/theme/theme-provider/provider.tsx

import { Theme } from "@radix-ui/themes";
import * as React from "react";
// import { setColourScheme } from "./theme.server";
import { useFetcher } from "@remix-run/react";

export type Theme = "light" | "dark" | "inherit";

const ColourContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

const useColourMode = () => {
  const ctx = React.useContext(ColourContext);

  if (ctx === null) {
    throw new Error("useColourMode hook needs to be wrapped in ThemeProvider");
  }

  return ctx;
};

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const persistTheme = useFetcher();
  const [themeState, setThemeState] = React.useState<Theme>("inherit");

  // This effect will install an event listener to react to browser
  // prefers-color-scheme changes, but only if the current theme is
  // based on the browser having sent the sec-ch-prefers-color-scheme header.
  // https://wicg.github.io/user-preference-media-features-headers/
  // https://caniuse.com/mdn-http_headers_sec-ch-prefers-color-scheme
  //
  // If the theme is based on session (i.e. the user selected the theme
  // manually) we don't change themes here (when the theme is set manually,
  // and stored in the session, we don't base the theme on
  // prefers-color-scheme at all, so we shouldn't update the theme when
  // it changes).
  // React.useEffect(() => {
  //   if (themeSource === ThemeSource.HEADER) {
  //     const mediaQuery = window.matchMedia(PREFERS_DARK_MQ);
  //     const handleChange = (ev: MediaQueryListEvent) => {
  //       const prefers = ev.matches ? Theme.DARK : Theme.LIGHT;
  //       setPrefersTheme(prefers);
  //       setPrefersColorScheme(prefers);
  //       setThemeInState(prefers);
  //     };
  //     mediaQuery.addEventListener("change", handleChange);
  //     return () => mediaQuery.removeEventListener("change", handleChange);
  //   }
  // }, [theme]);

  const ctx = React.useMemo(() => {
    const setTheme = (prefers: Theme) => {
      persistTheme.submit(
        { theme: prefers },
        { action: "actions/set-theme", method: "post" }
      );

      // Optimistically set here so there is no delay in theme change
      // setPrefersTheme(prefers);
      // setPrefersColorScheme(prefers);

      // Then trigger the state change and theme session cookie change via fetcher
      setThemeState(prefers);
    };

    return { theme: themeState, setTheme };
  }, [themeState, persistTheme]);

  return (
    <ColourContext.Provider value={ctx}>
      <Theme appearance={themeState} accentColor="mint">
        {children}
      </Theme>
    </ColourContext.Provider>
  );
};

export { useColourMode, ThemeProvider };
