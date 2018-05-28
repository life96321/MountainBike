import React from 'react'
import {Result, WingBlank, WhiteSpace, List, Button, Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
@connect(
    state => state.user,
    {logoutSubmit}
)
export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert
        alert('注销', '确认注销?', [
            {text: '取消', onPress: () => ''},
            {text: '确认', onPress: () => {
                browserCookies.erase('userid')
                this.props.logoutSubmit()
            }}
        ])
    }
    handleBackTo() {
        this.props.history.push('/firstpage')
    }
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ? (
            <div>
                <WhiteSpace />
                <WingBlank>
                    <Result
                        img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt="header" />}
                        title={this.props.user}
                        message={props.type === 'server' ? <div>业务范围: {props.title}</div> : <div>故障描述: {props.desc}</div>}
                    />
                    <List renderHeader={() => '内容'}>
                        <Item>
                            {props.type === 'server' ? <div>个人简介: {props.title} <Brief>维修时长: {props.duration}</Brief></div> : <div>部件品牌: {props.desc} <Brief>骑行时长: {props.duration}</Brief></div>}
                        </Item>
                    </List>
                    <WhiteSpace />
                    <List>
                        <Button type="primary" onClick={this.logout} style={{background: '#800000'}}>注销</Button>
                        <WhiteSpace />
                        <Button type="primary" onClick={() => this.handleBackTo()} style={{background: '#800000'}}>回到主页</Button>
                    </List>
                </WingBlank>
            </div>
        ) : <Redirect to={props.redirectTo}></Redirect>
    }
}

