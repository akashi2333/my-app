import React, { useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, } from 'antd';

let AddUpdateForm = (props, ref) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({ categoryName: props.categoryName })
    }, [props.categoryName])
    useImperativeHandle(ref, () => ({
        submit: form.submit,
        form

    }))
    const onFinish = values => {
        console.log('submit', values);

    }
    return (
        <Form
            // initialValues={{
            //     categoryName: props.categoryName //父组件传递进来分类名称
            // }}
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                label="分类名"
                name="categoryName"
                rules={[
                    {
                        required: true,
                        message: '请输入分类名',
                    },
                ]}
            >
                <Input placeholder='请输入分类名称' />
            </Form.Item>
        </Form>



    );
};
AddUpdateForm = forwardRef(AddUpdateForm)
export default AddUpdateForm;