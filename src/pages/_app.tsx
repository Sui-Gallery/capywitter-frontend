import Header from "@/components/header";
import GlobalStyles from "@/styles/globals";
import type { AppProps } from "next/app";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WalletProvider>
        <GlobalStyles />
        <Header />
        <Component {...pageProps} />
      </WalletProvider>
    </>
  );
}
