import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import TabLink from '../tablink/tablink'
import Server from '../server/server'
import Rider from '../rider/rider'
import Msg from '../msg/msg'
import User from '../user/user'
import QueueAnim from 'rc-queue-anim'
import {getMsgList, recvMsg} from '../../redux/chat.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state,
    {getMsgList, recvMsg}
)
export default class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const {pathname} = this.props.location
        const user = this.props.user
        const navList = [
            {
                path:'/server',
                text: '骑手',
                icon: 'rider',
                title: '骑手列表',
                component: Server,
                hide: user.type === 'rider'
            },
            {
                path:'/rider',
                text: '客服',
                icon: 'server',
                title: '客服列表',
                component: Rider,
                hide: user.type === 'server'
            },
            {
                path:'/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path:'/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        const page = navList.find(v => v.path === pathname)
        return page ? (
            <div>
                <NavBar className="fixed-header" mode="dark">{page.title}</NavBar>
                <div style={{marginTop: 45, marginBottom: 56}}>
                    <QueueAnim type="right" delay={100}>
                        <Route key={page.path} path={page.path} component={page.component}></Route>
                    </QueueAnim>
                </div>
                <TabLink data={navList}></TabLink>
            </div>
        ) : <Redirect to='/firstpage'></Redirect>
    }
}
