import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Bar from '../charts/bar'
import User from '../user/user'
import Role from '../role/role'
import Product from '../product/product'

import {  Layout  } from 'antd';
import {Switch, Route} from 'react-router-dom'

const {Footer, Sider, Content } = Layout;
export default class Admin extends Component {

    render () {
        // const user =  memoryUtils.user
        // if(!user || !user._id) {
        //     return <Redirect to='/login'/>
        // }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin: 20, backgroundColor:'white'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/User' component={User}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/role' component={Role}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color: '#cccccc'}}>推荐使用谷歌浏览器，可以获取更好的页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}