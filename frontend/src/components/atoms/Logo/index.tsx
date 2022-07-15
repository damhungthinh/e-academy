import { memo, useCallback } from 'react'
import { useNavigate, } from 'react-router'
import { toStyledModuleNames } from '@utils/styledModuleName'

import style from './styles.module.scss'

const styledModule = toStyledModuleNames(style)

export const Logo = memo(() => {
  const navigate = useNavigate()

  // Only re-created function when navigate changed
  const handleBackToHome = useCallback(() => { navigate('/') }, [navigate])

  return (
    <div className={styledModule`root`} onClick={handleBackToHome}>
      E.Academy
    </div>
  )
}, () => true)
