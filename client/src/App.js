import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Calender from "./Calender";
import About from "./About";
import Navbar from "./Navbar";

function App() {
  const [message, setMessage] = React.useState("no message");
  React.useEffect(() => {
    fetch("/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((e) => console.log("got error"));
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/calender">
              <Calender />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
