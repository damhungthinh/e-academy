export type Updater = {
  updatedBy: string
  updatedAt: string
}

export type Deleter = {
  deletedBy: string
  deletedAt: string
}

export type Creator = {
  createdBy: string
  createdAt: string
}

export type Identifier = {
  id: string | number
  active: boolean
}

export type FullAuthorizeEntity = Identifier & Creator & Updater & Deleter

export type BasicEntity = Creator & {
  id: string | number
  active: boolean
}
