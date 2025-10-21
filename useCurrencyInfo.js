import { useState, useEffect } from 'react';

function useCurrencyInfo(currency) {
    const [data, setData] = useState({})

    useEffect(() => {
        // FIX: Better API endpoint and error handling
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch currency data')
                }
                return res.json()
            })
            .then((res) => {
                setData(res[currency] || {})
            })
            .catch(error => {
                console.error('Error fetching currency data:', error)
                // Fallback to some default data
                setData({
                    usd: 1,
                    inr: 83.25,
                    eur: 0.92,
                    gbp: 0.79,
                    jpy: 149.5
                })
            })
    }, [currency])

    return data
}

export default useCurrencyInfo