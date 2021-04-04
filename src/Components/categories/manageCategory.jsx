import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { getReq, postReq, putReq } from '../../http/api';
import Loader from '../loader/loader';


class manageCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id) || 0,
            title: '',
            is_active: false,
            parent_id: null,
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
        const response = await getReq(`/category/${id}`);
        if (response.status) {
            this.setState({
                title: response.data.title,
                is_active: response.data.is_active,
                isLoading: false
            })
        }
        else {
            toast.error(response.error);
            this.setState({ isLoading: false });
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleInputCheck = (e) => {
        this.setState({
            is_active: !this.state.is_active
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();


        let {
            title,
            is_active,
            parent_id,
            id,
        } = this.state;
        if (is_active) {
            is_active = 1;
        }
        else {
            is_active = 0;
        }
        let data = {
            title,
            is_active,
            parent_id,
        }


        if (id) {
            this.setState({ isLoading: true });
            const response = await putReq(`/category/${id}`, data);
            if (response.status) {
                toast.success("Successfully Updated");
                this.setState({ isLoading: false });
                setTimeout(() => {
                    this.props.history.push('/category');
                }, 1000);
            }
            else {
                toast.error(response.error);
                this.setState({ isLoading: false });
            }
        } else {
            this.setState({ isLoading: true });
            const response = await postReq(`/category`, data);
            if (response.status) {
                toast.success("Successfully Added");
                this.setState({ isLoading: false });
                setTimeout(() => {
                    this.props.history.push('/category');
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
                    <h3 className="text-center formHeader">{this.state.id ? "Edit" : "Add"} Category</h3>
                    <div className="form-group">
                        <input type="text"
                            autoComplete="off"
                            name="title" id="title"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="checkbox"
                            autoComplete="off"
                            name="is_active"
                            id="is_active"
                            checked={this.state.is_active}
                            onChange={this.handleInputCheck}
                            className="form-control"
                        />
                    </div>
                    <div className="buttonWrap">
                        <div className="col col-sm-6">
                            <input type="submit" value={this.state.id ? "Update" : "Add"}
                                className="btn btn-success form-control"
                            />
                        </div>
                        <div className="col col-sm-6">
                            <button className="btn btn-warning" onClick={() => this.props.history.push('/category')}>Exit</button>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default manageCategory;