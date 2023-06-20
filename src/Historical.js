import {useState, useEffect} from 'react';
const Historical = (histProp) => {
    
    const [histData, setHistData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [histCryptoData, setHistCryptoData] = useState(null);
    const [currentCryptoData, setCurrentCryptoData] = useState(null);
    

    const currencySymbols = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CDF","CHF","CLF","CLP","CNH","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STD","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPD"];
    const rates24Hr = [];
    async function calculate24HrRates(){

        for (let key in histProp.savedRates) {
            
            if (histProp.savedRates.hasOwnProperty(key)) {
                const value = histProp.savedRates[key];
                const histValue = histProp.historicalData[key];
                console.log( value, histValue, 100 * ((value/histValue) - 1));
                rates24Hr.push(100 * ((value/histValue) - 1));
            }
          }
    }
    
    useEffect(() => {
        setHistData(histProp.historicalData);
        setCurrentData(histProp.savedRates);
        setCurrentCryptoData(histProp.savedCryptoRates);
        calculate24HrRates();
        
    }, []);

    return (  
        <div className = "historical">
            <h2 className = "header">All Currencies</h2>
            
            <div className = "historical_box">
                <div className = "historical_box_labels">
                    <label className = "converter_label_value">Currency</label>
                    <label className = "converter_label_from">24hr</label>
                    <label className = "converter_label_to">Monthly</label>
                </div>
                <div className = "historical_box_lists">
                <ul className="historical_box_lists_coin">
                    {currencySymbols.map((symbol) => (
                    <li>{symbol}</li>
                    ))}
                </ul>
                    
                    <ul className="historical_box_lists_24">
                        {rates24Hr.map((symbol) => (
                        <li>{symbol}</li>
                        ))}
                    </ul>
                    
                    <ul className="historical_box_lists_month">
                        
                    </ul>
                </div>
            
            </div>

        </div>
    );
}
 
export default Historical;