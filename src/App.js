import './App.css';
import Error from './components/Error';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/HomePage/Home';
import Message from './components/Message/Message';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/message/:dId">
            <Message />
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
