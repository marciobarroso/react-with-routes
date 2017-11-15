import React, { Component } from 'react'
import {BrowserRouter} from 'react-router-dom'
import Main from '../Main'
import Protected from '../Protected'

const Routes = () => {
    return (
      <div className="app">
        <section className="header"></section>
        <section className='main'>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </section>
      </div>
    )
}

export default Routes
