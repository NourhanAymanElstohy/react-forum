import React, { Component } from 'react';
import './App.css';
import Employees from './components/employees';
import { Route, Switch, Redirect } from "react-router-dom";
import EmployeeForm from './components/employeeForm';

class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <Switch>
          <Route path="/employees" component={Employees} />
          <Route path="/employees/new" component={EmployeeForm}/>
          <Redirect from="/" exact to="/employees" />
      </Switch>
      </React.Fragment>
    );
  }
}
 
export default App;