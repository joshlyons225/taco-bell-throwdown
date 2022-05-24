module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{html,js,jsx}',
    './public/index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['"Josefin Sans"', 'defaultTheme.fontFamily.sans'],
      body: ['"Josefin Sans"', 'defaultTheme.fontFamily.sans'],
      p: ['"Josefin Sans"', 'defaultTheme.fontFamily.sans'],
      li: ['"Londrina Outlines"'],
    },
    extend: {},
  },
  plugins: [],
};
