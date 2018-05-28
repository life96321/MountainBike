import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
export default class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        const Header = Card.Header
        const Body = Card.Body
        const Footer = Card.Footer
        return (
            <div>
                <WhiteSpace />
                <WingBlank>
                    {this.props.userlist.map(v => (
                        v.avatar ? (<Card onClick={() => this.handleClick(v)} key={v._id}>
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={v.type === 'rider' ? (<span>品牌: {v.title}</span>) : (<span>业务范围: {v.title}</span>)}
                            >
                            </Header>
                            <Body>
                            {v.desc.split('\n').map(v => (
                                v.type === 'rider' ? (<div key={v}>故障描述: {v}</div>) : (<div key={v}>个人简介: {v}</div>)
                            ))}
                            </Body>
                            <Footer
                                content={v.type === 'rider' ? (<div>骑行时长:{v.duration}</div>) : (<div>维修时长:{v.duration}</div>)}
                            >
                            </Footer>
                        </Card>) : null
                    ))}
                </WingBlank>
            </div>
        )
    }
}
