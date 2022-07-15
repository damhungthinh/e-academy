import { memo } from 'react'

import { Space, Typography } from 'antd'
import { HeartFilled } from '@ant-design/icons'

export const Copyright = memo(() => (
  <Space>
    Copyright ©2021 All rights reserved | This system is made with
    <Typography.Text type='danger'>
      <HeartFilled />
    </Typography.Text>
    by
    <Typography.Title level={5} style={{ margin: 0 }}>
      Edward.D
    </Typography.Title>
  </Space>
), () => true)
