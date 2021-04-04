import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Category from './category.jsx';
import AddCategory from './manageCategory.jsx';
import Menu from './../menu/menu'

const Categories = () => {
    return (
        <>
            <Menu />
            <Switch>
                <Route path='/category' component={Category} />
                <Route path={["/manageCategory/:id", "/manageCategory"]} component={AddCategory} />
            </Switch>
        </>
    )
}
export default Categories