import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { delReq, getReq } from '../../http/api';
import Loader from '../loader/loader';

export default class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstUsers: [],
            lstUsersOld: [],
            token: localStorage.getItem("token"),
            nameFilter: "",
            isLoading: false
        }
    }

    componentDidMount = () => {
        this.getUserList();
    }

    getUserList = async () => {
        this.setState({ isLoading: true });
        let response = await getReq("/subadmin")
        if (response.status) {
            this.setState({
                lstUsers: response.data.users,
                lstUsersOld: response.data.users,
                isLoading: false
            })
        }
        else {
            toast.error(response.error);
            this.setState({ isLoading: false });
        }


    }
    editUser = (id) => {
        alert(id)
    }

    filterHandle = (e) => {
        e.preventDefault();
        this.setState({
            nameFilter: e.target.value
        }, () => { this.filterTable(this.state.nameFilter.toLowerCase()) })
    }

    filterTable = (nameFilter) => {
        if (nameFilter !== "") {
            const users = this.state.lstUsers.filter((user) => user.name.toLowerCase().includes(nameFilter))
            this.setState({
                lstUsers: users
            })
        }
        else {
            this.setState({
                lstUsers: this.state.lstUsersOld
            })
        }
    }


    deleteUser = async (id, name, email) => {
        let data = { name, email }

        if (window.confirm("Are You Sure to Delete This User ?")) {
            this.setState({ isLoading: true });
            const response = await delReq(`/subadmin/${id}`, data);
            if (response.status) {
                toast.success("Successfully Deleted");
                this.setState({ isLoading: false });
                this.getUserList();
            }
            else {
                toast.error(response.error);
                this.setState({ isLoading: false });
            }
        }
    }
    render() {
        return (
            <div className="users col-lg-8 col-md-10 col-sm-12 col-centered">
                <ToastContainer />
                <Loader show={this.state.isLoading} />
                <Link className="btn btn-success" style={{ marginBottom: 10 }}
                    to="/manageUser" > Create User</Link>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th width={"20%"}>Id</th>
                            <th width={"40%"}><input type="text"
                                placeholder="Name"
                                className="form-control"
                                value={this.state.nameFilter}
                                onChange={this.filterHandle}
                            />
                            </th>
                            <th width={"40%"}>Email</th>
                            <th width={"20%"}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lstUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="actionTd">
                                    <i className="fa fa-edit"
                                        title="Edit User"
                                        onClick={() => {
                                            this.props.history.push(`/manageUser/${user.id}`);
                                        }} />

                                    <i className="fa fa-trash"
                                        title="Delete user"
                                        onClick={() => {
                                            this.deleteUser(user.id, user.name,
                                                user.email
                                            );
                                        }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        )
    }
}
