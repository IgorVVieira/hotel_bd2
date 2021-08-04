import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import FormQuarto from './components/FormQuarto';
import NewUser from './components/NewUser';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/quarto' component={FormQuarto} />
                <Route path='/novo-usuario' component={NewUser} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;