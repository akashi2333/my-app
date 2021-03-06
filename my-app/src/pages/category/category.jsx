import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api';
import AddUpdateForm from './add-update-form';
const Category = () => {
    let [modalStatus, setModalStatus] = useState(0)//0代表关闭 1代表修改 2代表添加
    let [categorys, setCategorys] = useState([])
    let [currentCategory, setCurrentCategory] = useState({})
    useEffect(() => {
        getCategorys();
    }, [])
    const columns = [
        { title: '分类名称', dataIndex: 'name', },
        {
            title: '操作',
            width: 100,
            render: (category) => <Button type='primary' icon={<EditOutlined />}
                onClick={() => {
                    setCurrentCategory(category);//保存当前被点击的分类信息
                    setModalStatus(1)
                }}
            >修改</Button>
        },
    ]

    const extra = (
        <Button type='primary' icon={<PlusOutlined />}
            onClick={() => {
                //将添加分类时 存储的currentCategory置为空对象
                setCurrentCategory({})
                setModalStatus(2)
            }}
        >
            添加
        </Button>
    )
    const getCategorys = async () => {
        const res = await reqCategorys();
        res.status === 0 ? setCategorys(res.data) : message.error('获取分类信息失败');
    }
    const formRef = useRef();
    const handleOk = () => {
        formRef.current.form.validateFields()
            .then(async values => {
                const { categoryName } = values;
                let res = null
                if (modalStatus === 2) {
                    res = await reqAddCategory(categoryName)
                } else {
                    res = await reqUpdateCategory({  categoryName, parentId: currentCategory._id})
                }
                if (res.status === 0) {
                    //重置输入的表单数据
                    formRef.current.form.resetFields();
                    setModalStatus(0);
                    getCategorys();
                    message.success(res.data ? '添加分类成功' : '修改分类成功')
                } else {
                    message.error(res.msg)
                }
            })
    }
    const handleCancel = () => {
        setModalStatus(0)
    }
    return (
        <div>
            <Card extra={extra}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={categorys}
                    rowKey='_id'
                    pagination={{ defaultPageSize: 6, showQuickJumper: true, }}
                >
                </Table>
                <Modal
                    title={modalStatus === 1 ? '修改分类' : '添加分类'}
                    visible={!!modalStatus}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                   
                    <AddUpdateForm categoryName={currentCategory.name || ''} ref={formRef} ></AddUpdateForm>
                </Modal>
            </Card>
        </div>

    );


}

export default Category;