"use client"

import { CartesianGrid, Line, Area, ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts"
import { getCurrencyChanges } from "../utils/utils";
import { useEffect, useState } from "react";
import { last_7_days, last_month, last_year } from "../utils/dateOptions";

// Type of data that will be used in the graphic
type Changes = {
  date: number,
  value: number,
};

// Type of arguments to receive
type ArgsType = {
  baseCurrency: string;
  toCurrency: string;
};

export default function Graphic({ baseCurrency, toCurrency }: ArgsType) {
  const [data, setData] = useState<Changes[]>([]);
  const [startDate, setStartDate] = useState<string>(last_7_days);

  useEffect(() => {
    async function loadChanges()
    {
      const data_response = await getCurrencyChanges(startDate, baseCurrency, toCurrency);
      setData(data_response.changes);
    }
  
    loadChanges();
  }, [baseCurrency, toCurrency, startDate]);

  return (
    <div className="absolute h-2/4 w-5/6 right-1/13 top-3/4 md:right-1/20 md:top-5/9 md:h-6/10 md:w-6/11 containers items-center shadow-lg shadow-[#17292e]">
      {/* Graphic Label */}
      <span className="absolute text left-1/2 top-0 -translate-x-1/2 p-2">{baseCurrency} to {toCurrency}</span>

      {/* Graphic */}
      <div className="flex top-1/2 pb-10 w-full h-full md:pb-0 md:top-1/2 md:w-1/1 md:h-1/1 justify-center items-center md:pr-12 pt-5 text-xs">
        <ResponsiveContainer width="80%" height="90%" minWidth={1/20} minHeight={1/20} className="left-0 mr-20">
          <ComposedChart data={data}>
            <CartesianGrid stroke="#FFFFFF" strokeOpacity={0.10}></CartesianGrid>
            <XAxis dataKey="date" stroke="#FFFFFF" tickFormatter={(value) => {
                const d = new Date(value);
                return d.toLocaleDateString("en-US", {
                  day: "numeric",  
                  month: "short",
                  year: "2-digit",  
                });
              }}>
            </XAxis>

            <YAxis stroke="#FFFFFF">
              <Label value={toCurrency} angle={-90} position="insideLeft" style={{ fill: "#FFFFFF", textAnchor: "middle" }}></Label>
            </YAxis>

            <Tooltip labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              } formatter={(value) => [`${value} ${toCurrency}`, `1 ${baseCurrency}`]} 
              labelStyle={{color: "#000000"}}>      
            </Tooltip>

            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="90%" stopColor="#162439" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area dataKey="value" tooltipType="none" type="monotone" stroke="none" fill="url(#areaGradient)" fillOpacity={0.3}></Area>
            <Line dataKey="value" type="monotone" name="Currency Value" dot={false} stroke="#1c77f8"></Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Date options */}
      <button className="absolute w-1/4 h-1/7 self-center top-5/6 right-7/10 md:top-0 md:right-0 m-1 ml-5 md:m-5 md:h-1/10 md:w-1/7 buttons"
      onClick={() => setStartDate(last_7_days)}>Last 7 days</button>
      <button className="absolute w-1/4 h-1/7 self-center top-5/6 right-2/6 md:top-1/6 md:right-0 m-1 md:m-5 md:h-1/10 md:w-1/7 buttons"
      onClick={() => setStartDate(last_month)}>Last month</button>
      <button className="absolute w-1/4 h-1/7 self-center top-5/6 right-0 md:top-1/3 md:right-0 m-1 md:m-5 md:h-1/10 md:w-1/7 buttons"
      onClick={() => setStartDate(last_year)}>Last year</button>
    </div>
  );
}