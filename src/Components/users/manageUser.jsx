import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { getReq, postReq, putReq } from '../../http/api';
import Loader from '../loader/loader';


class manageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id) || 0,
            name: '',
            email: "",
            password: "",
            confirm_password: "",
            isLoading: false
        }
    }

    componentDidMount() {
        console.log(this.props);
        if (this.state.id !== 0) {
            this.getDetails(this.state.id);

        }
    }
    async getDetails(id) {
        this.setState({ isLoading: true });
        const response = await getReq(`/subadmin/${id}`);

        if (response.status) {
            this.setState({
                name: response.data.name,
                email: response.data.email,
                isLoading: false
            })
        }
        else {
            this.setState({ isLoading: false });
            toast.error(response.error);
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();


        let {
            name,
            email,
            password,
            confirm_password,
            id,
        } = this.state;

        let data = {
            name,
            email,
            password,
            confirm_password
        }

        if (password !== confirm_password) {
            toast.warning("Password Does not Matching");
            return false;
        }


        if (id) {
            this.setState({ isLoading: true });
            const response = await putReq(`/subadmin/${id}`, data);
            if (response.status) {
                toast.success("Successfully Updated");
                this.setState({ isLoading: false });
                setTimeout(() => {
                    this.props.history.push('/users');
                }, 1000);
            }
            else {
                this.setState({ isLoading: false });
                toast.error(response.error);
            }
        } else {
            this.setState({ isLoading: true });
            const response = await postReq(`/subadmin`, data);
            if (response.status) {
                toast.success("Successfully Added");
                this.setState({ isLoading: false });
                setTimeout(() => {
                    this.props.history.push('/users');
                }, 1000);
            }
            else {
                toast.error(response.error);
                this.setState({ isLoading: false });
            }
        }
    }

    render() {
        return (
            <div className="loginForm">
                <ToastContainer />
                <Loader show={this.state.isLoading} />
                <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center formHeader">{this.state.id ? "Edit" : "Add"} User</h3>
                    <div className="form-group">
                        <input type="text"
                            autoComplete="off"
                            name="name" id="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
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
                            name="password" id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            autoComplete="off"
                            name="confirm_password" id="confirm_password"
                            placeholder="Confirm Password"
                            value={this.state.confirm_password}
                            onChange={this.handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="buttonWrap">
                        <div className="col col-sm-6">
                            <input type="submit" value={this.state.id ? "Update" : "Add"}
                                className="btn btn-success form-control"
                            />
                        </div>
                        <div className="col col-sm-6">
                            <button className="btn btn-warning" onClick={() => this.props.history.push('/users')}>Exit</button>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default manageUser