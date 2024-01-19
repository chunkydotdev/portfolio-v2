import "antd/dist/antd.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { InView } from "react-intersection-observer";
import Navigation from "../components/navigation/navigation";
import { GlobalStyle } from "../styles/global-styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        defer
        data-domain="junghard.com"
        src="https://plausible.chunky.dev/js/plausible.js"
      ></Script>
      <Head>
        <link rel="shortcut icon" href="logo.png" />
        <link
          rel="preconnect"
          href="https://junghard.com"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            </style>
              <link
                href='/fonts.css'
                rel='preload'
                as='style'
                onload="this.rel='stylesheet'"
              ></link>
            <style>`,
          }}
        ></style>
        <noscript>
          <link rel="stylesheet" href="/fonts.css" />
        </noscript>
        <title>Magnus JJ</title>
      </Head>
      <GlobalStyle />
      <Navigation />
      {/**@ts-ignore */}
      <InView>
        {/**@ts-ignore */}
        <Component {...pageProps} />
      </InView>
    </>
  );
}

export default MyApp;
