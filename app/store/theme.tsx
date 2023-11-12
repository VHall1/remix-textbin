import { Theme } from "@radix-ui/themes";
import * as React from "react";

export type COLOUR_MODES = "light" | "dark" | "inherit";

const ColourContext = React.createContext<{
  mode: COLOUR_MODES;
  setMode: React.Dispatch<React.SetStateAction<COLOUR_MODES>>;
} | null>(null);

const useColourMode = () => {
  const ctx = React.useContext(ColourContext);

  if (ctx === null) {
    throw new Error("useColourMode hook needs to be wrapped in ThemeProvider");
  }

  return ctx;
};

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<COLOUR_MODES>("inherit");

  React.useLayoutEffect(() => {
    return () => {};
  }, []);

  return (
    <ColourContext.Provider value={{ mode, setMode }}>
      <Theme appearance={mode} accentColor="mint">
        {children}
      </Theme>
    </ColourContext.Provider>
  );
};

export { useColourMode, ThemeProvider };
