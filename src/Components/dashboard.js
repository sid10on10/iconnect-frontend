import React, { Component } from "react";

export default class Dashboard extends Component {
    constructor() {
      super();
      //Set default message
      this.state = {
        message: ''
      }
    }
    componentDidMount() {
      //GET message from server using fetch api
      fetch('https://iconnect-backend.herokuapp.com/dashboard')
        .then(res => res.text())
        .then(res => this.setState({message: res}))
        .catch(err => {
          console.error(err);
          alert('Something went wrong!');
        });
    }
    render() {
      return (
        <div>
          <h1>Dashboard</h1>
          <p>{this.state.message}</p>
        </div>
      );
    }
  }