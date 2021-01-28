import logo from './logo.svg';
import './App.css';
import Panel from './Components/Panel';
import Auth from './Components/Auth/Auth';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Auth />
          <Panel />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
