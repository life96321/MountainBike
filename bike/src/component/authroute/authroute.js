import React from 'react'
import axios from 'axios'
import TabLink from '../tabBar/tabBar'
import {WingBlank, NavBar, List, WhiteSpace, Button} from 'antd-mobile'
import {loadData} from '../../redux/user.redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(
    null,
    {loadData}
)

export default class AuthRoute extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            type: '',
            list: []
        }
        this.handleLog = this.handleLog.bind(this)
        this.handleSkip = this.handleSkip.bind(this)
    }
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.loadData(res.data.data)
                    this.setState({
                        name: res.data.data.user,
                        avatar: res.data.data.avatar,
                        list: res.data.data,
                        type: res.data.data.type
                    })
                } else {
                    //
                }
            }
        })
    }
    handleLog() {
        this.props.history.push('/login')
    }
    handleSkip() {
        this.props.history.push('/me')
    }
    render() {
        const ListItem = List.Item
        return (
            <div style={{height: 700}}>
                <NavBar className="page-bar">功能页面</NavBar>
                <WingBlank>
                    <div className="wrap-content">
                        <div className="auth-content" onClick={this.handleLog}>
                            <h1 className="auth-content-title">{this.state.name ? this.state.name : '点击登录'}</h1>
                            <p>{this.state.name ? '知行合一 勇为强者': '登录发现更多精彩'}</p>
                        </div>
                    </div>
                    <WhiteSpace />
                    <List renderHeader={() => '我的信息'}>
                        {this.state.name ? (
                            <div>
                                <ListItem>
                                    {this.state.type === 'rider' ? '单车品牌' : '业务范围'}：{this.state.list.title}
                                </ListItem>
                                <ListItem>
                                    {this.state.type === 'server' ? '维修时长' : '骑行时长'}：{this.state.list.duration}
                                </ListItem>
                                <ListItem>
                                    {this.state.type === 'server' ? '个人简介' : '问题描述'}：{this.state.list.desc}
                                </ListItem>
                            </div>) : <ListItem>登录后查看</ListItem>}
                    </List>
                    <List renderHeader={() => '互动'}>
                        {this.state.name ? <Button onClick={this.handleSkip} type="primary" style={{background: '#800000'}}>跳转到互动页面</Button> : <ListItem>登录后查看</ListItem>}
                    </List>
                    <h1 className="slogon">行者无疆</h1>
                </WingBlank>
                <TabLink></TabLink>
            </div>
        )
    }
}

