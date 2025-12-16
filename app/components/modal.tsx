"use client";

// Type of arguments to receive
type ArgsType = {
  destCurrency: string;
  onSelectCurrency: (selected: string) => void;
  closeModal: () => void;
  currencies: [string, string][];
};

export default function Modal({ onSelectCurrency, closeModal, currencies, destCurrency }: ArgsType) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectCurrency(e.target.value); // Send value to Main Page
    closeModal(); 
  };
  return (
    <div className="absolute flex h-2/3 w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-1/4 md:h-2/3 bg-gray-900/80 z-20 rounded-2xl">
        <select size={currencies.length} onChange={handleChange}
        className="absolute top-0 rounded h-1/1 w-1/1 text-white p-5">
        {currencies.map(([code, name]) => (
            <option value={code} key={code} disabled={code === destCurrency} className="p-5">
                {code} - {name}
            </option>
        ))}
        </select>
    </div>
  );
}