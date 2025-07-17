"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme?: Theme;
  theme?: Theme;
  syncSystem?: boolean;
}> = ({ children, initialTheme, theme: forcedTheme, syncSystem = false }) => {
  const getSystemTheme = (): Theme =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [stateTheme, setStateTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return forcedTheme ?? initialTheme ?? "light";
    }
    if (forcedTheme) return forcedTheme;
    if (syncSystem) return getSystemTheme();
    if (initialTheme) return initialTheme;
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;
    return getSystemTheme();
  });

  useEffect(() => {
    if (!syncSystem) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) =>
      setStateTheme(e.matches ? "dark" : "light");

    mql.addEventListener
      ? mql.addEventListener("change", onChange)
      : mql.addListener(onChange);

    return () => {
      mql.removeEventListener
        ? mql.removeEventListener("change", onChange)
        : mql.removeListener(onChange);
    };
  }, [syncSystem]);

  const theme = forcedTheme ?? stateTheme;

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "light" ? "dark" : "light"
    );
    document.documentElement.classList.add(theme);
    if (!syncSystem) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, syncSystem]);

  const toggle = () =>
    setStateTheme((prev) => (prev === "light" ? "dark" : "light"));
  const setTheme = (t: Theme) => setStateTheme(t);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
