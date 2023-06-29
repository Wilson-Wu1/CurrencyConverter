import { ReactComponent as CurrencySymbol } from './images/currencySymbol.svg';
const Navbar = () => {
    return ( 
        <nav className="navbar">
            
            <CurrencySymbol className = "navbar_currency_symbol"/>
            <h1>Coin Convert</h1>
            <div className = "links">
                <a href="/">Home</a>
                
            </div>
        </nav>
    );
}
 
export default Navbar;