import {useState, useEffect} from 'react';

const Converter = () => {
    
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrlCurrency = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
    const apiUrlCrypto = 'https://api.coingecko.com/api/v3';

    // Objects to save currency/crypto rates
    const [savedRates, setSavedRates] = useState(null);
    const [savedCryptoRates, setSavedCryptoRates] = useState(null);
    
    
    // Get currency data from openexchangerates API
    async function fetchCurrencyData() {
        fetch(apiUrlCurrency)
        .then(response => response.json())
        .then(data => {
            // Save the data in savedRates object
            setSavedRates(data.rates);
            console.log(data.rates);
        })
        .catch(error => {
            console.log('Error:', error);
        });

    }

    // Get crypto data from CoinGecko API
    async function fetchCryptocurrencyData() {
        fetch(`${apiUrlCrypto}/simple/price?ids=matic-network%2Cbitcoin%2Cethereum%2Clitecoin%2Cbinancecoin%2Cbitcoin-cash%2Ctron%2Cripple%2Cstellar%2Cchainlink%2Cdogecoin%2Cpolkadot%2Carbitrum%2Cstaked-ether%2Clido-dao%2Ccardano%2Cpolygon&vs_currencies=usd`)
        .then (respone => respone.json())
        .then(data => {
            setSavedCryptoRates(data);
            console.log(data);
            
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }
    
    const currencySymbols = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CDF","CHF","CLF","CLP","CNH","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STD","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPD"];
    // Add currencies to the list of currency types
    function addCurrenciesToList(){
        // Get a reference to each select element
        var selectElementFrom = document.getElementById("fromCurrency");
        var selectElementTo = document.getElementById("toCurrency");
        // Loop through the object and create option elements
        for (let i = 0; i < currencySymbols.length; i++) {
                var newOption = document.createElement("option");
                newOption.value = currencySymbols[i];
                newOption.text = currencySymbols[i];
                selectElementFrom.appendChild(newOption);
                
                var newOption1 = document.createElement("option");
                newOption1.value = currencySymbols[i];
                newOption1.text = currencySymbols[i];
                selectElementTo.appendChild(newOption1);
        }
    }

    function convertNumberToLocaleString(val){
        const result = Number(val).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
        });

        return result;
    }

    // Function to run once at the beginning
    useEffect(() => {
        fetchCurrencyData();
        fetchCryptocurrencyData();
        addCurrenciesToList();
        }, []
    );

    // Vars to hold the current from and to currency type
    var fromValue = null;
    var toValue = null;

    // Holds value after conversion
    const [convertedValue, setConvertedValue] = useState(0);
    const [fromValueState , setFromValueState] = useState("");
    const [toValueState , setToValueState] = useState("");
    // Hold boolean value to display conversion rate 
    const [showConversionRate, setShowConversionRate] = useState(false);
    // Hold boolean value to display top result (valueToConvert + from currency)
    const [showResult1, setShowResult1] = useState(false);
    // Hold boolean value to display bottom result (convertedValue + to currency)
    const [showResult2, setShowResult2] = useState(false);
    // Hold boolean value to display default exchange rate
    const [exchangeRate, setExchangeRate] = useState("");
    const [exchangeRateOpposite, setExchangeRateOpposite] = useState("");
    // Hold value to be converted
    const [valueToConvertState, setValueToConvertState] = useState(0);

    // Get currency types and perform conversion calculation
    function handleValueChange(){
        // Get currency types
        fromValue = document.getElementById("fromCurrency").value;
        toValue =  document.getElementById("toCurrency").value;
    
        // Set the denomination for the value being converted 
        if(toValue !== "null"){
            var toCurrencySymbol = document.querySelector(`option[value="${toValue}"]`);
            setToValueState(toCurrencySymbol.textContent);
        }
        else{
            setToValueState("");
        }
        if(fromValue !== "null"){
            var fromCurrencySymbol = document.querySelector(`option[value="${fromValue}"]`);
            setFromValueState(fromCurrencySymbol.textContent);
        }
        else{
            setFromValueState("");
        }
        

        // Get value to convert
        const valueElement = document.getElementById('value');
        var valueToConvert = valueElement.value
        setValueToConvertState(convertNumberToLocaleString(valueElement.value));
        
        if(toValue !== "null"){
            setShowResult2(true);
        }
        else{
            setShowResult2(false);
        }
        // Convert if all three fields are filled
        if(fromValue !== "null" && toValue !== "null"){
            // Flags to check if a crypto is used
            var fromIsCrypto = false;
            var toIsCrypto = false;
            // Rate of the from and to currency
            var fromCurrency = undefined;
            var toCurrency = undefined;
            if(savedRates.hasOwnProperty(fromValue)){
                fromCurrency = savedRates[fromValue];              
            }
            else{
                fromCurrency = savedCryptoRates[fromValue].usd;
                fromIsCrypto = true;            
            }
            if(savedRates.hasOwnProperty(toValue)){
                toCurrency = savedRates[toValue];           
            }
            else{
                toCurrency = savedCryptoRates[toValue].usd;
                toIsCrypto = true;
            }

            // If `from` and `to` are same currency, then no need to convert
            if(fromValue === toValue){
                setConvertedValue(valueToConvert);
                setExchangeRate(1);
                setExchangeRateOpposite(1);
                setShowConversionRate(true);
                setShowResult1(true);
                setShowResult2(true);
                return;
            }
        
            var fromCurrencyInUsd = 0;
            if(fromIsCrypto){
                fromCurrencyInUsd = fromCurrency;
            }
            // If the first is a currency, then get the `from` denominated in USD
            else{
                fromCurrencyInUsd = 1/fromCurrency;
            }

            var toCurrencyInUsd = 0;
            if(toIsCrypto){
                // If the second is a crypto, then divide by USD
                toCurrencyInUsd = 1/toCurrency;
            }
            else{
                toCurrencyInUsd = toCurrency;
            }
            setExchangeRate(convertNumberToLocaleString(fromCurrencyInUsd * toCurrencyInUsd));
            
            if(toIsCrypto){
                setExchangeRateOpposite( convertNumberToLocaleString(fromCurrency * toCurrency));
            }
            else{
                setExchangeRateOpposite(convertNumberToLocaleString(1/(fromCurrencyInUsd * toCurrencyInUsd)));
            }
            
            setShowConversionRate(true);
            setShowResult1(true);


            if(valueToConvert !== ""){
                setConvertedValue(convertNumberToLocaleString(valueToConvert * fromCurrencyInUsd * toCurrencyInUsd));
            }
            else{
                setConvertedValue(0);
                setValueToConvertState(0);
            }
        }
        else{
            setShowResult1(false);
            setConvertedValue(0);
            setShowConversionRate(false);
            setValueToConvertState(0);
        }
        
    }

    // Switch the from and to currency type
    function switchCurrencyTypes(){
        var tempCurrencyType =  document.getElementById("toCurrency").value;
        document.getElementById("toCurrency").value = document.getElementById("fromCurrency").value;
        document.getElementById("fromCurrency").value = tempCurrencyType;
        // Call to recalculate conversion rate if possible
        handleValueChange();
    }

    return (  
        <div className = "converter">
            
            <h2 className = "header">Convert between fiat currencies and popular cryptocurrencies</h2>
            <div className = "converter_main_box">
                <div className = "converter_labels">
                    <label className = "converter_label_value">Amount</label>
                    <label className = "converter_label_from">From</label>
                    <label></label>
                    <label className = "converter_label_to">To</label>
                </div>
                <div className = "converter_inputs_box">

                    <input className = "converter_value_input" type="number" id="value" onChange={handleValueChange}></input>
                    
             
                    <select className = "converter_from_input" id="fromCurrency" onChange={handleValueChange}>
                        <option value ="null">...</option>
                        <option value ="USD">USD</option>
                        <option value ="CAD">CAD</option>
                        <option value ="bitcoin">BTC</option>
                        <option value ="ethereum">ETH</option>
                        <option value ="binancecoin">BNB</option>
                        <option value ="staked-ether">STETH</option>
                        <option value ="cardano">ADA</option>
                        <option value ="dogecoin">DOGE</option>
                        <option value ="tron">TRX</option>
                        <option value ="ripple">XRP</option>
                        <option value ="matic-network">MATIC</option>
                        <option value ="litecoin">LTC</option>
                        <option value ="bitcoin-cash">BCH</option>
                        <option value ="stellar">XLM</option>
                        <option value ="chainlink">LINK</option>
                        <option value ="polkadot">DOT</option>
                        <option value ="arbitrum">ARB</option>
                        <option value ="lido-dao">LIDO</option>
                    </select> 
                    <button className = "converter_switch_button" onClick =  {switchCurrencyTypes}>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19L3 16M3 16L6 13M3 16H11C12.6569 16 14 14.6569 14 13V12M10 12V11C10 9.34315 11.3431 8 13 8H21M21 8L18 11M21 8L18 5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <select className = "converter_to_input"  id="toCurrency" onChange={handleValueChange}>
                    <option value ="null">...</option>
                        <option value ="USD">USD</option>
                        <option value ="CAD">CAD</option>
                        <option value ="bitcoin">BTC</option>
                        <option value ="ethereum">ETH</option>
                        <option value ="binancecoin">BNB</option>
                        <option value ="staked-ether">STETH</option>
                        <option value ="cardano">ADA</option>
                        <option value ="dogecoin">DOGE</option>
                        <option value ="tron">TRX</option>
                        <option value ="ripple">XRP</option>
                        <option value ="matic-network">MATIC</option>
                        <option value ="litecoin">LTC</option>
                        <option value ="bitcoin-cash">BCH</option>
                        <option value ="stellar">XLM</option>
                        <option value ="chainlink">LINK</option>
                        <option value ="polkadot">DOT</option>
                        <option value ="arbitrum">ARB</option>
                        <option value ="lido-dao">LIDO</option>
                    </select> 
                </div>
                
                
                <div className = "converter_result">
                    {showResult1 && (<h1 className = "converter_result_text_1">{valueToConvertState} {fromValueState} equals</h1>)}
                    {showResult2 && (<h1 className = "converter_result_text_2">{convertedValue} {toValueState}</h1>)}
                    {showConversionRate && (<h1 className = "converter_conversion_text1">1 {fromValueState} = {exchangeRate} {toValueState}</h1>)}
                    {showConversionRate && (<h1 className = "converter_conversion_text2">1 {toValueState} = {exchangeRateOpposite} {fromValueState}</h1>)}
                </div>
            </div>

        </div>
        
    );

    
}
 
export default Converter;