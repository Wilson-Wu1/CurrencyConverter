import {useState, useEffect} from 'react';
import {ReactComponent as CopyIcon} from './images/copy.svg';
const Converter = (props) => {



    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrlCurrency = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
    const apiUrlCrypto = 'https://api.coingecko.com/api/v3';

    // Objects to save currency/crypto rates
    const [savedRates, setSavedRates] = useState(null);
    const [savedCryptoRates, setSavedCryptoRates] = useState(null);
    
    const currencySymbols = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CDF","CHF","CLF","CLP","CNH","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STD","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPD"];
 
    function convertNumberToLocaleString(val){
        const result = Number(val).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
        });
        return result;
    }

    // Vars to hold the current from and to currency type
    var fromValue = null;
    var toValue = null;

    // Holds value after conversion
    const [convertedValue, setConvertedValue] = useState(0);
    const [fromValueState , setFromValueState] = useState("");
    const [toValueState , setToValueState] = useState("");
    // Hold boolean value to display conversion rate 
    const [showConversionRate, setShowConversionRate] = useState(false);
    // Hold boolean value to display default exchange rate
    const [exchangeRate, setExchangeRate] = useState("");
    const [exchangeRateOpposite, setExchangeRateOpposite] = useState("");
    // Hold value to be converted
    const [valueToConvertState, setValueToConvertState] = useState(0);
    // Hold boolean value to display converter_result div
    const[invis, setInvis] = useState(true);
    // Hold boolean value to expand and unexpand converter container
    const [expanded, setExpanded] = useState(false);

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
                const desiredCoin = props.savedCryptoRates.find(coin => coin.id === fromValue);
                fromCurrency = desiredCoin.current_price;
                //fromCurrency = savedCryptoRates[fromValue].usd;
                fromIsCrypto = true;            
            }
            if(savedRates.hasOwnProperty(toValue)){
                toCurrency = savedRates[toValue];           
            }
            else{
                
                const desiredCoin = props.savedCryptoRates.find(coin => coin.id === toValue);
                toCurrency = desiredCoin.current_price;
                toIsCrypto = true;
            }

            // If `from` and `to` are same currency, then no need to convert
            if(fromValue === toValue){
                if(valueToConvert === ""){
                    setConvertedValue(0);
                }
                else{
                    setConvertedValue(valueToConvert);
                }
                setExchangeRate(1);
                setExchangeRateOpposite(1);
                setShowConversionRate(true);
                setExpanded(true);
                setInvis(false);
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
            setExpanded(true);
            setInvis(false);
            
            if(valueToConvert !== ""){

                setConvertedValue(convertNumberToLocaleString(valueToConvert * fromCurrencyInUsd * toCurrencyInUsd));
            }
            else{
                setConvertedValue(0);
                setValueToConvertState(0);
            }
        }
        else{
            setExpanded(false);
            setInvis(true);
        }
    }



    // Switch the from and to currency type
    function switchCurrencyTypes(){
        var tempCurrencyType =  document.getElementById("toCurrency").value;
        document.getElementById("toCurrency").value = document.getElementById("fromCurrency").value;
        document.getElementById("fromCurrency").value = tempCurrencyType;
        // Call to recalculate conversion rate if needed
        handleValueChange();
    }

    function copyToClipboard(){
        navigator.clipboard.writeText(convertedValue);
        var alertBox = document.getElementById('copy_alert');
        var alertText = document.getElementById('copy_alert_text');
        alertText.textContent = "'" + convertedValue + "' has been copied to clipboard";
        alertBox.style.opacity = '1';
  
        setTimeout(function() {
            alertBox.style.opacity = '0';
        }, 3000); 
    }



    // Function to run once at the beginning
    useEffect(() => {
        setSavedRates(props.savedRates);
        setSavedCryptoRates(props.savedCryptoRates);
        }, []
    );

    return (  
        <div className = "converter">
        <div id="copy_alert" className="copy_alert">
            <span id="copy_alert_text" className = "copy_alert_text"></span>
        </div>
            
            <h2 className = "header">Convert between fiat currencies and popular cryptocurrencies</h2>
            <div className={`converter_main_box ${expanded ? 'expanded' : ''}`}>
                <div className = "converter_container">

                    
                        <label className = "converter_container_value_label">Amount</label>
                        <input className = "converter_container_value_input" type="number" id="value" onChange={handleValueChange} ></input>
                    
                        <label className = "converter_container_from_label">From</label>
                        <select className = "converter_container_from_select" id="fromCurrency" onChange={handleValueChange}>
                        <option key = "null" value ="null">...</option>
                        <option key = "USD" value ="USD">USD</option>
                        <option key = "CAD" value ="CAD">CAD</option>
                        {Object.entries(props.savedCryptoRates).map(([key]) => (      
                            <option value={props.savedCryptoRates[key].id}>{props.savedCryptoRates[key].symbol.toUpperCase()}</option>
                        ))}
                        {currencySymbols.map((symbol) => (
                        <option value={symbol}>{symbol}</option>
                        ))}
                        </select> 

                        <label></label>
                        <button className = "converter_container_button_switch" onClick =  {switchCurrencyTypes}>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 19L3 16M3 16L6 13M3 16H11C12.6569 16 14 14.6569 14 13V12M10 12V11C10 9.34315 11.3431 8 13 8H21M21 8L18 11M21 8L18 5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    
                        <label className = "converter_container_to_label">To</label>
                        <select className = "converter_container_to_select"  id="toCurrency" onChange={handleValueChange}>
                        <option value ="null">...</option>
                        <option value ="USD">USD</option>
                        <option value ="CAD">CAD</option>
                        {Object.entries(props.savedCryptoRates).map(([key]) => (      
                            <option value={props.savedCryptoRates[key].id}>{props.savedCryptoRates[key].symbol.toUpperCase()}</option>
                        ))}
                        {currencySymbols.map((symbol) => (
                        <option value={symbol}>{symbol}</option>
                        ))}
                        </select> 
                    
                </div>
                
                <div className={`converter_result ${!expanded ? 'invisible' : ''}`}>
                    {setShowConversionRate && (
                        <div>
                            <h1 className = "converter_result_text_1">{valueToConvertState} {fromValueState} equals</h1>
                            <h1 id = "converter_result_text_2" className = "converter_result_text_2" onClick={copyToClipboard}>{convertedValue} {toValueState} </h1>
                            <button className = "converter_copy_button" onClick = {copyToClipboard} >
                                <CopyIcon className = "converter_copy_icon"/>
                            </button>
                            <h1 className = "converter_conversion_text1">1 {fromValueState} = {exchangeRate} {toValueState}</h1>
                            <h1 className = "converter_conversion_text2">1 {toValueState} = {exchangeRateOpposite} {fromValueState}</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    );

    
}
 
export default Converter;