import React,{ Component } from "react";

export default class LogOut extends Component {
    componentDidMount(){
        localStorage.removeItem("token")
        this.props.history.push('/sign-in');
    }

    render(){
        return (
            <div>
                <h1>Logged Out successfully</h1>
            </div>
        )
    }
}