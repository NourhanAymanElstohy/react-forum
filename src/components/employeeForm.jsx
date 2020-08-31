import React from "react";
import Joi from 'joi-browser';
import Form from "./form";
import axios from "axios";

const employeeApiEndPoint = "http://localhost/html/php/api_task/api/employee";
const departmentApiEndPoint = "http://localhost/html/php/api_task/api/department";

class EmployeeForm extends Form {
  state = {
    data: { name: "", phone: "", age: "", is_mgr:"", dept_id: "" },
    depts: [],
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    phone: Joi.number().required().label("Phone"),
    age: Joi.number().required().label("Age"),
    is_mgr: Joi.required().label("Is manager"),
    dept_id: Joi.number().required().label("Departments"),
  };

  async componentDidMount() {
    let { data: depts } = await axios.get(departmentApiEndPoint + "/read.php");
    depts = depts["data"];
    this.setState({ depts });

    const employeeId = this.props.match.params.id;
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
      dept_id: employee.dept_id,
      is_mgr: employee.is_mgr,
    };
  }

  async getEmployee(id) {
    let { data: employees } = await axios.get(
      employeeApiEndPoint + "/read.php"
    );
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
      is_mgr: this.state.data.is_mgr,
      dept_id: this.state.data.dept_id,
    };
    
    if (employeeId === "new") {
      axios.post(employeeApiEndPoint + "/create.php", body).then(() => {
        this.props.history.push("/employees");
      });
    } else {
      body.id = this.props.match.params.id;      
      await axios.put(employeeApiEndPoint + "/update.php", body).then(() => {
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
          {this.renderSelect("is_mgr", "Is Manager")}
          {this.renderSelect("dept_id", "Departments", this.state.depts)}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default EmployeeForm;
