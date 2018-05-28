import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'

export default class Line extends React.Component {
    componentDidMount() {
        const myChart = echarts.init(document.getElementById('main'))
        myChart.setOption({
            title: {
                text: 'SRAM Eagle套件分布量',
                left: 'center',
                top: '20',
                textStyle: {
                    color: '#000'
                }
            },
            xAxis: {
                data: ['XX1 Eagle', 'X01 Eagle', 'GX Eagle']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [400, 360, 310],
                type: 'bar'
            }],
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        })
    }
    render(){
        return (
            <div id="main" style={{width: 380, height: 300}}></div>
        )
    }
}
