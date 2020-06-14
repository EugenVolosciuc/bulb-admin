import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ROUTES } from '../../constants'
import { Dashboard, Proposals, Ideas } from '../../pages'

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={ROUTES.INDEX} component={Dashboard} />
                <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route exact path={ROUTES.LOG_IN} component={null} />
                <Route exact path={ROUTES.PROPOSALS} component={Proposals} />
                <Route exact path={ROUTES.IDEAS} component={Ideas} />
            </Switch>
        </Router>
    )
}

export default Routing