import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/700.css";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: `'Rubik', sans-serif`,
    heading: `'Rubik', sans-serif`,
    mono: `'Rubik'`,
  },
  colors: {
    brand: {
      dark: {
        900: "#300D38",
        800: "#5D176C",
        700: "#7C2A8E",
        600: "#9E38B6",
        500: "#CF6CE5",
        400: "#DF9AEF",
        300: "#EEC2F9",
        200: "#F8DDFE",
        100: "#FCF1FF",
      },
      light: {
        900: "#FDB600",
        200: "#FFF6DB",
        100: "#FFFBF0",
      },
    },
  },
});

export default theme;
