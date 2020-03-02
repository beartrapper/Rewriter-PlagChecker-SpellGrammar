import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
