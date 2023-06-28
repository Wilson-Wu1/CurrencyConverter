import {useState, useEffect} from 'react';
import { ReactComponent as RedCarotDown} from './images/caretDown.svg';
import { ReactComponent as GreenCarotUp} from './images/caretUp.svg';
const Historical = (props) => {
    
    const [cryptoPriceInCurrency, setCryptoPriceInCurrency] = useState(props.savedCryptoRates.map(obj => obj.current_price))
    const currencySymbols = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CDF","CHF","CLF","CLP","CNH","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STD","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPD"];
    

    // Get the selected currency, and display the cryptocurrencies denominated in that currency
    function changeDenominationCurrency(){
        var tempArray = [];
        var toCurrency = document.getElementById("historical_description_changeCurrency").value;
        if(props.savedRates.hasOwnProperty(toCurrency)){
            for(var i = 0; i < props.savedCryptoRates.length; i++){
                tempArray.push(props.savedCryptoRates[i].current_price * props.savedRates[toCurrency]);
            }
        }
        else{
            const desiredCoinPrice = props.savedCryptoRates.find(coin => coin.id === toCurrency).current_price;
            for(var j = 0; j < props.savedCryptoRates.length; j++){
                tempArray.push(props.savedCryptoRates[j].current_price / desiredCoinPrice);
            }
        }
        setCryptoPriceInCurrency(tempArray);
    }

    // 
    function changeViewMobile() {
            var selectedView = document.getElementById("historical_description_changeView").value;
            var elementPriceLabel = document.getElementById("historical_box_labels_price");
            var element24hLabel = document.getElementById("historical_box_labels_24h");
            var element30dLabel = document.getElementById("historical_box_labels_30d");
            var elementPriceDiv = document.getElementsByClassName("historical_box_lists_container_price");
            var element24hDiv = document.getElementsByClassName("historical_box_lists_container_24h");
            var element30dDiv = document.getElementsByClassName("historical_box_lists_container_30d");
        
            if (selectedView === "Price") {
                elementPriceLabel.style.display = 'block';
                element24hLabel.style.display = 'none';
                element30dLabel.style.display = 'none';
            } else if (selectedView === "24h") {
                elementPriceLabel.style.display = 'none';
                element24hLabel.style.display = 'block';
                element30dLabel.style.display = 'none';
            } else {
                elementPriceLabel.style.display = 'none';
                element24hLabel.style.display = 'none';
                element30dLabel.style.display = 'block';
            }

            for (var i = 0; i < elementPriceDiv.length; i++) {
                if (selectedView === "Price") {
                    elementPriceDiv[i].style.display = 'block';
                    element24hDiv[i].style.display = 'none';
                    element30dDiv[i].style.display = 'none';
                } else if (selectedView === "24h") {
                    elementPriceDiv[i].style.display = 'none';
                    element24hDiv[i].style.display = 'block';
                    element30dDiv[i].style.display = 'none';
                } else {
                    elementPriceDiv[i].style.display = 'none';
                    element24hDiv[i].style.display = 'none';
                    element30dDiv[i].style.display = 'block';
                }
            }
      }

    function changeViewFull() {     
        var elementPriceLabel = document.getElementById("historical_box_labels_price");
        var element24hLabel = document.getElementById("historical_box_labels_24h");
        var element30dLabel = document.getElementById("historical_box_labels_30d");
        var elementPriceDiv = document.getElementsByClassName("historical_box_lists_container_price");
        var element24hDiv = document.getElementsByClassName("historical_box_lists_container_24h");
        var element30dDiv = document.getElementsByClassName("historical_box_lists_container_30d");
    
        elementPriceLabel.style.display = 'block';
        element24hLabel.style.display = 'block';
        element30dLabel.style.display = 'block';

        for (var i = 0; i < elementPriceDiv.length; i++) {
            elementPriceDiv[i].style.display = 'block';
            element24hDiv[i].style.display = 'block';
            element30dDiv[i].style.display = 'block';
        }
    }   

    function convertNumberToLocaleString(val){
        const result = Number(val).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 5,
        });
        return result;
    }

    useEffect(() => {
        function handleResize() {
          const screenWidth = window.innerWidth;
          const threshold = 992; // Set your desired threshold here
    
          if (screenWidth > threshold) {
            // Call your function here
            changeViewFull();
          }
          else{
            changeViewMobile();
          }
        }
    
        // Attach the event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);



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

                <select className = "historical_description_changeView"  id="historical_description_changeView" onChange={changeViewMobile}>
                        <option value ="Price">Price</option>
                        <option value ="24h">24h</option>
                        <option value ="30d">30d</option>
                </select> 
            </div>

            <div className = "historical_box">
                <div className = "historical_box_labels" id = "historical_box_labels">
                    <label className = "historical_box_labels_coin">Coin</label>
                    <label className = "historical_box_labels_price" value = "Price" id = "historical_box_labels_price">Price</label>
                    <label className = "historical_box_labels_24h" value = "24h" id = "historical_box_labels_24h">24h</label>
                    <label className = "historical_box_labels_30d" value = "30d" id = "historical_box_labels_30d">30d</label>
                    
                </div>
                
                <div className = "historical_box_lists">
                    {Object.entries(props.savedCryptoRates).map(([key], index) => (      
                        <div className = "historical_box_lists_container">
                            <div className = "historical_box_lists_container_coin">{props.savedCryptoRates[key].name} 
                                <span className = "historical_box_lists_container_symbol">
                                     {props.savedCryptoRates[key].symbol.toUpperCase()}
                                </span>
                            </div>


                            <div className="historical_box_lists_container_price" id = "historical_box_lists_container_price">
                                {convertNumberToLocaleString(cryptoPriceInCurrency[index])}
                            </div>

                            <div className="historical_box_lists_container_24h" id = "historical_box_lists_container_24h">
                                {props.savedCryptoRates[key].price_change_percentage_24h_in_currency < 0 ? 
                                (
                                    <span className="negative_value_24h" style={{color: '#ea3943'}}>
                                        <RedCarotDown className = "a24h_negative_value_icon" style = {{width:"15px", height: "15px", marginRight: '4px'}}/>
                                        {(Math.abs(props.savedCryptoRates[key].price_change_percentage_24h_in_currency)).toFixed(2)}%
                                    </span>
                                ) : (
                                    <span className="positive_value_24h" style = {{color: '#16c784'}}>
                                        <GreenCarotUp style = {{width:"15px", height: "15px", marginRight: '4px'}}/>
                                        {(props.savedCryptoRates[key].price_change_percentage_24h_in_currency).toFixed(2)}%
                                    </span>
                                )
                                }
                            </div>

                            <div className="historical_box_lists_container_30d" id = "historical_box_lists_container_30d">
                                {props.savedCryptoRates[key].price_change_percentage_30d_in_currency < 0 ? 
                                (
                                    <span className="negative_value_30d" style={{color: '#ea3943'}}>
                                        <RedCarotDown style = {{width:"15px", height: "15px", marginRight: '4px'}}/>
                                        {(Math.abs(props.savedCryptoRates[key].price_change_percentage_30d_in_currency)).toFixed(2)}%
                                    </span>
                                ) : (
                                    <span className="positive_valu_30d" style = {{color: '#16c784'}}>
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