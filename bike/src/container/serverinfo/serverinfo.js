import React from 'react'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, WhiteSpace, List, Button, WingBlank} from 'antd-mobile'
import AvatarSelect from '../../component/avatar-select/avatar-select'
import {update} from '../../redux/user.redux'
import {connect} from 'react-redux'
@connect(
    state=>state.user,
    {update}
)
export default class ServerInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            duration: '',
            desc:''
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark" style={{background: '#800000'}}>完善信息</NavBar>
                <WingBlank>
                    <div className="server-content">
                        <AvatarSelect
                            selectAvatar={(imgname) => {
                                this.setState({
                                    avatar: imgname
                                })
                            }}
                        >
                        </AvatarSelect>
                    </div>
                    <List renderHeader={() => '其他'}>
                        <InputItem
                            onChange={(v) => this.onChange('title', v)}
                        >业务范围</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={(v) => this.onChange('duration', v)}
                        >维修时长</InputItem>
                        <WhiteSpace />
                        <TextareaItem
                            title='个人简介'
                            onChange={(v) => this.onChange('desc', v)}
                            rows={2}
                            autoHeight
                        />
                        <WhiteSpace />
                        <Button
                            onClick={() => {
                                this.props.update(this.state)
                            }}
                            type="primary"
                            style={{background: '#800000'}}>
                            确认保存
                        </Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
