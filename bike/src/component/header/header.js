import React from 'react'
import './header.css'
export default class Header extends React.Component{
    render(){
        return (
            <div className="header-content">
                <img className="header-img" src={require('../img/header.jpg')} alt="header" />
            </div>
        )
    }
}
