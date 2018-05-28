import React from 'react'
import Slider from 'react-slick'
import './slider.css'
class SliderComp extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        }
        return (
            <Slider {...settings}>
                <div>
                    <img className="slider-img" src={require('./img/bg01.jpg')} alt="tu" />
                </div>
                <div>
                    <img className="slider-img" src={require('./img/bg02.jpg')} alt="tu" />
                </div>
                <div>
                    <img className="slider-img" src={require('./img/bg03.jpg')} alt="tu" />
                </div>
            </Slider>
        )
    }
}
export default SliderComp