import './App.css';
import Panel from './Components/Panel';
import Auth from './Components/Auth/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Panel />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
