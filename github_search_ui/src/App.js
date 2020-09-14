import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ReposSearch from './ReposSearch';
import Details from './Details';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ ReposSearch } />
                <Route path='/:id' component={ Details } />
                <Redirect from='*' to='/' />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
