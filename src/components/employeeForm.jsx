import React from "react";
import Joi from 'joi-browser';
import Form from "./form";
import axios from "axios";

const apiEndPoint = "http://localhost/html/php/api_task/api";
class EmployeeForm extends Form {
  state = {
    data: { name: "", phone: "", age: "" },
    errors: {},
    // emmployeeId:""
  };

  schema = {
    name: Joi.string().required().label("Name"),
    phone: Joi.number().required().label("Phone"),
    age: Joi.number().required().label("Age"),
  };

  componentDidMount() {
    const employeeId = this.props.match.params.id;
    if (employeeId === "new") return;

    // const employee = await this.getEmployee(employeeId);    
    // this.setState({ data: this.mapToViewModel(employee) });
  }
  mapToViewModel(employee) {
    return {
      id: employee.id,
      name: employee.name,
      phone: employee.phone,
      age: employee.age,
    };
  }

  // async getEmployee(id) {
  //   let { data: employees } = await axios.get(apiEndPoint + "/read.php");
  //   employees = employees["data"];
  //   let employee = employees.find((emp) => emp.id === id) || {};

  //   return employee;
  // }
  // async saveEmployee(employee) {
  //   let { data: employees } = await axios.get(apiEndPoint + "/read.php");
  //   employees = employees["data"];
  //   let empDB = employees.find((emp) => emp.id === employee.id) || {};

  //   empDB.name = employee.name;
  //   empDB.phone = employee.phone;
  //   empDB.age = employee.age;

  //   if (!empDB.id) {
  //     const body = {
  //       name: empDB.name,
  //       phone: empDB.phone,
  //       age: empDB.age,
  //     };
  //     // console.log(empDB);      
  //     if(body['age']!=null){
  //       const { status } = await axios.post(apiEndPoint + "/create.php", body);        
  //       if (status === 200) return empDB;
  //       else return null;
  //     }
  //     else return null
  //   }
  //   else return null;
  // }
  doSubmit = async () => {
    let body = {
      name: this.state.data.name,
      phone: this.state.data.phone,
      age: this.state.data.age,
    }; 
    axios.post(apiEndPoint + "/create.php", body).then(() => {
      this.props.history.push("/employees");        
      });                
  };

  render() {
    return (
      <div>
        <h1>Api EmployeeForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("age", "Age")}
          <button disabled={this.validate()} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeeForm;
