import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Store from "./components/Store";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {


  return (
      <Router>
          <div className="App">
              <Nav/>
              <Switch>
                  <Route exact path="/" component={Store}/>
                  <Route path="/store" component={Store}/>
                  <Route path="/cart" component={Cart}/>
                  <Route path="/admin" component={Admin}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
