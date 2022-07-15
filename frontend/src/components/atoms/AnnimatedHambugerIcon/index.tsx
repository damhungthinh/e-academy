import { useClassnames } from '@hooks/useClassnames'
import { toStyledModuleNames } from '@utils/styledModuleName'
import style from './styles.module.scss'

const styledModule = toStyledModuleNames(style)

type AnnimatedHambugerIconProps = {
  animated?: boolean
  onClick?: () => void
}

export const AnnimatedHambugerIcon = (props: AnnimatedHambugerIconProps) => {
  const { animated, onClick } = props

  const stateClassName = useClassnames(
    {
      animated,
      clickable: !!onClick,
    },
    true
  )

  return (
    <div
      className={styledModule(`root ${stateClassName}`)}
      onClick={onClick}
    >
      <div className={styledModule`container`}>
        <div className={styledModule`liner`} />
      </div>
    </div>
  )
}
