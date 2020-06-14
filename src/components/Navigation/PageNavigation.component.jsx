import React from 'react'
import { PageHeader, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'

const PageNavigation = ({ title, subtitle, history, extra }) => {
    return (
        <Row justify="space-between" align="middle">
            <Col>
                <PageHeader
                    onBack={history.goBack}
                    title={title}
                    subTitle={subtitle} />
            </Col>
            <Col style={{padding: '16px 24px'}}>{extra}</Col>
        </Row>

    )
}

export default withRouter(PageNavigation)