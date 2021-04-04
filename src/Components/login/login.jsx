import axios from 'axios';
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';

var queryString = require('querystring');

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let { email, password } = this.state;
        axios.post('http://creando.ebslon.com/api/login',
            queryString.stringify({ email, password })
        ).then((response) => {
            console.log(response);
            if (response.data.success) {
                toast.success("Loggen In Successfully");
                let token = response.data.token;
                localStorage.setItem('token', token);
                setTimeout(() => {
                    window.location.href = '/users'
                }, 2000)
            }
            else {
                toast.error(response.data.message);
                console.log(response.data)
            }
            console.log(response.data)
        }).catch((error) => {
            toast.error("Failed" + error);
        });
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="loginForm">
                <ToastContainer />
                <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center formHeader"> Login</h3>
                    <div className="form-group">
                        <input type="email"
                            autoComplete="off"
                            name="email" id="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            className="form-control"
                            required

                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            autoComplete="off"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="from-group">
                        <input type="submit" value="Login"
                            className="btn btn-success form-control"
                        />
                    </div>
                </form>
            </div>
        )
    }
}
