import { Suspense } from 'react';
import './App.css';
import Routes from './Components/Routes';
import all_routes from './routing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  // check if logged in

  const routing = all_routes.map((route, index) => {
    return (route.component) ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={props => (
          <route.component {...props} />
        )}
      />
    ) : (null)
  })

  return (
    <div className="App">
      {/* old routing */}
      {/* <Routes /> */}

      {/* new routing */}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routing}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
