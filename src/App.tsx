// Import required components from React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CryptoInnovationPage } from "./views/CryptoInnovationPage";
import { MainPage } from "./views/MainPage";
import Lottie from "lottie-react";
import animationData from "./assets/loading/loading.json";
import { useEffect, useState, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter,
  UnsafeBurnerWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import("@solana/wallet-adapter-react-ui/styles.css");

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: "/innovation",
    element: <CryptoInnovationPage />
  }
]);

// Main App component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolongWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div
              className={`${
                isLoading ? "opacity-100" : "opacity-0"
              } transition-all duration-300 fixed min-h-screen w-full h-full top-0 left-0 bg-blue-400 z-[99999] pointer-events-none`}
            >
              <div className="h-full w-full flex items-center justify-center">
                <Lottie
                  className="max-w-[800px]"
                  height={500}
                  width={500}
                  animationData={animationData}
                />
              </div>
            </div>
            <RouterProvider router={router} />;
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
