import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getReq } from '../../http/api';
import Profile from './../../avatar.png'


class menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            token: localStorage.getItem('token')
        }
    }
    componentDidMount = () => {
        this.getUserData();
    }
    getUserData = async () => {
        let response = await getReq("/user-info");
        if (response.status) {
            this.setState({
                users: response.data.user
            });
        }
        else {
            toast.error(response.error);
        }
    }
    render() {
        return (
            <div className="menu">
                <div className="left">
                    <Link to="/admin"> Admin Panel</Link>
                    <li className="submenu">
                        <a href="#!">Users</a>
                        <ul className="submenuShow">
                            <li><Link to="/users">Display User</Link></li>
                        </ul>
                    </li>
                    <li className="submenu">
                        <a href="#!">Product</a>
                        <ul className="submenuShow">
                            <li><Link to="/category">Category</Link></li>
                        </ul>
                    </li>
                </div>
                <li className="profile">
                    <img src={Profile} alt="Profile Pic" />
                    <div className="userDetails">
                        <span>{this.state.users.name}</span>
                        <span>{this.state.users.email}</span>
                        <span>
                            <i className="fa fa-sign-out"
                                title="Logout"
                                onClick={() => {
                                    window.location.href = "/";
                                }} />
                        </span>
                    </div>
                </li>
            </div>
        )
    }
}

export default menu
