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
      fetch('https://iconnect-backend.herokuapp.com/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
            console.log(res)
          } else {
            const error = new Error(res.error);
            throw error;
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
