import "@/styles/globals.css";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../styles/_theme";
import useStore from "@/store/useStore";

export default function App({ Component, pageProps }: AppProps) {
  const getAuthStatusFromStorage = useStore(
    (state) => state.getAuthStatusFromStorage
  );
  const getLikedDogsFromLocalStorage = useStore(
    (state) => state.getLikedDogsFromLocalStorage
  );
  useEffect(() => {
    getAuthStatusFromStorage();
    getLikedDogsFromLocalStorage();
  }, [getAuthStatusFromStorage, getLikedDogsFromLocalStorage]);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
