import React, { Component } from "react";
import Input from "./input";
import Joi from 'joi-browser';
import Form from "./form";

class EmployeeForm extends Form {

  state = {
    data: { name: "", phone: "", age: "" },
    errors: {}
  };

  schema = {
    name: Joi.string().required().label('Name'),
    phone: Joi.number().required().label('Phone'),
    age: Joi.number().required().label('Age'),
  };

  componentDidMount() {
    const employeeId = this.props.match.params.id;
    if (employeeId === "new") return;
  }
  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    
    return (
      <div>
        <h1>Api EmployeeForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderInput('phone', 'Phone')}
          {this.renderInput('age', 'Age')}
          {this.renderButton('Submit')}
        </form>
      </div>
    );
  }

}

export default EmployeeForm;
