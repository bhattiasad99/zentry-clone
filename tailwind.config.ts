import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          50: '#dfdff0',
          75: '#dfdff2',
          100: '#f0f2fa',
          200: '#010101',
          300: '#4fb7dd'
        },
        violet: {
          300: '#5724ff'
        },
        yellow: {
          100: '#8e983f',
          300: '#edff66'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
