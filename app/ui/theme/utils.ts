enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const DEFAULT_THEME = Theme.LIGHT;

// Helper to type check Theme value
const themes: Array<Theme> = Object.values(Theme);
function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export { DEFAULT_THEME, Theme, isTheme };
