import React, { useState} from 'react';
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
		topic: 'default/topic',
		ann: 'default'
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
				<div id="showState" style={{ backgroundColor: 'orange', fontWeight: '900', color: 'green', textAlign: 'right', position: 'fixed',top: 0, height: '100%',zIndex: 999 }}  onClick={showStae}>
					
					<p style={{color: 'orange'}}>
						hola
					</p>
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
