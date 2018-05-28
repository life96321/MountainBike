import React from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import {connect} from 'react-redux'
@connect(
    state => state.chatuser,
    {getUserList}
)
export default class Rider extends React.Component {
    componentDidMount() {
        this.props.getUserList('server')
    }
    render() {
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}
