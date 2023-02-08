import "../styles/globals.css";
import NProgress from "nprogress";
import { Router } from "next/router";
import Head from "next/head";
import { LangPicker } from "../components/lang-picker";
import { UserContextProvider } from "../context/user-context";
import { OwnHead } from "../components/head";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", (url) => {
  NProgress.done(false);
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <LangPicker />
      <UserContextProvider>
        <OwnHead />
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  );
}

export default MyApp;
