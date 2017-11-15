import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from '../Home'
import Auth from '../Auth'
import Message from '../Message'

const Main = (props) =>
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/auth/:token/:redirect?' component={Auth} />
            <Route exact path='/protected' render={() => <Message>protected page</Message>} />
        </Switch>
    </main>

export default Main
