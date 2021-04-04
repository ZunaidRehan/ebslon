import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from './../menu/menu';
import AdminPanel from './adminPanel'

const Dashboard = () => {

    return (
        <>
            <Menu />
            <Switch>
                <Route path='/admin' component={AdminPanel} />
            </Switch>
        </>
    )
}
export default Dashboard