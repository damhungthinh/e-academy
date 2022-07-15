/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Layout } from 'antd'
import { Logo } from '@components/atoms/Logo'

import { Copyright } from '@components/atoms/Copyright'
import { Dispatch, RootState } from 'src/redux'

import { useClassnames } from '@hooks/useClassnames'
import { toStyledModuleNames } from '@utils/styledModuleName'
import style from './styles.module.scss'
import { NavMenu } from '@components/molecules/NavMenu'
import { LogoutOutlined } from '@ant-design/icons'
import { useCallback } from 'react'

const styledModule = toStyledModuleNames(style)

const { Sider, Content, Footer, Header } = Layout

export const SidebarLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch<Dispatch>()

  const { token, error: authError } = useSelector(
    (state: RootState) => state.auth
  )

  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0)

  }, [location.pathname])

  useLayoutEffect(() => {
    if (!token) {
      dispatch.auth.verify()
    } else {
      dispatch.auth.clearError()
    }
  }, [token])

  const handleLogout = useCallback(() => dispatch.auth.logOut(), [dispatch])
  const wrapperClassname = useClassnames({ wrapper: true, collapsed }, true)

  // if (authError) {
  //   return <Navigate to='/login' state={{ from: location }} />
  // }

  return (
    <Layout className={styledModule`root`}>
      <Header className={styledModule`header`}>
        <Logo />
        <Button type='link' onClick={handleLogout}>
          Logout
          <LogoutOutlined />
        </Button>
      </Header>
      <Layout className={styledModule(wrapperClassname)}>
        <Sider
          className={styledModule`side-bar`}
          width={300}
          trigger={null}
          collapsible
          collapsedWidth={80}
          collapsed={collapsed}
        >
          <NavMenu
            collapsed={collapsed}
            onSwitchCollapsed={() => setCollapsed(!collapsed)}
          />
        </Sider>
        <Content>
          <Layout className={styledModule`container`}>
            <Content>
              {token && <Outlet />}
            </Content>
            <Footer>
              <Copyright />
            </Footer>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  )
}
