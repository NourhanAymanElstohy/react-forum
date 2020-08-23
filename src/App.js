import React, { Component } from 'react';
import './App.css';
import Table from './components/table';
import { Route, Switch, Redirect } from "react-router-dom";
import Form from './components/employeeForm';

class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <Switch>
          <Route path="/employees" component={Table} />
          <Route path="/form" component={Form}/>
          <Redirect from="/" exact to="/employees" />
      </Switch>
      </React.Fragment>
    );
  }
}
 
export default App;