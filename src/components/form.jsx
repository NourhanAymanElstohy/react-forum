import React, { Component } from "react";
import Input from "./input";
import Joi from 'joi-browser';

class Form extends Component {

  state = {
    employee: { name: "", phone: "", age: "" },
    errors: {}
  };

  schema = {
    name: Joi.string().required().label('Name'),
    phone: Joi.number().required().label('Phone'),
    age: Joi.number().required().label('Age'),
  };

  validate = () => {
    const options = { abortEarly: false };
    const {error} = Joi.validate(this.state.employee, this.schema, options);
    if (!error) return null;
    
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      return errors;
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("submitted");
  };

  validateProperty = ({ name, value }) => {
    
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const {error} = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMesage = this.validateProperty(input);

    if (errorMesage) errors[input.name] = errorMesage;
    else delete errors[input.name];

    const employee = { ...this.state.employee };
    employee[input.name] = input.value;

    this.setState({ employee, errors });

  }
    render() {
        const { employee, errors } = this.state;
    return (
      <div>
        <h1>Api Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            value={employee.name}
            onChange={this.handleChange}
            label="Name"
            error={errors.name}
          />
          <Input
            name="phone"
            value={employee.phone}
            onChange={this.handleChange}
            label=" Phone"
            error={errors.phone}
          />
          <Input
            name="age"
            value={employee.age}
            onChange={this.handleChange}
            label="Age"
            error={errors.age}
          />
          
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
