import {useState, useEffect} from 'react';
const Converter = () => {
    
    const apiKey = 'fef98ee2172a4cf69a4094252517be96';
    const apiUrlCurrency = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
    // Base URL for CoinGecko API
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
            
        })
        .catch(error => {
            console.log('Error:', error);
        });

    }
    // Get crypto data from CoinGecko API
    async function fetchCryptocurrencyData() {
        fetch(`${apiUrlCrypto}/simple/price?ids=ethereum%2Cbitcoin&vs_currencies=usd`)
        .then (respone => respone.json())
        .then(data => {
            setSavedCryptoRates(data);
            
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }
            
    // Function to run once at the beginning
    useEffect(() => {
        fetchCurrencyData();
        fetchCryptocurrencyData();
        console.log(savedCryptoRates);
        console.log(savedRates);
        }, []
    );


    // Vars to hold the current from and to currency type
    var fromValue = null;
    var toValue = null;
    const [convertedValue, setConvertedValue] = useState(0);

    function handleValueChange(){

        // Get currency types
        toValue =  document.getElementById("toCurrency").value;
        fromValue =  document.getElementById("fromCurrency").value;

        // Get value to convert
        const valueElement = document.getElementById('value');
        var valueToConvert = valueElement.value;
        
        // Convert if all three fields are filled
        if(fromValue != "null" && toValue != "null" && valueToConvert != ""){
            
            // Flags to check if a crypto is used.
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
            if(fromValue == toValue){
                setConvertedValue(valueToConvert);
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
            //console.log(fromCurrency, toCurrency)
            setConvertedValue(valueToConvert * fromCurrencyInUsd * toCurrencyInUsd);
        }
        else{
            setConvertedValue(0);
        }
    }

    return (  
        <div className = "converter">

            <h2 className = "header">Convert up to 10+ currencies!</h2>

            <div className = "converter_main_box">
                
                <label >Value:</label>
                <input type="number" id="value" onChange={handleValueChange}></input>

                <select id="fromCurrency" onChange={handleValueChange}>
                    <option value ="null">...</option>
                    <option value ="USD">USD</option>
                    <option value ="bitcoin">BTC</option>
                    <option value ="ethereum">ETH</option>
                    <option value ="CAD">CAD</option>
                </select> 


                <select id="toCurrency" onChange={handleValueChange}>
                <option value ="null">...</option>
                    <option value ="USD">USD</option>
                    <option value ="bitcoin">BTC</option>
                    <option value ="ethereum">ETH</option>
                    <option value ="CAD">CAD</option>
                </select> 

                <h1 id="result">{convertedValue}</h1>
            
            </div>




            <div className = "converter_data_boxs">
                <div className = "converter_data_box_left">

                </div>
                <div className = "converter_data_box_right">

                </div>
            </div>
        </div>
        
    );

    
}
 
export default Converter;