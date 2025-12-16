"use client";
import { useEffect, useState } from "react";
import { getRates } from "../utils/utils";

// Type of arguments to receive
type ArgsType = {
  baseCurrency: string;
  currencies: [string, string][];
};

export default function Rates({ baseCurrency }: ArgsType) {
  // For getting all the currency rates based on a currency
  const [rates, setRates] = useState<[string, number][]>([]);
  
  useEffect(() => {
    async function loadRates()
    {
      const rates_response = await getRates(baseCurrency);
      setRates(rates_response);
    } 
    loadRates();
  }, [baseCurrency]);
  
  return (
    <div className="absolute h-2/4 w-5/6 left-1/13 top-4/3 md:left-1/20 md:top-5/9 md:h-6/10 md:w-4/12 flex 
    justify-center containers shadow-lg shadow-[#17292e]">
        <h1 className="absolute w-5/10 top-1/30 text-center text-shadow-lg/20 text-xl text">Exchange Rates</h1>
        <div className="absolute h-8/11 top-2/13 w-10/10 bottom-0 overflow-y-auto">

          {/* Table for viewing rates */}
          <table className="w-full text-sm text">
            <thead className="sticky top-0 bg-[#131a23] z-10">
              <tr className="text uppercase text-xs">
                <th className="text-left px-4 py-2">Currency</th>
                <th className="text-right px-4 py-2">Rate</th>
              </tr>
            </thead>

            <tbody>
              {rates.map(([currency, value]) => (
                <tr key={currency} className="border-b border-[#1E293B]">
                  <td className="text px-4 py-2 font-medium">1 {currency}</td>
                  {/* Show the conversion from 1 {currency} to base currency */}
                  <td className="text px-4 py-2 text-right tabular-nums">{(1 / value).toFixed(3)} {baseCurrency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>   
    </div>
  );
}