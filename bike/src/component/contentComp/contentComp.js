import React from 'react'
import axios from 'axios'
import Lazyload from 'react-lazyload'
import {WingBlank, Grid, List} from 'antd-mobile'
export default class ContentComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        axios.get('/user/content').then(res => {
            if (res.data.errno === 0) {
                this.setState({list: res.data.data.items})
            }
        })
    }

    render() {
        const name = this.state.list.map(v => ({
            icon: v.url,
            text: v.title
        }))
        return (
            <WingBlank>
                <div className="wrapper">
                    <List renderHeader={() => '经营范围'}>
                        <div className="list-name">
                            <Lazyload height={0}>
                                <Grid
                                    data={name}
                                    columnNum={2}
                                >
                                </Grid>
                            </Lazyload>
                        </div>
                    </List>
                </div>
            </WingBlank>
        )
    }
}
