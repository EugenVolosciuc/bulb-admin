import React from 'react'
import { Layout } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons'

const { Header } = Layout

const HeaderComp = ({ menuCollapsed, setMenuCollapsed }) => {
    return (
        <Header style={{ backgroundColor: 'white', padding: '0' }}>
            <span style={{marginLeft: 24}}>
                {
                    menuCollapsed
                        ? <MenuUnfoldOutlined onClick={() => setMenuCollapsed(false)} />
                        : <MenuFoldOutlined onClick={() => setMenuCollapsed(true)} />
                }
            </span>
        </Header>
    )
}

export default HeaderComp