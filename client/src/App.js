import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

import './App.css';

import Home from './pages/home';
import Recharge from './pages/recharge';
import History from './pages/history';
import Templete from './pages/templete'

function App() {
	return (
		<Router>
			<Route exact path="/" component={Home} />
			<Route exact path="/templete" component={Templete} />
			<Route exact path="/recharge" component={Recharge} />
			<Route exact path="/history" component={History} />
		</Router>
	);
}

export default App;
