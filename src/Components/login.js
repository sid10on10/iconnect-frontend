import React, { Component } from "react";

export default class Login extends Component {
constructor(props) {
    super(props)
        this.state = {
            email : '',
            password: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        fetch('https://iconnect-backend.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            let data = await res.json()
            if(data.message==="Login Successfull"){
                this.props.history.push('/message');
            }else{
                alert(data.message)
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
        // this.props.history.push('/dashboard');
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handlePasswordChange} required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}