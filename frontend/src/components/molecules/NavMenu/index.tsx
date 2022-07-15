import { FunctionComponent, memo } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Menu } from 'antd'

import { AnnimatedHambugerIcon } from '@components/atoms/AnnimatedHambugerIcon'


import { toStyledModuleNames } from '@utils/styledModuleName'
import style from './styles.module.scss'
import { useClassnames } from '@hooks/useClassnames'

const styledModule = toStyledModuleNames(style)

type NavMenuProps = {
  items?: Array<{
    id: number
    label: string,
    items: Array<MenuItem>
  }>
  collapsed: boolean
  onSwitchCollapsed: () => void
}

type MenuItem = {
  id: number
  label: string
  path: string
  iconName: string
  sub: Array<MenuItem>
  managerOnly?: boolean
  closeByDefault?: boolean
}

type NavMenuItemProps = {
  label: string
  items: Array<MenuItem>

  divider?: boolean
}

export const NavMenuItem = (props: NavMenuItemProps) => {
  const { label, items, divider } = props

  const navigate = useNavigate()

  const location = useLocation()

  const headerStateClass = useClassnames(
    {
      divider,
    },
    true
  )
  const paths = location.pathname.slice(1).split('/')
  let current = location.pathname
  if (paths.length > 1 && paths[1].match(/^[0-9]+$/)) {
    current = '/' + paths[0]
  }
  return (
    <>
      <div className={styledModule(`header ${headerStateClass}`)}>
        <span>{label}</span>
      </div>
      <div className={styledModule`container`}>
        <Menu
          style={{ borderRight: 0 }}
          activeKey={current}
          selectedKeys={[current]}
          triggerSubMenuAction='click'
          mode='inline'
        >
          {items.map((it) =>
          (
            <Menu.Item
              className={styledModule`menu-item`}
              key={it.path}
              icon={
                <div className={styledModule`icon`}>

                </div>
              }
              onClick={() => navigate(it.path)}
            >
              <div className={styledModule`label`}>{it.label}</div>
            </Menu.Item>
          )
          )}
        </Menu>
      </div>
    </>
  )
}

export const NavMenu: FunctionComponent<NavMenuProps> = memo((props) => {
  const { items = [], collapsed, onSwitchCollapsed } = props
  const stateClassName = useClassnames(
    {
      collapsed,
    },
    true
  )
  return (
    <div className={styledModule(`root ${stateClassName}`)}>
      <div className={styledModule`header switch`}>
        <AnnimatedHambugerIcon
          animated={!collapsed}
          onClick={onSwitchCollapsed}
        />
      </div>
      {items.map(({ id, ...it }) => (
        <NavMenuItem key={id} divider={id !== 1} {...it} />
      ))}
    </div>
  )
})
