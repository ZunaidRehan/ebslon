import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AdminPanel from './Components/dashboard'
import Login from './Components/login/login';
import Users from './Components/users'
import Category from './Components/categories'



import { setToken } from './http/Axios';
setToken(localStorage.getItem('token'));

function App() {
  return (
    <>

      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/admin" exact component={AdminPanel} />
          <Route path={["/manageUser", "/manageUser/:id", "/users"]} exact component={Users} />
          <Route path={["/manageCategory", "/manageCategory/:id", "/category"]} exact component={Category} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
