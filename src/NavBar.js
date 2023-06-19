import { ReactComponent as CurrencySymbol } from './images/asdf.svg';
const Navbar = () => {
    return ( 
        <nav className="navbar">
            
            <CurrencySymbol className = "navbar_currency_symbol"/>
            <h1>CurrencyCoverter</h1>
            <div className = "links">
                <a href="/">Home</a>
                
            </div>
        </nav>
    );
}
 
export default Navbar;