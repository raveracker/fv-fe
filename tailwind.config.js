/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Tektur", 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          5: '#f5f7fe',
          10: '#e3e7f7',
          20: '#d0d8f5',
          40: '#acbbf3',
          60: '#8a9df0',
          80: '#6680ee',
          90: '#4263eb',
          100: '#2445cd',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          5: '#f0eefe',
          10: '#e1ddfe',
          20: '#d0c9fd',
          40: '#b2a6fc',
          60: '#907ffa',
          80: '#7e6bfa',
          90: '#6c56f9',
          100: '#543af8',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        black: {
          5: '#f9f9fa',
          10: '#e8e8e8',
          20: '#dcdbe0',
          40: '#cccacf',
          60: '#a2a0a8',
          80: '#52525c',
          90: '#211f32',
          100: '#15141f',
        },
        grey: '#323045',
        warning: {
          light: '#ffbc1f',
          DEFAULT: '#f6a609',
          dark: '#e89806',
        },
        success: {
          light: '#40dd7f',
          DEFAULT: '#2ac769',
          dark: '#1ab759',
        },
        error: {
          light: '#ff6262',
          DEFAULT: '#fb4e4e',
          dark: '#e93c3c',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
