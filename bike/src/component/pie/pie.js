import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
export default class Pie extends React.Component{
    componentDidMount(){
        const myChart = echarts.init(document.getElementById('main'))
        myChart.setOption({
            title: {
                text: 'SRAM及其子品牌分布量',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#000'
                }
            },
            tooltip: {},
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {

                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:400, name:'SRAM'},
                        {value:310, name:'ROCKSHOX'},
                        {value:274, name:'Avid'},
                        {value:235, name:'TRUVATIV'},
                        {value:210, name:'ZIPP'},
                        {value:250, name:'QUARQ'}
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#000'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#000'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        })
    }
    render() {
        return (
            <div id="main" style={{width: 380, height: 300}}></div>
        )
    }
}
