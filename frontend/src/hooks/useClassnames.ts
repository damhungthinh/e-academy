import { useMemo } from 'react'
import { ScalableEntity } from '@entity/Base'

/**
 * Convert Camel case to Kebab case
 * Ex: someStringValue -> some-string-value
 *
 * @param value - the camel case
 * @returns the kebab-case
 */
const toKebabCase = (value: string) => {
  if (!value) return ''

  return value
    .split('')
    .map((it) => (it.match(/^[A-Z]*$/) ? `-${it.toLowerCase()}` : it))
    .join('')
}

/**
 * Convert an object to css class name
 * Note: only re-generation class name when value in params was changed.
 *
 * @param style - the css styling object
 * @param usePropName - use prop's name as css class name
 * @returns a single string of css class name from styled object
 */
export const useClassnames = (
  style: ScalableEntity,
  usePropName: boolean = false
) => useMemo(
  () => {
    const styling = usePropName
      // use style's value for generation class name
      ? Object.keys(style).filter((it) => style[it])

      // use style's props name has value for generation class name
      : Object.values(style).filter(Boolean)

    // Map to module class name
    return styling.map((it) => toKebabCase(it)).join(' ')
  },
  [style, usePropName]
)
