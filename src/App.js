import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";
import LandingPage from "./Components/LandingPage/LandingPage";
import PlagiarismChecker from "./Components/PlagiarismChecker/PlagiarismChecker";
import SpellingAndGrammar from "./Components/SpellingAndGrammar/SpellingAndGrammar";
import Rewiter from "./Components/Rewriter/Rewriter";
import Example from "./Components/Checkout/Checkout";
import CheckoutProfile from "./Components/Checkout/CheckoutProfile";
import Upgrade from "./Components/Upgrade/Upgrade";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/home" component={Home} exact />
          <Route path="/plagiarism" component={PlagiarismChecker} exact />
          <Route path="/spelling" component={SpellingAndGrammar} exact />
          <Route path="/rewriter" component={Rewiter} exact />
          <Route path="/signin" component={SignIn} />
          <Route path="/" component={LandingPage} exact />
          <Route path="/checkout" component={Example} exact />
          <Route path="/upgrade" component={Upgrade} exact />
          <Route path="/checkout/profile" component={CheckoutProfile} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;
