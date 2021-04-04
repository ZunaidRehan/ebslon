import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { delReq, getReq } from '../../http/api';
import Loader from '../loader/loader';

export default class category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstCategory: [],
            lstCategoryOld: [],
            token: localStorage.getItem("token"),
            titleFilter: "",
            isLoading: false
        }
    }

    componentDidMount = () => {
        this.getCategoryList();
    }

    getCategoryList = async () => {
        this.setState({ isLoading: true });
        let response = await getReq("/category");
        if (response.status) {
            this.setState({
                lstCategory: response.data.categories,
                lstCategoryOld: response.data.categories,
                isLoading: false
            });
        }
        else {
            toast.error(response.error);
            this.setState({ isLoading: false });
        }
    }

    filterHandle = (e) => {
        e.preventDefault();
        this.setState({
            titleFilter: e.target.value
        }, () => { this.filterTable(this.state.titleFilter.toLowerCase()) })
    }

    filterTable = (titleFilter) => {
        if (titleFilter !== "") {
            const categories = this.state.lstCategory.filter((category) => category.title.toLowerCase().includes(titleFilter))
            this.setState({
                lstCategory: categories
            })
        }
        else {
            this.setState({
                lstCategory: this.state.lstCategoryOld
            })
        }
    }


    deleteCategory = async (id, title, is_active) => {
        let data = { title, is_active }

        if (window.confirm("Are You Sure to Delete Category ?")) {
            this.setState({ isLoading: true });
            const response = await delReq(`/category/${id}`, data);
            if (response.status) {
                toast.success("Successfully Deleted");
                this.getCategoryList();
                this.setState({ isLoading: false });
            }
            else {
                this.setState({ isLoading: false });
                toast.error(response.error);
            }
        }
    }

    render() {
        return (
            <div className="users col-lg-8 col-md-10 col-sm-12 col-centered" >
                <ToastContainer />
                <Loader show={this.state.isLoading} />
                <Link className="btn btn-success" style={{ marginBottom: 10 }}
                    to="/manageCategory" > Create Category</Link>

                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th width={"20%"}>Id</th>
                            <th width={"50%"}><input type="text"
                                placeholder="Title"
                                className="form-control"
                                value={this.state.titleFilter}
                                onChange={this.filterHandle}
                            />
                            </th>
                            <th width={"30%"}>Active</th>
                            <th width={"30%"}>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lstCategory.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.title}</td>
                                <td><input
                                    type="checkbox"
                                    checked={category.is_active}
                                    readOnly
                                    className="form-control"
                                /></td>
                                <td className="actionTd">
                                    <i className="fa fa-edit"
                                        title="Edit Category"
                                        onClick={() => {
                                            this.props.history.push(`/manageCategory/${category.id}`);
                                        }} />

                                    <i className="fa fa-trash"
                                        title="Delete Category"
                                        onClick={() => {
                                            this.deleteCategory(category.id, category.title,
                                                category.is_active
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
