import React, { Component } from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props)
            this.state = {
                name:'',
                email : '',
                password: ''
            };
            this.handleEmailChange = this.handleEmailChange.bind(this);
            this.handlePasswordChange = this.handlePasswordChange.bind(this);
            this.handleNameChange = this.handleNameChange.bind(this);
        }
        
        handleNameChange = (event) => {
            this.setState({name: event.target.value});
        }

        handleEmailChange = (event) => {
            this.setState({email: event.target.value});
        }
    
        handlePasswordChange = (event) => {
            this.setState({password: event.target.value});
        }
    
        onSubmit = (event) => {
            event.preventDefault();
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(async (res) => {
                let data = await res.json()
                if(data.message==="SignUp Successful You can now login"){
                    alert(data.message)
                    this.props.history.push('/sign-in');
                }else{
                    alert(data.message)
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });
            // to implement after client side cookie in fetch
            // this.props.history.push('/dashboard');
        }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="First name" value={this.state.name} onChange={this.handleNameChange} required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handlePasswordChange} required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}