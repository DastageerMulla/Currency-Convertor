import { useState } from 'react'
import InputBox from './Components/InputBox.jsx';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import './App.css'

function App() {
  
  // STATE MANAGEMENT
  // ================
  
  // Store amount as string to prevent leading zero issues and allow empty input
  const [amount, setAmount] = useState("")
  
  // Source currency (the currency we're converting FROM)
  const [from, setFrom] = useState("usd")
  
  // Target currency (the currency we're converting TO)
  const [to, setTo] = useState("inr")
  
  // Converted amount stored as number for proper calculations
  const [convertedAmount, setConvertedAmount] = useState(0)

  // CUSTOM HOOK FOR CURRENCY DATA
  // =============================
  
  // Fetch live exchange rates for the source currency
  const currencyInfo = useCurrencyInfo(from)
  
  // Extract available currency options from API response
  // Add null check to prevent errors if API data isn't loaded yet
  const options = currencyInfo ? Object.keys(currencyInfo) : []

  // SWAP FUNCTIONALITY
  // ==================
  
  const swap = () => {
    // Swap source and target currencies
    setFrom(to)
    setTo(from)
    
    // Swap the amount values between input fields
    // Handle empty amount case by setting to 0 for calculations
    setConvertedAmount(amount === "" ? 0 : Number(amount))
    
    // Convert the calculated amount back to string for display in input field
    setAmount(convertedAmount === 0 ? "" : convertedAmount.toString())
  }

  // CURRENCY CONVERSION FUNCTION
  // ============================
  
  const convert = () => {
    // Prevent conversion if input is empty or zero
    if (amount === "" || amount === "0") {
      setConvertedAmount(0)
      return
    }
    
    // Convert string input to number for mathematical operations
    const numAmount = Number(amount)
    
    // Perform conversion only if currency data is available
    if (currencyInfo && currencyInfo[to]) {
      // Calculate converted amount and format to 2 decimal places
      setConvertedAmount(parseFloat((numAmount * currencyInfo[to]).toFixed(2)))
    }
  }

  // UI RENDER
  // =========
  
  return (
    // Main container with background image
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/finance-background-lmbrnieyixwr61g9.jpg')`,
        filter: 'blur(0.5px)',
      }}
    >
      {/* Centered content wrapper */}
      <div className="w-full">

         {/* HEADER SECTION */}
        <div className="text-center mb-8">
          <h1 className="text-rose-500 text-4xl font-bold mb-2 drop-shadow-lg">
            💱 Currency Converter
          </h1>
          <p className="text-amber-400 font-semibold text-lg max-w-2xl mx-auto drop-shadow-md">
            Convert any currency in real-time with live exchange rates
          </p>
        </div>

        {/* Currency converter card with glassmorphism effect */}
        <div className="w-full max-w-md mx-auto border border-gray-60 p-5 rounded-lg bg-white/30 backdrop-blur-sm">
          
          {/* Form wrapper that handles conversion on submit */}
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent page refresh
              convert()           // Trigger conversion calculation
            }}
          >
            
            {/* FROM CURRENCY INPUT SECTION */}
            {/* =========================== */}
            <div className="w-full mb-1">
              <InputBox 
                label="From"                    // Section label
                amount={amount}                 // Current amount value (as string)
                currencyOptions={options}       // Available currencies from API
                onCurrencyChange={setFrom}      // Update source currency when changed
                selectCurrency={from}           // Currently selected source currency
                onAmountChange={setAmount}      // Update amount when user types
              />
            </div>

            {/* SWAP BUTTON SECTION */}
            {/* =================== */}
            <div className="relative w-full h-0.5">
              <button
                type="button"                   // Prevent form submission
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={swap}                  // Trigger swap function
              >
                swap                            
              </button>
            </div>

            {/* TO CURRENCY INPUT SECTION */}
            {/* ========================= */}
            <div className="w-full mt-1 mb-4">
              <InputBox 
                label="To"                      // Section label
                amount={convertedAmount}        // Calculated converted amount
                currencyOptions={options}       // Available currencies from API
                onCurrencyChange={setTo}        // Update target currency when changed
                selectCurrency={to}             // Currently selected target currency
                amountDisable                   // Disable input - this is read-only
              />
            </div>

            {/* CONVERSION BUTTON */}
            {/* ================= */}
            <button
              type="submit"                     // Submit button for the form
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700"
            >
              {/* Display conversion direction with formatted currency codes */}
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App