import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "./App.css";

import Home from "./pages/home";
import Recharge from "./pages/recharge";
import Thanks from "./pages/thanks";
import History from "./pages/history";
import Templete from "./pages/templete";

const util = require("util");

export const TemplateContext = React.createContext();
// export const ChannelContext = React.createContext();

const App = () => {
	const [ temp, setTemp ] = useState({
		topic: 'Enter your own topic',
		ann: ''
	});

	const showStae = (params) => {
		console.log(
			util.inspect(temp, {
				showHidden: true,
				depth: null
			})
		);
	};

	return (
		<Router>
			<TemplateContext.Provider value={{ temp, setTemp }}>
				<div id="showState" style={{ backgroundColor: 'orange' }} onClick={showStae}>
					Show State
				</div>
				<Route exact path="/" component={Home} />

				<Route exact path="/templete" component={Templete} />
			</TemplateContext.Provider>
			<Route exact path="/recharge" component={Recharge} />
			<Route exact path="/history" component={History} />
		</Router>
	);
};

export default App;
