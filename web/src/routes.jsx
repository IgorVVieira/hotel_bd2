import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Login from './components/Login';
import FormQuarto from './components/FormQuarto';
import NewUser from './components/NewUser';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <PrivateRoute path='/quarto' component={FormQuarto} />
                <Route path='/novo-usuario' component={NewUser} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;