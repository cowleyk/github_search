import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import ReposSearch from './ReposSearch';
import Details from './Details';
import Login from './Login';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <AuthRoute path="/login" type="guest">
                    <Login />
                </AuthRoute>
                <AuthRoute path='/' type="private">
                    <ReposSearch />
                </AuthRoute>
                <AuthRoute path='/:id' type="private">
                    <Details />
                </AuthRoute>
                <Redirect from='*' to='/' type="private"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
