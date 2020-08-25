import React from "react";
import Joi from 'joi-browser';
import Form from "./form";
import axios from "axios"

const apiEndPoint = "http://localhost/html/php/api_task/api";
class EmployeeForm extends Form {
  state = {
    data: { name: "", phone: "", age: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    phone: Joi.number().required().label("Phone"),
    age: Joi.number().required().label("Age"),
  };

  async componentDidMount() {
    const employeeId = this.props.match.params.id;
    console.log(employeeId);
    
    if (employeeId === "new") return;
    else {
      const employee = await this.getEmployee(employeeId);
      this.setState({ data: this.mapToViewModel(employee) });
    }
  }
  mapToViewModel(employee) {
    return {
      name: employee.name,
      phone: employee.phone,
      age: employee.age,
    };
  }

  async getEmployee(id) {
    let { data: employees } = await axios.get(apiEndPoint + "/read.php");
    employees = employees["data"];
    let employee = employees.find((emp) => emp.id === id) || {};

    return employee;
  }

  doSubmit = async () => {
    const employeeId = this.props.match.params.id;
    let body = {
        name: this.state.data.name,
        phone: this.state.data.phone,
        age: this.state.data.age,
    };
    if (employeeId === "new")
    {
      axios.post(apiEndPoint + "/create.php", body).then(() => {
        this.props.history.push("/employees");
      });
    }
    else {
      body.id = this.props.match.params.id;
      await axios.put(apiEndPoint + "/update.php", body).then(() => {
        this.props.history.push("/employees");
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Api EmployeeForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("age", "Age")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default EmployeeForm;
