import { useState } from "react";
import MainBg from "../assets/solAdz-bg.png";
import TopLogo from "../assets/top-logo.png";
import GetStartedToday from "../assets/get-started-today.svg";
import CalculatorBg from "../assets/calculator-bg.png";
import LinesRight from "../assets/lines-right.png";
import BgLeft from "../assets/bg-left-1.png";
import { ConnectWalletButton } from "../components/common/ConnectWalletButton";
import SignatureRequestModal from "../components/SignatureRequestModal";
import SmartContactInfo from "../components/SmartContractInfo";
import VerticalDash from "../assets/vertical-dash.svg";
const heroLinks = [
  {
    id: 1,
    title: "wallet tutorial",
    href: "#"
  },
  {
    id: 2,
    title: "GUIDE",
    href: "#"
  },
  {
    id: 3,
    title: "EXCHANGE",
    href: "#"
  },
  {
    id: 4,
    title: "SHOP",
    href: "#"
  }
];

export const CryptoInnovationPage = () => {
  const [solAmount, setSolAmount] = useState(0);

  const handleAmountClick = (amount: number) => {
    setSolAmount((prevVal) => amount + prevVal);
  };

  const handleReset = () => {
    setSolAmount(0);
  };

  const rightText = "MY SOLADZ RANK: STARTER | MY SOL ADDRESS:";

  return (
    <div className="min-h-screen pb-12 relative h-full overflow-x-hidden">
      <img className="absolute top-0 left-0 w-full h-full object-fill" src={MainBg} alt="Bg Hero" />

      <div className="relative z-10">
        {/* Upper sections */}
        <div className=" max-w-7xl mx-auto px-4 md:px-8">
          <header className="flex gap-1 justify-between items-center mt-12">
            <div className="flex items-center gap-2 sm:gap-4">
              <img className="max-w-[50px] lg:max-w-[62px] w-full" src={TopLogo} alt="top logo" />
              <h1 className="bg-gradient-to-br from-[#F7F6FF] via-[#F7F6FF_26%] to-[#C669FF] bg-clip-text text-[30px] lg:text-[50px] text-transparent poller">
                SolAdz
              </h1>
            </div>

            <div className="flex items-center text-xs lg:text-sm">
              <div className="hidden md:flex">
                <span className="text-white mr-4">{rightText}</span>
              </div>
              <ConnectWalletButton text="CONNECT WALLET" />
            </div>
          </header>

          <div className=" flex text-center md:hidden justify-center mt-6">
            <span className="text-white text-xs mr-4">{rightText}</span>
          </div>

          <div className="flex gap-2 md:gap-2 flex-col md:flex-row justify-center md:justify-between items-center">
            <nav className="text-black flex gap-3 mt-4 md:mt-0">
              {heroLinks.map((val, index) => (
                <div key={val.id} className="flex items-center gap-3">
                  <a
                    href={val.href}
                    className="uppercase font-medium text-xs sm:text-sm md:text-base lg:text-2xl hover:text-black/70 transition-all duration-300"
                  >
                    {val.title}
                  </a>
                  {index !== heroLinks.length - 1 && <img src={VerticalDash} alt="vertical-dash" />}
                </div>
              ))}
            </nav>
            <button>
              <img src={GetStartedToday} alt="Get Started Today" />
            </button>
          </div>
        </div>

        {/* second section */}
        <div className="pointer-events-none grid grid-cols-1 lg:grid-cols-3 relative z-10  gap-8">
          <div className="relative text-white p-8 col-span-2 pb-12 md:pb-16 lg:pb-24">
            {/* bg image */}
            <img
              className="absolute w-full h-full top-0 left-0 pointer-events-none"
              src={BgLeft}
              alt=""
            />
            <div className="relative z-10 lg:ml-auto mr-[22vw] lg:mr-[18vw] max-w-[558px]">
              <h2 className="text-[30px] md:text-[40px] lg:text-[60px] poller font-bold mb-4">
                SolAdz
              </h2>
              <h3 className="max-w-[393px] text-[20px] md:text-[30px] lg:text-[40px] leading-[1.5] font-bold">
                Leading the Way in Crypto Innovation
              </h3>
              <p className="text-xs sm:text-sm md:text-[15px] mt-4">
                Soladz revolutionizes cryptocurrencies. Soladz is a secure, intuitive, and powerful
                platform for beginners and experts to manage, trade, and grow crypto portfolios
              </p>
            </div>
          </div>
          <div className="hidden lg:block -ml-[10vw] mt-20 md:pr-8 lg:pr-16">
            <img src={LinesRight} alt="Lines Right" />
          </div>
        </div>

        {/* third calculator section */}

        <div className="flex items-center justify-center lg:block ">
          <div className="relative mx-auto lg:mx-[unset] lg:max-w-[96.5vw] bg-black lg:bg-transparent rounded-xl lg:rounded-none z-0 mt-8 lg:-mt-44">
            <img
              className="hidden lg:block absolute top-0 left-0 w-full h-full"
              src={CalculatorBg}
              alt="calculator-bg"
            />
            <div className="p-4 sm:p-8">
              <div className="relative z-10 lg:ml-auto max-w-[547px] rounded-r-lg">
                <div
                  className={`relative rounded-[6px] inline-block p-[2px] w-full  mb-5`}
                  style={{
                    background: "linear-gradient(to right, #623EFF, #7AD6FF)" //
                  }}
                >
                  <div className="bg-[#171c2c] text-right p-4 rounded-lg">
                    <span className="text-white  text-2xl">{solAmount} SOL</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 md:gap-5 mb-4">
                  {[0.1, 0.3, 0.5, 1, 1.5, 3, 5, 10, 25, 55, 50, 100].map((amount) => (
                    <>
                      <div
                        className={`relative bg-button-gradient-2 inline-block rounded-[6px] p-[2px] `}
                      >
                        <button
                          onClick={() => handleAmountClick(amount)}
                          className={`
          relative bg-[#191e34] rounded-full px-1 sm:px-2 w-full py-1 text-white font-light text-sm 
           flex items-center justify-center text-nowrap`}
                          style={{
                            borderRadius: "6px" // Ensures the button itself is fully rounded
                          }}
                        >
                          +{amount} SOL
                        </button>
                      </div>
                    </>
                  ))}
                </div>
                <div className="flex gap-3 md:gap-5">
                  <div
                    className={`relative inline-block p-[2px] w-full rounded-[6px] bg-button-gradient-2`}
                  >
                    <button
                      onClick={handleReset}
                      className="w-full bg-[#140e3c] text-white py-2 px-4 rounded flex-1 font-medium text-[15px]"
                    >
                      Reset
                    </button>
                  </div>
                  <div
                    className={`relative inline-block p-[2px] w-full bg-button-gradient-2 rounded-[6px] ${
                      solAmount === 0 ? "opacity-30" : ""
                    }`}
                  >
                    {/* Here is the signature request modal */}
                    <SignatureRequestModal solAmount={solAmount} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SmartContactInfo />
      </div>
    </div>
  );
};
