//import {useState, useEffect} from 'react';
const Historical = (props) => {
    

    return (  
        <div className = "historical">
            <h2 className = "header">All Crypto Currencies</h2>
            
            <div className = "historical_box">
                <div className = "historical_box_labels">
                    <label className = "converter_label_value">Coin</label>
                    <label className = "converter_label_value">Price</label>
                    <label className = "converter_label_from">24h</label>
                    <label className = "converter_label_to">30d</label>
                </div>
                <div className = "historical_box_lists">
                    <div className="historical_box_lists_crypto">
                        {Object.entries(props.savedCryptoRates).map(([key]) => (      
                            <div className = "historical_box_lists_coin">{props.savedCryptoRates[key].name} {props.savedCryptoRates[key].symbol.toUpperCase()}</div>
                        ))}
                    </div>

                    <div className="historical_box_lists_price">
                        {Object.entries(props.savedCryptoRates).map(([key]) => (      
                            <div className = "historical_box_lists_coin">${props.savedCryptoRates[key].current_price}</div>
                        ))}
                    </div>
                    
                    <div className="historical_box_lists_24">
                        {Object.entries(props.savedCryptoRates).map(([key]) => (      
                            <div className = "historical_box_lists_coin">{(props.savedCryptoRates[key].price_change_percentage_24h_in_currency).toFixed(2)}%</div>
                        ))}
                    </div>
                    
                    <div className="historical_box_lists_month">
                        {Object.entries(props.savedCryptoRates).map(([key]) => (      
                            <div className = "historical_box_lists_coin">{(props.savedCryptoRates[key].price_change_percentage_30d_in_currency).toFixed(2)}%</div>
                        ))}
                    </div>
                    
                </div>
            
            </div>

        </div>
    );
}
 
export default Historical;