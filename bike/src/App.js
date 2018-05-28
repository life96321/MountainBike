import React from 'react'
import {Route, Switch} from 'react-router-dom'
import FirstPage from './component/firstPage/firstPage'
import Classify from './component/classify/classify'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from "./component/authroute/authroute"
import ServerInfo from './container/serverinfo/serverinfo'
import RiderInfo from './container/riderinfo/riderinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(err, info) {
        this.setState({
            hasError: true
        })
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/firstpage' component={FirstPage}></Route>
                    <Route path='/classify' component={Classify}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/serverinfo' component={ServerInfo}></Route>
                    <Route path='/riderinfo' component={RiderInfo}></Route>
                    <Route path='/authroute' component={AuthRoute}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }
}
export default App
