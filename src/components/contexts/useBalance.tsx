import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createContext, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export interface BalanceContextProps {
    balance: number;
    getBalance: () => void;
}

export const BalanceContext = createContext<BalanceContextProps>({} as BalanceContextProps)

export const BalanceContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [balance, setBalance] = useState(0);

    const { publicKey } = useWallet();

    const { connection } = useConnection();

    const getBalance = async () => {
        if (!publicKey || !connection) return;
        try {
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        } catch {}
    }

    return (
        <BalanceContext.Provider value={{balance, getBalance}}>
            {children}
        </BalanceContext.Provider>
    )
}