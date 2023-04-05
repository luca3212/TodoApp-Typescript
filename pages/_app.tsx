import "@/styles/globals.css";
import type { AppProps } from "next/app";
import TareaProvider from "../contexts/ListContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TareaProvider>
      <Component {...pageProps} />
    </TareaProvider>
  );
}
