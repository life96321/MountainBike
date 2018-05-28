import React from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
@withRouter
@connect(
    state => state.chat
)
export default class TabLink extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const {pathname} = this.props.location
        const navList = this.props.data.filter(v => !v.hide)
        return(
            <TabBar tintColor='#000' className="tab-link">
                {navList.map(v => (
                    <TabBar.Item
                        badge={v.path === '/msg' ? this.props.unread : null}
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={pathname === v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}
