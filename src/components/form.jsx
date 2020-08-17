import React, { Component } from "react";

class Form extends Component {

  state = { employee: { name: "", phone: "", age: "" } };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  handleChange = ({ currentTarget:input }) => {
    const employee = { ...this.state.employee };
    employee[input.name] = input.value;
    this.setState({ employee });

  }
    render() {
        const { employee } = this.state;
    return (
      <div>
        <h1>Api Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              autoFocus
              value={employee.name}
              onChange={this.handleChange} 
              name="name"
              id="name" 
              type="text" 
              className="form-control" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              value={employee.phone}
              onChange={this.handleChange}
              name="phone"
              id="phone" 
              type="text" 
              className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input 
              value={employee.age}
              onChange={this.handleChange} 
              name="age"
              id="age" 
              type="text" 
              className="form-control" />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
