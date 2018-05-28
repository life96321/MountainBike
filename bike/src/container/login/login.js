import React from 'react'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import Pie from '../../component/pie/pie'
import {List, WingBlank, Icon, WhiteSpace, InputItem, NavBar, Button} from 'antd-mobile'
import './login.css'
@connect(
    state => state.user,
    {login}
)
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.handleReg = this.handleReg.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin() {
        this.props.login(this.state)
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleReg() {
        this.props.history.push('/register')
    }

    render() {
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar
                    icon={<Icon type="left"/>}
                    style={{background: '#800000', fontStyle: 'oblique'}}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    登录
                </NavBar>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <WhiteSpace />
                        <WhiteSpace />
                        <h1>欢迎登录SRAM</h1>
                        <Pie></Pie>
                        <WhiteSpace />
                        {this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
                        <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v => this.handleChange('pwd', v)} type='password'>密码</InputItem>
                        <WhiteSpace />
                        <Button style={{background: '#800000'}} onClick={this.handleLogin} type="primary">登录</Button>
                        <WhiteSpace />
                        <Button style={{background: '#800000'}} onClick={this.handleReg} type="primary">注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
