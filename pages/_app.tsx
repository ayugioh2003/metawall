import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { HandleLogin } from "./handleLogin";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <HandleLogin>
        <Component {...pageProps} />
      </HandleLogin>
    </RecoilRoot>
  );
}

export default MyApp;
