import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { GenesisProvider } from "../context/GenesisContext";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <GenesisProvider>
        <Component {...pageProps} />
      </GenesisProvider>
    </MoralisProvider>
  );
}

export default MyApp;
