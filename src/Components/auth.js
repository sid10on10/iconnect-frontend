import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// fix the cookie error with fetch then you can use higher order component

export default function Auth(ProtectedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    // cookies with include are not working ...resolve this later
    componentDidMount() {
      let token = localStorage.getItem("token")
      fetch('http://localhost:3000/checkToken',{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "authorization": token,
        }
        })
        .then( async res => {
          let data = await res.json()
          if (res.status===200) {
            this.setState({ loading: false });
          } else {
            alert(data.message)
            this.setState({ loading: false, redirect: true });
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/sign-in" />;
      }
      return <ProtectedComponent {...this.props} />;
    }
  }
}
