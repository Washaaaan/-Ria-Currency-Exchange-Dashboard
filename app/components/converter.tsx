"use client";
import { useEffect, useState } from "react";
import { convert } from "../utils/utils";

// Type of arguments to receive
type ArgsType = {
  baseCurrency: string;
  destCurrency: string;
  onSelectBase: () => void;
  onSelectDest: () => void;
};

export default function Converter({ baseCurrency, destCurrency, onSelectBase, onSelectDest}: ArgsType) {
  const [baseQuantity, setBaseQuantity] = useState("0");
  const [total, setTotal] = useState("0");

  // Convert currency everytime baseQuantity, baseCurrency or destCurrency change
  useEffect(() => {
    async function convertCurrency()
    {
      const conversion = await convert(baseCurrency, destCurrency, Number(baseQuantity));
      setTotal(conversion);
    }

    convertCurrency();
  }, [baseQuantity, baseCurrency, destCurrency]);
  

  return (
    <div className="absolute w-5/6 h-2/4 top-2/13 
    md:left-1/5 md:top-2/13 md:h-4/11 md:w-6/10 containers shadow-lg shadow-[#17292e]">
      
      <div className="absolute w-full h-3/5 top-0 md:w-1/1 md:h-3/5 md:top-0">
        {/* Title */}
        <h2 className="absolute text-3xl left-1/2 -translate-x-1/2 p-5 top-0 z-5 text text-center">Currency Converter</h2>
      
        {/* Base Currency Bttn */}
        <div className="absolute h-2/4 w-2/5 top-1/2 left-1/20 md:top-2/5 md:left-1/10 p-5 md:w-1/4 md:h-2/5 z-3">
          <button className="absolute text-base p-2 self-center h-1/1 w-1/1 buttons" 
          onClick={onSelectBase}>Select base currency</button>
        </div>
      
        {/* Dest Currency Bttn */}
        <div className="absolute h-2/4 w-2/5 top-1/2 left-10/20 md:top-2/5 md:left-3/5 p-5 md:w-1/4 md:h-2/5 z-3">
          <button className="absolute text-base self-center h-1/1 w-1/1 buttons" 
          onClick={onSelectDest}>Select the destination currency</button>
        </div>
      </div>
      {/* Inputs and labels */}
      
      <input type="number" placeholder="0" min="0" step="any" onChange={(e) => setBaseQuantity(e.target.value)} className="absolute w-1/4 h-1/9 bottom-1/5 left-3/24 
      md:bottom-1/7 md:w-1/4 md:h-2/9 md:left-1/8 input no-spinners"/>

      <input type="text" value={total} readOnly disabled className="absolute w-1/4 h-1/9 bottom-1/5 right-2/24 md:bottom-1/7 md:w-1/4 md:h-2/9 md:right-1/8 input"/>

      <div className="absolute h-1/7 w-1/8 bottom-1/6 md:h-3/10 md:w-1/10 md:bottom-1/9 left-1/2 -translate-x-1/2">
        <img src="/leftrightarrow.png" className="w-full h-full"></img>
      </div>
      
      <span className="absolute left-3/24 bottom-0 w-1/3 h-1/5 md:left-0 md:bottom-1/25 md:h-1/10 md:w-5/10 text p-5 text-center">Base Currency: {baseCurrency}</span>
      <span className="absolute right-2/24 bottom-0 w-1/3 h-1/5 md:right-0 md:bottom-1/25 md:h-1/10 md:w-5/10 text p-5 text-center">Target Currency: {destCurrency}</span>
    </div>
  );
}