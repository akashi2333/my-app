import React, {Component} from 'react'
import {Form, Input, Button, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons' 
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
   
    handleSubmit = (values) => {
        const {username, password} =values
        reqLogin(username, password).then(res => {
            if(res.code===1) {
                message.success('登陆成功')
                const user = res.data
                memoryUtils.user = user
                storageUtils.saveUser(user)
                this.props.history.replace('/')
            } else {
                message.error(res.msg)
            }
        })
    }
    handleErr = () => {
        message.error('用户名或密码格式不正确');
    }

    render () {
        const user = memoryUtils.user
        if(user && user._id) {
            return <Redirect to='/'/>
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form className="login-form" onFinish={this.handleSubmit} onFinishFailed={this.handleErr}>
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: '用户名不能为空',
                            },
                            {
                                min:4,
                                message: '用户名长度必须大于等于4'
                            },
                            {
                                max:12,
                                message: '用户名长度不能超过12'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: '用户名必须是英文、数字或下划线'
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                            {
                                min:4,
                                message: '密码长度必须大于等于4'
                            },
                            {
                                max:12,
                                message: '密码长度不能超过12'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: '密码必须是英文、数字或下划线'
                            },
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}