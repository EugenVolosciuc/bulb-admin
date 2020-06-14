import React from 'react'
import { Layout, Menu } from 'antd'
import {
    DashboardOutlined,
    FormOutlined,
    BulbOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { ROUTES } from '../../constants'

const { Sider } = Layout

const Sidemenu = ({ menuCollapsed, location }) => {
    return (
        <Sider trigger={null} collapsible collapsed={menuCollapsed}>
            <div className="logo-container">
                <h3 className="logo">{menuCollapsed ? 'B' : 'Bulb Admin'}</h3>
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                <Menu.Item key={ROUTES.DASHBOARD} icon={<DashboardOutlined />}>
                    <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key={ROUTES.IDEAS} icon={<BulbOutlined />}>
                    <Link to={ROUTES.IDEAS}>Ideas</Link>
                </Menu.Item>
                <Menu.Item key={ROUTES.PROPOSALS} icon={<FormOutlined />}>
                    <Link to={ROUTES.PROPOSALS}>Proposals</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default withRouter(Sidemenu)