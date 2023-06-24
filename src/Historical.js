import {useState, useEffect} from 'react';
import { ReactComponent as RedCarotDown} from './images/caretDown.svg';
import { ReactComponent as GreenCarotUp} from './images/caretUp.svg';
const Historical = (props) => {
    
    const [cryptoPriceInCurrency,setCryptoPriceInCurrency] = useState([[props.savedCryptoRates]])

    function test(){
        var tempArray = [];
        for(var i = 0; i < props.savedCryptoRates.length; i++){
            tempArray.push(props.savedCryptoRates[i]);
        }

        setCryptoPriceInCurrency(tempArray);
    }

    

    useEffect(() => {
        test();
        
    },[]);


    return (  
        <div className = "historical">
            <h2 className = "header">All Cryptocurrencies</h2>
            
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
                            <div className = "historical_box_lists_container_coin">{props.savedCryptoRates[key].name}</div>


                            <div className="historical_box_lists_container_price">
                                ${cryptoPriceInCurrency[index].currentPrice}
                            </div>


                            <div className = "historical_box_lists_container_24h">{((props.savedCryptoRates[key].price_change_percentage_24h_in_currency).toFixed(2))}%</div>
                            
                            <div className="historical_box_lists_container_30d">
                                {props.savedCryptoRates[key].price_change_percentage_30d_in_currency < 0 ? 
                                (
                                    <span className="30d_negative_value" style={{color: '#ea3943'}}>
                                        <RedCarotDown style = {{width:"15px", height: "15px"}}/>
                                        {(Math.abs(props.savedCryptoRates[key].price_change_percentage_30d_in_currency)).toFixed(2)}%
                                    </span>
                                ) : (
                                    <span className="30d_positive_value" style = {{color: '#16c784'}}>
                                        <GreenCarotUp style = {{width:"15px", height: "15px"}}/>
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