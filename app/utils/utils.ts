// Typings for returning data in functions
type RatesResponse = {
  base: string;
  rates: Record<string, number>;
};

type ConversionResponse = {
    amount: number;
    base: string;
    date: string;
    rates: Record<string, number>;
}

type TimeSeries = {
    base: string;
    start_date: string;
    end_date: string;
    rates: 
    {
        [date: string]: 
        {
            [currency: string]: number;
        };
    };
}

// API call for getting rates against a base currency (for exchange-rates table)
export async function getRates(base: string): Promise<[string, number][]>
{
    try 
    {
        const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${base}`);
    
        // Error handling
        if (!response.ok)
        {
            throw new Error("Error while getting exchange rates data");
        }
        else
        {
            // Return data
            const latest: RatesResponse = await response.json();
        
            return Object.entries(latest.rates);
        }
    } 
    catch (error) // In case of other error type
    {
        if (error instanceof TypeError)
        {
            console.error("Connection error while getting exchange rates:", error.message);
            alert("Connection error while getting exchange rates, please try again later.");
        }
        else
        {
            console.error("Unexpected error while getting exchange rates:", (error as Error).message);
            alert("Unexpected error while getting exchange rates, please try again later.");
        }
        throw error;
    }
}

// API call for getting all the available currencies
export async function getCurrencies(): Promise<[string, string][]>
{
    try 
    {
        const response = await fetch("https://api.frankfurter.dev/v1/currencies");
    
        // Error handling
        if (!response.ok)
        {
            throw new Error("Error while getting currencies data");
        }
        else
        {
            // Return data
            const currencies: Record<string, string> = await response.json();
        
            return Object.entries(currencies);
        }
    }
    catch (error) // In case of other error type
    {
        if (error instanceof TypeError)
        {
            console.error("Connection error while getting currencies data:", error.message);
            alert("Connection error while getting currencies data, please try again later.");
        }
        else
        {
            console.error("Unexpected error while getting currencies data:", (error as Error).message);
            alert("Unexpected error while getting currencies data, please try again later.");
        }
        throw error;
    }
}

// API call for getting conversion rates from a base currency to a dest currency, then calculate by the amount
export async function convert(from: string, to: string, amount: number) {
    try
    {
        const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
    
        if (!response.ok)
        {
            throw new Error("Error while getting conversion data");
        }
        else
        {
            const data: ConversionResponse = await response.json();
            
            const convertedAmount = (amount * data.rates[to]).toFixed(2);
            
            return convertedAmount;
        }
    }
    catch (error) // In case of other error type
    {
        if (error instanceof TypeError)
        {
            console.error("Connection error while getting conversion data:", error.message);
            alert("Connection error while getting conversion data, please try again later.");
        }
        else
        {
            console.error("Unexpected error while getting conversion data:", (error as Error).message);
            alert("Unexpected error while getting conversion data, please try again later.");
        }
        throw error;
    }
}

// API call for getting all the currency changes between startingDate and now (Based on a start currency conversion to a dest currency)
export async function getCurrencyChanges(startingDate: string, baseCurrency: string, toCurrency: string)
{
    try
    {
        const response = await fetch(`https://api.frankfurter.dev/v1/${startingDate}..?base=${baseCurrency}&symbols=${toCurrency}`);
        
        if (!response.ok)
        {
            throw new Error("Error while getting specific exchange rates data");
        }
        else
        {
            const data: TimeSeries = await response.json();
        
            const changes = Object.entries(data.rates).map(
                ([date, currencies]) => ({
                    date: new Date(`${date}T12:00:00`).getTime(),
                    value: currencies[toCurrency],
                })
            );
        
            return {
                base: data.base,
                startDate: data.start_date,
                endDate: data.end_date,
                changes,
            };
        }
    }
    catch (error) // In case of other error type
    {
        if (error instanceof TypeError)
        {
            console.error("Connection error while getting specific exchange rates data:", error.message);
            alert("Connection error while getting specific exchange rates data, please try again later.");
        }
        else
        {
            console.error("Unexpected error while getting specific exchange rates data:", (error as Error).message);
            alert("Unexpected error while getting specific exchange rates data, please try again later.");
        }
        throw error;
    }
}
