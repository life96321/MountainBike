import React from 'react'
import {Redirect} from 'react-router-dom'
import Line from '../../component/line/line'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {WingBlank, Icon, WhiteSpace, InputItem, NavBar, Button, Radio, List} from 'antd-mobile'
import './register.css'
@connect(
    state=>state.user,
    {register}
)
export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'rider'
        }
        this.handleReg = this.handleReg.bind(this)
    }
    handleReg() {
        this.props.register(this.state)
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        const RadioItem = Radio.RadioItem
        return(
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar
                    icon={<Icon type="left" />}
                    style={{background: '#800000', fontStyle: 'oblique'}}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    注册
                </NavBar>
                <WingBlank>
                    <h1>欢迎注册SRAM</h1>
                    <Line></Line>
                    {this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v => this.handleChange('pwd', v)} type='password'>密码</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v => this.handleChange('repeatpwd', v)} type='password'>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem
                            checked={this.state.type === 'rider'}
                            onChange={() => this.handleChange('type', 'rider')}
                        >
                            骑手
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type === 'server'}
                            onChange={() => this.handleChange('type', 'server')}
                        >
                            调试技师
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button style={{background: '#800000'}} onClick={this.handleReg} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}
