import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./App.css";

import Home from "./pages/home";
import Recharge from "./pages/recharge";
import Thanks from "./pages/thanks";
import History from "./pages/history";
import Templete from "./pages/templete";

const util = require("util");

export const TempleteContext = React.createContext({});

const initialTemplete = {
  topic: "Please enter topic"
};

function App({ children }) {
  const [templete, setTemplete] = useState(initialTemplete);

  const show = () => {
    console.log(
      util.inspect(templete, {
        showHidden: true,
        depth: null
      })
    );
  };

  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Navbar />
      <TempleteContext.Provider value={{ templete, setTemplete }}>
        <div onClick={show}>show</div>
        <Route exact path="/templete" component={Templete} />
      </TempleteContext.Provider>

      <Route exact path="/recharge" component={Recharge} />
      <Route exact path="/history" component={History} />
      <Route exact path="/thanks" component={Thanks} />
    </Router>
  );
}

export default App;
