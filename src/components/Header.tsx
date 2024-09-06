import { ConnectWalletButton } from "./common/ConnectWalletButton";
import TopLogo from "../assets/top-logo.png";
import { Link } from "react-router-dom";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const Header = () => {
  const rightText = "MY INVESET RANK : STARTER"+'\u00a0'+'\u00a0'+'\u00a0'+"|"+'\u00a0'+'\u00a0'+'\u00a0'+"MY SOL :" ;
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();

  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    if (!publicKey) {
      setBalance(0);
      return;
    }

    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (e) {
      console.error("Error fetching balance", e);
      setBalance(0);
    }
  };

  useEffect(() => {
    getBalance();
  }, [publicKey, connection]);

  return (
    <div>
      <header className="flex gap-1 justify-between items-center mt-12">
        <Link to={"/"} className="flex items-center gap-2 sm:gap-4">
          <img
            className="max-w-[50px] lg:max-w-[62px] w-full"
            src={TopLogo}
            alt="top logo"
          />
          <h2 className="bg-gradient-to-br from-[#F7F6FF] via-[#F7F6FF_26%] to-[#C669FF] bg-clip-text text-[30px] lg:text-[50px] text-transparent poller">
            SolAdz
          </h2>
        </Link>

        <div className="flex items-center text-xs lg:text-sm">
          <div className="hidden md:flex">
            <span className="text-white mr-4">
              {rightText} {balance.toFixed(3)} SOL
            </span>
          </div>
          <ConnectWalletButton
            onClick={() => setVisible(true)}
            text={
              !!publicKey
                ? `${publicKey.toBase58().slice(0, 4)}...${publicKey
                    .toBase58()
                    .slice(-4)}`
                : "connect wallet"
            }
          />
        </div>
      </header>

      <div className=" flex text-center md:hidden justify-center mt-6">
        <span className="text-white text-xs mr-4">{rightText}</span>
      </div>
    </div>
  );
};
