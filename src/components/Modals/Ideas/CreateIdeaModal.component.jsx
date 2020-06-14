import React from 'react'
import { Modal, message, Form, Input, Button } from 'antd'
import { CheckOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import isNil from 'lodash/isNil'

import axios from '../../../config/axios'

const CreateIdeaModal = ({ visible, toggleModal, history }) => {
    const [form] = Form.useForm()

    const createIdea = () => {
        console.log(form.getFieldsValue())
        form.validateFields()
            .then(async values => {
                try {
                    await axios.post('/ideas', { 
                        title: values.title,
                        ...(!isNil(values.examples) && { examples: values.examples})
                    })
                    toggleModal()
                    message.success('Idea created')
                    history.push('/')
                    history.goBack()
                } catch (error) {
                    message.error(error.message)
                }
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <Modal
            title="Create idea"
            visible={visible}
            onCancel={toggleModal}
            footer={[
                <Button
                    key="Create Idea"
                    onClick={createIdea}
                    type="primary"
                    icon={<CheckOutlined />}>
                    Save
                </Button>
            ]}>
            <Form
                form={form}
                layout="vertical"
                name="create_idea">
                <Form.Item
                    validateTrigger="onSubmit"
                    name="title"
                    label="Title"
                    rules={[
                        { required: true, message: 'Title is required' }
                    ]}>
                    <Input placeholder="Title of idea" />
                </Form.Item>
                <Form.List
                    label="Examples"
                    name="examples">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        // style={index === 0 ? { marginBottom: 0 } : null}
                                        label={index === 0 ? 'Examples' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            // {...field}
                                            name={[field.name, 'url']}
                                            fieldKey={[field.fieldKey, 'url']}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please add an example URL or delete the input field",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input style={{ width: '45%', marginRight: '2%' }} placeholder="URL of example" />
                                        </Form.Item>
                                        <Form.Item
                                            // {...field}
                                            name={[field.name, 'title']}
                                            fieldKey={[field.fieldKey, 'title']}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please add an example title or delete the input field",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input style={{ width: '45%' }} placeholder="Title of example" />
                                        </Form.Item>
                                        {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name)
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add()
                                        }}
                                        style={{ width: '100%' }}>
                                        <PlusOutlined />
                                        Add examples
                                    </Button>
                                </Form.Item>
                            </div>
                        )
                    }}
                </Form.List>
            </Form>
        </Modal>
    )
}

export default withRouter(CreateIdeaModal)