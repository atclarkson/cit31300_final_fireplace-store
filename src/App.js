import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Store from "./components/Store";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {

    let cart = [];

    const updateCart = (value) => {
      cart.push(value);
    };

    const emptyCart = () => {
        cart = [];
    };


  return (
      <Router>
          <div className="App">
              <Nav cart={cart}/>
              <Switch>
                  <Route exact path="/" render={() => <Store updateCart={updateCart}/>}/>
                  <Route path="/store" render={() => <Store updateCart={updateCart}/>}/>
                  <Route path="/cart" render={() => <Cart cart={cart} emptyCart={()=>emptyCart()}/>} />
                  <Route path="/admin" component={Admin}/>
              </Switch>

          </div>
      </Router>
  );
}

export default App;
