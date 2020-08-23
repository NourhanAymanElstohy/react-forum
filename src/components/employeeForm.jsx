import React from "react";
import Joi from 'joi-browser';
import Form from "./form";
import axios from "axios";

const apiEndPoint = "http://localhost/html/php/api_task/api";
class EmployeeForm extends Form {

  state = {
    data: { name: "", phone: "", age: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label('Name'),
    phone: Joi.number().required().label('Phone'),
    age: Joi.number().required().label('Age'),
  };

  componentDidMount() {
    this.state.employeeId = this.props.match.params.id;
    if (this.state.employeeId === "new") return;
  }
  
  doSubmit = ()=>{    
    var body = {
      name: this.state.data.name,
      phone: this.state.data.phone,
      age: this.state.data.age,
    };  
    
     axios.post(apiEndPoint + "/create.php",body).then(
      function (response) {
        if (response.data.message === "Employee added") {
          window.location.href = "/employees";
        }
      }
     );
    
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
