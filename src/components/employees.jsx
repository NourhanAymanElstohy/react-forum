import React, { Component } from 'react';
import axios from "axios";
import {  Link } from 'react-router-dom';
    
const apiEndPoint = "http://localhost/html/php/api_task/api";
class Employees extends Component {
  state = {
    employees: [],
  };

  async componentDidMount() {
    let { data: employees } = await axios.get( apiEndPoint + "/read.php");
    employees = employees["data"];

    this.setState({ employees });
  }
  handleAdd = () => {
    console.log("Add");
  };

  handleUpdate = async (employee) => {
    console.log("Update", employee);
  };

  handleDelete = async (employee) => {
    this.setState({
      employees: this.state.employees.filter((emp) => emp.id !== employee.id),
    });

    await axios.delete( apiEndPoint +"/delete.php", {
      data: {
        id: employee.id,
      },
    });
    
  };

  render() {
    return (
      <div>
        <h3>Employees</h3>
        <Link
          className="btn btn-primary btn-sm m-2"
          to="/employees/new"
        >
          New Employee
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.phone}</td>
                <td>{employee.age}</td>
                <td>
                  <button
                    className="btn btn-success ml-3 mr-3 btn-sm"
                    onClick={() => this.handleUpdate(employee)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(employee)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Employees;