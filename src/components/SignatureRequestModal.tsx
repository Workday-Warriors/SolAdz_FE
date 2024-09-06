import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogOverlay } from "@radix-ui/react-dialog";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import IDL from '../idl/soladz.json';
import { AnchorProvider, BN, Idl, Program } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";

const TransactionItem = ({ leftVal, rightVal }: { leftVal: string; rightVal: string }) => {
  return (
    <div className="flex justify-between text-sm gap-4 py-2 border-b border-gray-200">
      <span className="">{leftVal}</span>
      <span className="font-semibold break-all text-right">{rightVal}</span>
    </div>
  );
};

const SignatureRequestModal = ({ solAmount }: { solAmount: number }) => {
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const { connection } = useConnection();
  const { publicKey, signAllTransactions, signTransaction } = useWallet();

  const handleTransaction = useCallback(async() => {
    try {
      if (!publicKey || !signTransaction || !signAllTransactions) return;
      const provider = new AnchorProvider(connection, { publicKey, signTransaction, signAllTransactions });
      const program = new Program(IDL as Idl, provider);
      const ixn = await program.methods.invest(new BN(solAmount * LAMPORTS_PER_SOL)).accounts({
        referrer: publicKey
      }).instruction();
      const instructions = [ixn];
      const { blockhash } = await connection.getLatestBlockhash();
      const message = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions
      }).compileToV0Message();
      const transaction = new VersionedTransaction(message);
      const txn = await signTransaction(transaction);
      await connection.sendTransaction(txn);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setTransactionSuccess(true);
    } catch (e) {
      console.log(e)
    }
  }, [publicKey, signAllTransactions, signAllTransactions, solAmount]);

  return (
    <Dialog>
      <DialogTrigger disabled={solAmount === 0} asChild>
        <button className="w-full bg-[#140e3c] hover:bg-white/20 transition-all duration-300 text-white py-2 px-4 rounded flex-1 font-medium text-[15px] disabled:hover:bg-[#140e3c]">
          Deposit
        </button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/50 grid place-items-center overflow-y-auto">
        <DialogContent className="border-none max-h-[95vh] overflow-y-auto min-w-[300px] max-w-lg p-6 bg-[#0d1432] text-white rounded-lg shadow-xl">
          <div>
            {!transactionSuccess && (
              <>
                <div className="text-center mb-6">
                  <p className="text-2xl font-semibold ">Request Signature</p>
                  <p className="text-gray-500">SOL-adz.com is requesting you to sign</p>
                </div>
                <div className="text-3xl font-bold text-center text-blue-300 mb-6">
                  {solAmount} SOL
                </div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center font-medium text-blue-700">
                      Mi
                    </div>
                    <div className="text-sm mt-2 text-center">Micha... (TYikA... Hueck)</div>
                    <div className="text-xs text-gray-500">500 TRX</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center font-medium text-blue-700">
                      TP
                    </div>
                    <div className="text-sm mt-2 text-center">TPteDwgC...xeng Fx</div>
                  </div>
                </div>
                <div className="space-y-4 border-t border-gray-200 pt-4 mb-6">
                  <TransactionItem leftVal="Type" rightVal="Smart Contract Trigger" />
                  <TransactionItem leftVal="Network" rightVal="Mainnet/MainChain" />
                  <TransactionItem
                    leftVal="Contract"
                    rightVal="TPteDwgC28Df5XYeXvTrR2xyszbxengjFx"
                  />
                  <TransactionItem leftVal="Function" rightVal="registerUser(uint256)" />
                </div>
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Enable automatic signature
                    </span>
                    <Switch />
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    Allow SOLLink to automatically sign for this DApp
                  </p>
                  <Input
                    className="w-full border-gray-300 text-black rounded-md mt-2"
                    placeholder="For 1 hour "
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <DialogClose asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full text-red-600 border-red-600 hover:border-red-700 hover:text-red-700 transition"
                    >
                      Reject
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleTransaction}
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition"
                  >
                    Accept
                  </Button>
                </div>
              </>
            )}
            {transactionSuccess && (
              <>
                <DialogClose
                  onClick={() => setTransactionSuccess(false)}
                  className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
                >
                  <FaChevronLeft size={20} />
                </DialogClose>
                <button className="absolute bottom-4 right-4 text-gray-500 hover:text-gray-700">
                  <FaChevronRight size={20} />
                </button>
                <div className="text-center px-6 w-full">
                  <div className="text-2xl font-semibold mb-4 ">Transaction Details</div>
                  <div className="text-green-500 text-center flex items-center justify-center text-4xl mb-2">
                    <FaCircleCheck />
                  </div>
                  <div className="text-green-500 font-bold mb-2">Success</div>
                  <div className="text-gray-500 mb-4">-100 TRX</div>
                  <div className="space-y-4 text-left ">
                    <div>
                      <span className="font-medium">Transfer account</span>
                      <div>TYIKA1JYdQPZMFYMrPiur4UxsPtP8HuecI</div>
                    </div>
                    <div>
                      <span className="font-medium">Receiving account</span>
                      <div>TPteDwgC28Df5XYeXvTrR2xyszbxengjFx</div>
                    </div>
                    <div>
                      <span className="font-medium">Transaction type</span>
                      <div>Smart Contract Trigger</div>
                    </div>
                    <div>
                      <span className="font-medium break-words break-all text-wrap">
                        Transaction ID
                      </span>
                      <div className="break-all">
                        186722fd7dde3b206b573fa826baa06160614a1a1a48dc04005533acac5bd0dec
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Transaction time</span>
                      <div>2020-10-26 17:13:18</div>
                    </div>
                    <div>
                      <span className="font-medium">Block height</span>
                      <div>24475339</div>
                    </div>
                    <div>
                      <span className="font-medium">Fee (?)</span>
                    </div>
                  </div>
                  <div className="mt-4 text-blue-600 cursor-pointer">
                    Go to SOLscan for detailed data
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default SignatureRequestModal;
