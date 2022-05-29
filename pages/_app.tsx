import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { HandleLogin } from "./handleLogin";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MetaWall</title>
      </Head>
      <RecoilRoot>
        <HandleLogin>
          <Component {...pageProps} />
        </HandleLogin>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
