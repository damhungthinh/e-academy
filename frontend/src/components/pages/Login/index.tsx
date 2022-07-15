import { FunctionComponent, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { get as _get } from 'lodash'

import { Button, Card, Input, Checkbox, Typography, Form, Spin } from 'antd'
import {
  ArrowRightOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { Logo } from '@components/atoms/Logo'
import { AUTH_KEY } from '@enums/AppConst'
import { toStyledModuleNames } from '@utils/styledModuleName'

import style from './styles.module.scss'
import { RootState } from 'src/redux'

const styledModule = toStyledModuleNames(style)

type LoginProps = {
  account: string
  password: string
  remember: boolean
}

export const LoginPage: FunctionComponent = () => {
  const [form] = Form.useForm<LoginProps>()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { token, error } = useSelector((state: RootState) => state.auth)

  const isLoading = useSelector((state: RootState) => state.loading.global)


  // eslint-disable-next-line
  const [_, setCookie, removeCookie] = useCookies([AUTH_KEY])

  const handleFormSubmit = useCallback((value: LoginProps) => dispatch.auth.login(value), [dispatch])

  useEffect(() => {
    if (!!token) {
      if (form.getFieldValue('remember')) {
        console.log('Cookie was set')
        setCookie(AUTH_KEY, token, {
          maxAge: 1000 * 3600 * 24 * 7,
          sameSite: true,
        })
      } else {
        console.log('Cookie was removed')
        removeCookie(AUTH_KEY)
      }
      localStorage.setItem(AUTH_KEY, token)
      const { state } = location
      navigate(_get(state, 'form', '/'), { replace: true })
    }
    dispatch.auth.clearError()
    // eslint-disable-next-line
  }, [dispatch, token])
  console.log(process.env.REACT_APP_API_BASE_PATH)
  return (
    <div className={styledModule`root`}>
      <Card className={styledModule`login-wrapper`}>
        <div className={styledModule`logo-wrapper`}>
          <Logo />
        </div>
        <Spin spinning={isLoading}>
          <Typography.Title level={2}>Sign In</Typography.Title>
          <Form
            className={styledModule`form`}
            layout='vertical'
            size='middle'
            form={form}
            onFinish={handleFormSubmit}
          >
            <Form.Item
              name='account'
              label='Account'
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                type='text'
                prefix={
                  <UserOutlined className={styledModule`form-item-icon`} />
                }
                placeholder="Your username"
                name='account'
                disabled={isLoading}
              />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className={styledModule`form-item-icon`} />
                }
                placeholder="Your password"
                name='password'
                disabled={isLoading}
              />
            </Form.Item>
            <div className={styledModule`form-action`}>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox name='remeber' disabled={isLoading}>
                  Remember me
                </Checkbox>
              </Form.Item>
              <Button type='primary' htmlType='submit' disabled={isLoading}>
                Sign-in <ArrowRightOutlined />
              </Button>
            </div>
          </Form>
        </Spin>
      </Card>
      <Typography.Paragraph type='danger' strong>
        {error?.reason}
      </Typography.Paragraph>
    </div>
  )
}
