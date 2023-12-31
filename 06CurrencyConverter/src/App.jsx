import { useState } from "react";
import InputBox from "./components/InputBox"
import useCurrencyInfo from "./hooks/useCurrencyInfo";
function App() {
  
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("bdt")
  const [convertedAmount, setConvertedAmount] = useState(0)


  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
      <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
              backgroundImage: `url('https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          }}
      >
          <div className="w-full">
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                      }}
                  >
                      <div className="w-full mb-1">
                          <InputBox
                              label="From"
                              currencyOptions={options}
                              selectCurrency={from}
                              amount={amount}
                              onAmountChange={(newAmount) => {
                                if(newAmount<0) return;
                                setAmount(newAmount)
                              }}
                              onCurrencyChange={(newCurrency) => {
                                setFrom(newCurrency)
                                console.log(from)
                                // currencyInfo = useCurrencyInfo(from)
                              }}
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-700"
                              onClick={swap}
                          >
                              swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <InputBox
                              label="To"
                              currencyOptions={options}
                              amountDisable
                              selectCurrency={to}
                              amount={convertedAmount}
                              onCurrencyChange={(nCurrency) => {
                                setTo(nCurrency)
                                // convert(amount, nCurrency)
                              }
                              }
                          />
                      </div>
                      <button 
                      type="submit" 
                      onClick={convert}
                      className="w-full bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 rounded-lg"
                      >
                          Convert {from.toUpperCase()} to {to.toUpperCase()}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default App
