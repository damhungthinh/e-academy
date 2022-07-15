/**
 * Base
 * Use to storeage options values
 */
export type ScalableEntity = {
  readonly [propName: string]: any
}

/**
 * Catgegory entity
 * Use to storeage options values
 */
export type Category = {
  id: string | number
  name: string
}

export type Entity = Category & {
  content: string
  active: boolean
}

export type RouterParams = { id: string }

export type ValueChanged = {
  name: string
  value: string | number | boolean | Category
}
