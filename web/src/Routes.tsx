import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { HomePage, RegistrationPage } from './pages';
import { createMemoryHistory } from 'history';
import { Registration } from './components';

const Routes = () => {

    const history = createMemoryHistory();

    return (
        <Router>
            <Switch>
                <Route path="/registration" component={RegistrationPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </Router>
    )
}

export default Routes;