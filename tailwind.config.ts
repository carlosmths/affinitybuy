import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'var(--font-roboto)',
      },
      colors: {
        'erie-black': '#1E1E1E',
      },
      spacing: {
        'full-hd': '120rem',
        'inner-container': '71rem',
      },
      container: {
        center: true,
        padding: 'theme(spacing.4)',
        screens: {},
      },
    },
  },
  plugins: [],
};
export default config;
