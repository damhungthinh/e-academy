import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from '@components/pages/404'
import { memo } from 'react'
import { LoginPage } from '@components/pages/Login'
import { Dashboard } from '@components/pages/Dashboard'
import { SidebarLayout } from '@components/layouts/SidebarLayout'

const ApplicationRouters = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SidebarLayout />}>
        <Route
          index
          element={<Dashboard />}
        />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  </BrowserRouter>
)

export default memo(ApplicationRouters, () => true)
