import React, { useState } from 'react'
import { Layout } from 'antd'

import Sidemenu from '../Navigation/Sidemenu.component'
import Header from '../Navigation/Header.component'

const { Content } = Layout

const MainLayout = ({ children }) => {
    const [menuCollapsed, setMenuCollapsed] = useState(false)

    const toggleMenu = () => setMenuCollapsed(!menuCollapsed)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidemenu menuCollapsed={menuCollapsed} setMenuCollapsed={toggleMenu} />
            <Layout>
                <Header menuCollapsed={menuCollapsed} setMenuCollapsed={toggleMenu} />
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout