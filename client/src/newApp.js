import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';

import './App.css';

import Home from './pages/home';
import Recharge from './pages/recharge';
import History from './pages/history';
import Templete from './pages/templete';

const util = require('util');

export const TempleteContext = React.createContext({});

function App({ children }) {
	const initialTemplete = 
		'Please enter topic'
	;

	const [ templete, setTemplete ] = useState(initialTemplete);

	const showStae = (params) => {
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

			<TempleteContext.Provider value={{ templete, setTemplete }}>
				<div onClick={showStae}>Show </div>

				<Route exact path="/templete" component={Templete} />
			</TempleteContext.Provider>

			<Route exact path="/recharge" component={Recharge} />
			<Route exact path="/history" component={History} />
		</Router>
	);
}

export default App;
