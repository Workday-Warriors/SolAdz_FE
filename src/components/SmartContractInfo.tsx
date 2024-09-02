// import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

const SmartContactInfo = () => {
  const contactInfoItems = Array(8)
    .fill(null)
    .map((_, index: number) => ({
      paidContributionTimer: `Paid Contribution Timer ${index + 1}`,
      contractAddress: `Contract Address ${index + 1}`
    }));

  const personalStatistics = Array(8)
    .fill(null)
    .map(() => ({
      nextIncome: 0,
      contribution: 0
    }));

  return (
    <div className="px-4 mt-12">
      <div className="flex flex-col gap-4 lg:flex-row p-4 md:p-6 max-w-[1200px] border border-dashed rounded-lg border-black mx-auto">
        <Card className="w-full py-4 md:py-8 px-4 md:px-6 bg-[#0A1129] text-white border-none">
          <CardHeader>
            <h2 className="text-2xl poller font-bold">Smart contact info</h2>
          </CardHeader>
          <CardContent>
            {contactInfoItems.map((item, index) => (
              <div
                key={index}
                className={`${
                  index === 0 ? "border-white/20 border-t" : ""
                } border-b py-4 border-white/20 flex justify-between items-center`}
              >
                <div>
                  <p className="text-sm">{item.paidContributionTimer}</p>
                  <p className="text-sm ">{item.contractAddress}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="w-full py-4 md:py-8 px-4 md:px-6 bg-[#0A1129] text-white border-none">
          <CardHeader>
            <h2 className="text-2xl poller font-bold">Personal Statistics</h2>
          </CardHeader>
          <CardContent className="">
            {personalStatistics.map((stat, index) => (
              <div
                key={index}
                className={`${
                  index === 0 ? "border-white/20 border-t" : ""
                } border-b py-4 border-white/20 flex justify-between items-center`}
              >
                <div className="">
                  <p className="text-sm">Next income</p>
                  <p className="text-sm">Contribution</p>
                </div>
                <p className="text-sm">{stat.nextIncome} SOL</p>
              </div>
            ))}
            <div
              className={`mt-8 max-w-[253px] relative inline-block p-[2px] w-full rounded-[6px]`}
              style={{
                background: "linear-gradient(to right, #623EFF, #7AD6FF)", // Gradient border background
                borderRadius: "6px" // Ensures the outer wrapper is fully rounded
              }}
            >
              <button className="w-full bg-[#140e3c] text-white py-1 px-4 rounded flex-1 font-medium text-[14px]">
                Withdraw
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartContactInfo;
