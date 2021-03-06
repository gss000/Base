import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Route, 
  Switch, 
  HashRouter, 
  BrowserRouter, 
} from 'react-router-dom';
import Main from './pages/Main/main';
import Hello from './pages/Hello/hello';
import '../common/common.css';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path='/main' component={Main}/>
      <Route path='/hello' component={Hello}/>
    </Switch>
  </HashRouter>, document.getElementById('app')
);