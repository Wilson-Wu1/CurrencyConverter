import {useState, useEffect} from 'react';
import { ReactComponent as RedCarotDown} from './images/caretDown.svg';
import { ReactComponent as GreenCarotUp} from './images/caretUp.svg';
const Historical = (props) => {
    
    const [cryptoPriceInCurrency, setCryptoPriceInCurrency] = useState(props.savedCryptoRates.map(obj => obj.current_price))
    const [currentCurrency, setCurrentCurrency] = useState("USD");
    const currencySymbols = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CDF","CHF","CLF","CLP","CNH","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STD","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPD"];
    

    // Get the selected currency, and display the cryptocurrencies denominated in that currency
    function changeDenominationCurrency(){
        var tempArray = [];
        var toCurrency = document.getElementById("historical_description_changeCurrency").value;
        
        if(props.savedRates.hasOwnProperty(toCurrency)){
            setCurrentCurrency(toCurrency);
            for(var i = 0; i < props.savedCryptoRates.length; i++){
                tempArray.push(props.savedCryptoRates[i].current_price * props.savedRates[toCurrency]);
            }
        }
        else{
            setCurrentCurrency(props.savedCryptoRates.find(coin => coin.id === toCurrency).symbol.toUpperCase());
            const desiredCoinPrice = props.savedCryptoRates.find(coin => coin.id === toCurrency).current_price;
            for(var j = 0; j < props.savedCryptoRates.length; j++){
                tempArray.push(props.savedCryptoRates[j].current_price / desiredCoinPrice);
            }
        }

        setCryptoPriceInCurrency(tempArray);
    }

    function convertNumberToLocaleString(val){
        const result = Number(val).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 5,
        });
        return result;
    }


    return (  
        <div className = "historical">
            <h2 className = "header">All Cryptocurrencies</h2>

            <div className = "historical_description">
                <h4 className = "historical_description_header">Denominated in: </h4>
                <select className = "historical_description_changeCurrency"  id="historical_description_changeCurrency" onChange={changeDenominationCurrency}>
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
            <div className = "historical_box">
                <div className = "historical_box_labels">
                    <label className = "converter_label_value">Coin</label>
                    <label className = "converter_label_value">Price</label>
                    <label className = "converter_label_from">24h</label>
                    <label className = "converter_label_to">30d</label>
                    
                </div>
                
                <div className = "historical_box_lists">
                    {Object.entries(props.savedCryptoRates).map(([key], index) => (      
                        <div className = "historical_box_lists_container">
                            <div className = "historical_box_lists_container_coin">{props.savedCryptoRates[key].name} 
                                <span className = "historical_box_lists_container_symbol">
                                     {props.savedCryptoRates[key].symbol.toUpperCase()}
                                </span>
                            </div>


                            <div className="historical_box_lists_container_price">
                                {convertNumberToLocaleString(cryptoPriceInCurrency[index])} {currentCurrency}
                            </div>

                            <div className="historical_box_lists_container_24h">
                                {props.savedCryptoRates[key].price_change_percentage_24h_in_currency < 0 ? 
                                (
                                    <span className="24h_negative_value" style={{color: '#ea3943'}}>
                                        <RedCarotDown style = {{width:"15px", height: "15px", marginRight: '4px'}}/>
                                        {(Math.abs(props.savedCryptoRates[key].price_change_percentage_24h_in_currency)).toFixed(2)}%
                                    </span>
                                ) : (
                                    <span className="24h_positive_value" style = {{color: '#16c784'}}>
                                        <GreenCarotUp style = {{width:"15px", height: "15px", marginRight: '4px'}}/>
                                        {(props.savedCryptoRates[key].price_change_percentage_24h_in_currency).toFixed(2)}%
                                    </span>
                                )
                                }
                            </div>

                            <div className="historical_box_lists_container_30d">
                                {props.savedCryptoRates[key].price_change_percentage_30d_in_currency < 0 ? 
                                (
                                    <span className="30d_negative_value" style={{color: '#ea3943'}}>
                                        <RedCarotDown style = {{width:"15px", height: "15px", marginRight: '4px'}}/>
                                        {(Math.abs(props.savedCryptoRates[key].price_change_percentage_30d_in_currency)).toFixed(2)}%
                                    </span>
                                ) : (
                                    <span className="30d_positive_value" style = {{color: '#16c784'}}>
                                        <GreenCarotUp style = {{width:"15px", height: "15px", marginRight: '4px'}}/>
                                        {(props.savedCryptoRates[key].price_change_percentage_30d_in_currency).toFixed(2)}%
                                    </span>
                                )
                                }
                            </div>
                        </div>
                    ))}
                     
                    
                </div>
            </div>
        </div>
    );
}
 
export default Historical;