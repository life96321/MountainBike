import React from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import ReactDom from 'react-dom'
import App from './App'
import reducers from './reducer'
import './index.css'
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
))
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)





