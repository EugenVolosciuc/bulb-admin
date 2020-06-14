import React, { useState, useEffect } from 'react'
import { Table, message } from 'antd'
import { withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import MainLayout from '../components/Layouts/MainLayout.component'
import PageNavigation from '../components/Navigation/PageNavigation.component'
import axios from '../config/axios'

const Proposals = () => {
    const [proposalsData, setProposalsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const proposalsData = await axios.get('/ideas/proposals')
                setProposalsData(proposalsData)
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
            render: (text, record) => <span></span>
        }
    ]

    return (
        <MainLayout>
            <PageNavigation title="Proposals" />
            <Table 
                loading={isLoading}
                rowKey={record => record._id}
                dataSource={!isEmpty(proposalsData) && proposalsData.data.results}
                columns={columns} />
        </MainLayout>
    )
}

export default withRouter(Proposals)