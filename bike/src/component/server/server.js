import React from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import {connect} from 'react-redux'
@connect(
    state => state.chatuser,
    {getUserList}
)
export default class Server extends React.Component {
    componentDidMount() {
        this.props.getUserList('rider')
    }
    render() {
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}
