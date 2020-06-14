import React, { useState, useEffect } from 'react'
import { Table, message, Button } from 'antd'
import {
    PlusOutlined
} from '@ant-design/icons'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import MainLayout from '../components/Layouts/MainLayout.component'
import PageNavigation from '../components/Navigation/PageNavigation.component'
import CreateIdeaModal from '../components/Modals/Ideas/CreateIdeaModal.component'
import { IDEA_STATUSES } from '../constants'
import axios from '../config/axios'

const Ideas = () => {
    const [ideasData, setIdeasData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showCreateIdeaModal, setShowCreateIdeaModal] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const ideasData = await axios.get('/ideas', { params: { filterBy: { status: IDEA_STATUSES.ACCEPTED } } })
                setIdeasData(ideasData)
            } catch (error) {
                message.error(error.message)
            }
            setIsLoading(false)
        })()
    }, [])

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => <span>{moment(text).format('DD-MM-YYYY HH:mm')}</span>
        },
        {
            title: 'Examples',
            dataIndex: 'examples',
            key: 'examples',
            render: examples => {
                if (isEmpty(examples)) return '-'

                return examples.map((example, index) => [
                    index > 0 && ", ",
                    <a key={index + '-' + example.title} target='_blank' rel="noopener noreferrer" href={example.url}>{example.title}</a>
                ])
            }
        }
    ]

    return (
        <MainLayout>
            <CreateIdeaModal
                visible={showCreateIdeaModal}
                toggleModal={() => setShowCreateIdeaModal(!showCreateIdeaModal)} />
            <PageNavigation
                title="Ideas"
                extra={
                    <Button
                        onClick={() => setShowCreateIdeaModal(!showCreateIdeaModal)}
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}>
                        Add Idea
                    </Button>
                } />
            <Table
                loading={isLoading}
                rowKey={record => record._id}
                dataSource={!isEmpty(ideasData) && ideasData.data.results}
                columns={columns} />
        </MainLayout>
    )
}

export default Ideas