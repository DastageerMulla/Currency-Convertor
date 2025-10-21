import React, { useId } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId()

    const handleAmountChange = (e) => {
        let value = e.target.value;
        
        // Remove leading zeros but allow "0" and decimal numbers
        if (value && value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) {
            value = value.replace(/^0+/, '');
        }
        
        // If empty after processing, set to empty string
        if (value === '') {
            onAmountChange && onAmountChange('');
        } else {
            onAmountChange && onAmountChange(value);
        }
    }

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input 
                    id={amountInputId} 
                    type="text"  // Changed to text to avoid browser auto-formatting
                    className="outline-none w-full bg-transparent py-1.5" 
                    placeholder="0"
                    disabled={amountDisable} 
                    value={amount} 
                    onChange={handleAmountChange}
                    inputMode="decimal"  // Shows numeric keyboard on mobile
                />
            </div>

            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select 
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none" 
                    value={selectCurrency} 
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} 
                    disabled={currencyDisable}
                >
                    {currencyOptions.length === 0 ? (
                        <>
                            <option value="usd">usd</option>
                            <option value="inr">inr</option>
                            <option value="eur">eur</option>
                            <option value="gbp">gbp</option>
                        </>
                    ) : (
                        currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))
                    )}
                </select>
            </div>
        </div>
    )
}

export default InputBox