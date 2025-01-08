const exchangeRates: Record<string, number> = {
    "USD": 0.53,
    "EUR": 0.51,
    "JPY": 83.51,
    "GBP": 0.42,
    "AUD": 0.85,
    "CAD": 0.76,
    "CHF": 0.48,
    "CNY": 3.87,
    "SEK": 5.9,
    "HKD": 4.1,
    "MXN": 10.74,
    "ZAR": 9.92,
    "BRL": 3.23,
    "AED": 1.94,
    "TRY": 18.66,
    "HUF": 212.07,
    "SAR": 1.98,
    "RUB": 55.17,
    "PEN": 1.99,
    "BAM": 1
}

export async function POST(req: Request) {
    try {
        const data = await req.json()
        if (
            !(data.base_currency in exchangeRates) ||
            !(data.target_currency in exchangeRates)
        ) {
            throw new Error("Invalid POST request.")
        }
        const amount = data.amount
        let result = amount
        result /= exchangeRates[data.base_currency]
        result *= exchangeRates[data.target_currency]
        result = parseFloat(result.toFixed(2))
        return new Response(
            JSON.stringify({
                result: result
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        let msg = ""
        if (error instanceof Error) {
            msg = error.message
        } else {
            msg = "An unknown error occured."
        }
        return new Response(
            JSON.stringify({
                error: msg
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
