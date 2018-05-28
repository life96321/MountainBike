import React from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
export default class TabLink extends React.Component {
    render() {
        const tabBarList = [
            {
                path:'/firstpage',
                text:'首页',
                icon:'first-page'
            },
            {
                path:'/classify',
                text:'分类',
                icon:'classify-page'
            },
            {
                path:'/authroute',
                text:'功能',
                icon:'authroute-page'
            }
        ]
        const {pathname} = this.props.location
        return(
            <div className="tab-list">
                <TabBar tintColor='#000'>
                    {tabBarList.map(v => (
                        <TabBar.Item
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
            </div>
        )
    }
}
