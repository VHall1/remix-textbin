export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const DEFAULT_THEME = Theme.DARK;

const themes: Theme[] = Object.values(Theme);
export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}
