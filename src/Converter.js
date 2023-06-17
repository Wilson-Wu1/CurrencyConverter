import {useState, useEffect} from 'react';
const Converter = () => {
    

    const apiKey = 'fef98ee2172a4cf69a4094252517be96';
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
    
    var savedRates = {};
    async function fetchCurrencyData() {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Currency data is available in the 'data' variable
            
            savedRates = data.rates;
            console.log(savedRates);
            // Process and use the currency data as needed
        })
        .catch(error => {
            console.log('Error:', error);
        });

    }

    var e = document.getElementById("SelectFrom");
    //var value = e.value;
    //var text = e.options[e.selectedIndex].text;



    return (  
        <div className = "converter">

            <h2 className = "header">Convert up to 10+ currencies!</h2>

            <div className = "converter_main_box">
                <button onClick =  {() => fetchCurrencyData()}>ClickMe</button>
                <label >Value:</label>
                <input type="text" id="value" name="value"></input>

                <select name="From" id="SelectFrom">
                    <option value ="none">Nothing</option>
                    <option value ="guava">USD</option>
                    <option value ="lychee">BTC</option>
                    <option value ="lychee">ETH</option>
                    <option value ="papaya">CAD</option>
                </select> 


                <select name="To" id="SelectTo">
                    <option value ="none">Nothing</option>
                    <option value ="guava">USD</option>
                    <option value ="lychee">BTC</option>
                    <option value ="lychee">ETH</option>
                    <option value ="papaya">CAD</option>
                </select> 
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