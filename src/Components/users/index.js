import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from './../menu/menu';
import Users from './users';
import ManageUser from './manageUser'

const UsersRoute = () => {

    return (
        <>
            <Menu />
            <Switch>
                <Route path='/users' component={Users} />
                <Route path={["/manageUser/:id", "/manageUser"]} component={ManageUser} />
            </Switch>
        </>
    )
}
export default UsersRoute