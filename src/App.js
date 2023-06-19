import './App.css';
import Converter from './Converter';
import Navbar from './NavBar';
import Bottom from './Bottom';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Converter/>
      <Bottom/>
    </div>
  );
}

export default App;
