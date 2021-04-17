import React, { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './components/Admin/Admin';
import OrderPage from './components/OrderPage/OrderPage';
import CheckOutPage from './components/CheckOutPage/CheckOutPage';
import HeaderBlack from './components/HeaderBlack/HeaderBlack';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <HeaderBlack></HeaderBlack>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/order">
            <OrderPage></OrderPage>
            </PrivateRoute>
          <PrivateRoute path="/checkout/:_id">
          <CheckOutPage></CheckOutPage>
          </PrivateRoute>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
