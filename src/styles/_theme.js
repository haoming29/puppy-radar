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
        900: "#301237",
        800: "#300D38",
        700: "#FFD54E",
      },
      light: {
        900: "#FDB600",
        100: "#FFF6DB",
      },
    },
  },
});

export default theme;
