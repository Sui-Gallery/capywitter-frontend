import Header from "@/components/header";
import GlobalStyles from "@/styles/globals";
import type { AppProps } from "next/app";
import { WalletKitProvider } from "@mysten/wallet-kit";
//import "@suiet/wallet-kit/style.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletKitProvider>
      <Head>
        <title>CapyWitter</title>
        <meta name="description" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta name="keywords" content="" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favoricon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favoricon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favoricon/favicon-16x16.png"
        />
      </Head>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </WalletKitProvider>
  );
}
