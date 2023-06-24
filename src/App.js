import './App.css';
import Converter from './Converter';
import Navbar from './NavBar';
import Bottom from './Bottom';
import Historical from './Historical';
import { useState, useEffect} from 'react';

function App() {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const day = String(currentDate.getDate()-1).padStart(2, '0');
   const date = `${year}-${month}-${day}`;
 

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrlHistorical = `https://openexchangerates.org/api/historical/${date}.json?app_id=${apiKey}`;
  const apiUrlCurrency = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
  const apiUrlCrypto = 'https://api.coingecko.com/api/v3';

  // Objects to save currency/crypto rates
  const [hist, setHist] = useState(null);
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

    // Get historical currency data from openexchangerates API
    async function getHistoricalPrice() {
        fetch(apiUrlHistorical)
        .then(response => response.json())
        .then(data => {
            // Access the historical currency data from the 'data' object
            setHist(data.rates);
            //console.log(hist);
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }

    // Get crypto data from CoinGecko API
    async function fetchHistoricalCryptocurrencyData() {
        fetch(`${apiUrlCrypto}/coins/markets?vs_currency=usd&ids=matic-network%2Cbitcoin%2Cethereum%2Clitecoin%2Cbinancecoin%2Cbitcoin-cash%2Ctron%2Cripple%2Cstellar%2Cchainlink%2Cdogecoin%2Cpolkadot%2Carbitrum%2Cstaked-ether%2Clido-dao%2Ccardano&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C30d&locale=en`)
        .then (respone => respone.json())
        .then(data => {
            setSavedCryptoRates(data);
            console.log(data);
        })
        .catch(error => {
            console.log('Error:', error);
        });

    }


  // Function to run once at the beginning
  useEffect(() => {
      fetchCurrencyData();
      //fetchCryptocurrencyData();
      getHistoricalPrice();
      fetchHistoricalCryptocurrencyData();
      }, []
  );


  return (
    <div className="app">
      <Navbar/>
      {savedRates && savedCryptoRates && <Converter savedRates = {savedRates} savedCryptoRates = {savedCryptoRates}/>}
      {hist && savedRates && savedCryptoRates && <Historical historicalData = {hist} savedRates = {savedRates} savedCryptoRates = {savedCryptoRates}/>}
      <Bottom/>
    </div>
  );
}

export default App;
