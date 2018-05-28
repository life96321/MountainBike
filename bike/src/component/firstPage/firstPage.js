import React from 'react'
import SliderComp from '../slider/slider'
import {WhiteSpace, NavBar} from 'antd-mobile'
import ContentComp from '../contentComp/contentComp'
import TabLink from '../tabBar/tabBar'
class FirstPage extends React.Component {
    render() {
        return (
            <div>
                <NavBar className="page-bar">SRAM 速联装备</NavBar>
                <SliderComp></SliderComp>
                <ContentComp></ContentComp>
                <WhiteSpace />
                <TabLink></TabLink>
            </div>
        )
    }
}
export default FirstPage
