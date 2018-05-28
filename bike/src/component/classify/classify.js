import React from 'react'
import axios from 'axios'
import Header from '../header/header'
import TabLink from '../tabBar/tabBar'
import Lazyload from 'react-lazyload'
import {WingBlank, NavBar, WhiteSpace, Grid, Tabs} from 'antd-mobile'
export default class Classify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            proA: [],
            proB: [],
            proC: []
        }
    }

    componentDidMount() {
        axios.get('/user/classify').then(res => {
            if (res.data.errno === 0) {
                this.setState({
                    list: res.data.data.items,
                    proA: res.data.data.pro_01,
                    proB: res.data.data.pro_02,
                    proC: res.data.data.pro_03
                })
            }
        })
    }

    render() {
        const tabs = [
            {title: 'XX1 Eagle系列'},
            {title: 'X01 Eagle系列'},
            {title: 'GX Eagle系列'}
        ]
        const productA = this.state.proA.map(v => ({
            icon: v.url,
            text: v.name
        }))
        const productB = this.state.proB.map(v => ({
            icon: v.url,
            text: v.name
        }))
        const productC = this.state.proC.map(v => ({
            icon: v.url,
            text: v.name
        }))
        return (
            <div>
                <NavBar className="page-bar">Eagle系列</NavBar>
                <Header></Header>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <div className="class-content">
                        <Tabs
                            tabs={tabs}
                            initialPage={1}
                            renderTab={tab => <span>{tab.title}</span>}

                        >
                            <div>
                                <Lazyload height={200}>
                                    <Grid
                                        data={productA}
                                        columnNum={2}
                                    >
                                    </Grid>
                                </Lazyload>
                            </div>

                            <div>
                                <Lazyload height={200}>
                                    <Grid
                                        data={productB}
                                        columnNum={2}
                                    >
                                    </Grid>
                                </Lazyload>
                            </div>

                            <div>
                                <Lazyload height={200}>
                                    <Grid
                                        data={productC}
                                        columnNum={2}
                                    >
                                    </Grid>
                                </Lazyload>
                            </div>
                        </Tabs>
                    </div>
                </WingBlank>
                <TabLink></TabLink>
            </div>
        )
    }
}
