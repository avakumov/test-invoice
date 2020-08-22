import React, { useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Buyer from "./comps/buyer/buyer";
import Buyers from "./comps/buyers/buyers";
import Terminals from "./comps/terminals/terminals";
import SideBar from "./comps/sidebar/sidebar";
import Login from "./comps/Login/login";
import Footer from "./comps/footer/footer";
import Header from "./comps/header/header";
import { history } from "./helpers/history";
import { buyers } from "./helpers/fakeData";
import NotFound from "./comps/not-found/not-found";

function App() {
  const [logged, setLogged] = useState(false);
  const [urlAvatar, setUrlAvatar] = useState("");

  const login = (name, password, urlAvatar) => {
    //server api request
    localStorage.setItem('user', name);
    setLogged(true);
    setUrlAvatar(urlAvatar)
  };
  const logout = () => {
    //server api request
    localStorage.removeItem('user');
    setLogged(false);
    setUrlAvatar("")
  };

  if (!localStorage.getItem('user')&&!logged) {
    return (
      <div className="container">
        <Login login={login} />
      </div>
    );
  }
  return (
    <div className="App">
      <Router history={history}>
        <Header logout={logout}/>

        <div className="container">
          <SideBar urlAvatar={urlAvatar} />

          <Switch>
            <Route exact path="/terminals" component={Terminals} />
            <Route
              exact
              path="/buyers"
              component={() => <Buyers buyers={buyers} />}
            />
            <Route
              exact
              path="/"
              component={() => <Buyers buyers={buyers} />}
            />
            <Route
              exact
              path="/buyers/:id"
              render={(props) => <Buyer {...props} buyers={buyers} />}
            />

            <Route exact path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
