import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter, BrowserRouter } from 'react-router-dom';
import TransforForm from './pages/index';
import '../common/common.css';

ReactDOM.render(
	<HashRouter>
		<Switch>
			<Route path="/upload" component={TransforForm} />
		</Switch>
	</HashRouter>,
	document.getElementById('app')
);
