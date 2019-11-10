import React from "react";
import { Provider } from "react-redux";

import { Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import history from "../../history";
import Home from "../Home-page";
import Checkout from "../Checkout-page";
import Register from "../Register";
import Login from "../Login";
import MyOrders from "../MyOrders";
import NotFoundPage from "../NotFoundPage";
import Copyright from "../Copyright";

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/myorders" exact component={MyOrders} />
            <Route component={NotFoundPage} />
          </Switch>
          <Copyright />
        </div>
      </Router>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
