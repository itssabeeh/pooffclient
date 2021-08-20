import './App.css';
import Login from './components/Login';
import Error from './components/Error';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
