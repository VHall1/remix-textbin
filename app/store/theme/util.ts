enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const DEFAULT_THEME = Theme.DARK;

const themes: Theme[] = Object.values(Theme);
function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export { Theme, DEFAULT_THEME, isTheme };
