import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)'],
        'jacquard-12': ['var(--font-jacquard-12)'],
        'jim-nightshade': ['var(--font-jim-nightshade)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'darkest-purple': '#27214F',
        'dark-purple': '#4C175A',
        'med-purple': '#863B87',
        'light-purple': '#9A52A3',
        'white': '#ECF2F4',
        'black': '#000000',
      },
    },
  },
  plugins: [],
} satisfies Config;
