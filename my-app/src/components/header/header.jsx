import React, {Component} from 'react'
import {formateDate} from '../../utils/dateUtils' 
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeather} from '../../api/index'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {Modal} from 'antd'
import './header.less'
import LinkButton from '../link-button/link-button'

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        weather: '',
    }
    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        })
    }
    getWeather = async() => {
        const weather = await reqWeather()
        this.setState({weather})
    }
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
            }else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key===path)
                if(cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    logoout = () => {
        Modal.confirm({
            Content: '确定退出登录吗？',
            onOk: () => {
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
              },
              onCancel() {
                console.log('Cancel');
              },
        })
    }
    componentDidMount () {
        this.getTime()
        this.getWeather()
    }
    componentWillUnmount () {
        clearInterval(this.intervalId)
    }
    render() {
        const {currentTime,weather} =this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logoout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <span className="weather">{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)