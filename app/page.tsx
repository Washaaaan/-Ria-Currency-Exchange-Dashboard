"use client"
import Rates from "./components/exchange-rates";
import Converter from "./components/converter";
import Graphic from "./components/graphic";
import Modal from "./components/modal";

import { useEffect, useState } from "react";
import { getCurrencies } from "./utils/utils";

export default function Home() {
  // For setting base currency
  const [baseCurrency, setBaseCurrency] = useState<string>("USD");
  // For setting target currency
  const [destCurrency, setDestCurrency] = useState<string>("EUR");
  // All currencies
  const [currencies, setCurrencies] = useState<[string, string][]>([]);
  // For open and close currency selection modals
  const [isBaseModalOpen, setIsBaseModalOpen] = useState<boolean>(false);
  const [isDestModalOpen, setIsDestModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadCurrencies()
    {
      const currencies_response = await getCurrencies();
      setCurrencies(currencies_response);
    }
  
    loadCurrencies();
  }, []);

  const handleSelectBase = (selected: string)  => {
    setBaseCurrency(selected); // Get base currency from modal
  };

  const handleSelectDest = (selected: string)  => {
    setDestCurrency(selected); // Get dest currency from modal
  };

  return (
    <div className="overflow-scroll bg-[#081018] relative flex min-h-screen items-center justify-center">
      {/* Title */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 font-semibold flex items-center justify-center text-center w-1/2 h-1/8 z-1">
        <h1 className="text-5xl text">XChange</h1>
      </div>
  
      <Converter baseCurrency={baseCurrency} destCurrency={destCurrency} onSelectBase={() => setIsBaseModalOpen(true)} 
      onSelectDest={() => setIsDestModalOpen(true)}></Converter>


      {/* Graphic */}
      <Graphic baseCurrency={baseCurrency} toCurrency={destCurrency}></Graphic>

      {/* Rates changes */}
      <Rates baseCurrency={baseCurrency} currencies={currencies}></Rates>

      {/* Modals */}
      {(isBaseModalOpen || isDestModalOpen) && (
        <div
          className="fixed inset-0 z-10 bg-black/30 backdrop-blur-md"
          onClick={() => {
            setIsBaseModalOpen(false);
            setIsDestModalOpen(false);
          }}
        />
      )}

      {isBaseModalOpen && (
        <Modal currencies={currencies} destCurrency={destCurrency} onSelectCurrency={handleSelectBase} closeModal={() => setIsBaseModalOpen(false)}></Modal>
      )}

      {isDestModalOpen && (
        <Modal currencies={currencies} destCurrency={baseCurrency} onSelectCurrency={handleSelectDest} closeModal={() => setIsDestModalOpen(false)}></Modal>
      )}

      <footer className="absolute text h-1/10 w-1/1 top-5/4 z-3"></footer>
    </div>
    
    
  );
}
