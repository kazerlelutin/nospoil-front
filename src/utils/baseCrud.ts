import { CrudActions } from '@/types/crud'

/**
 * @description
 * The `BASE_ACTION` object is the base for all actions in the CRUD system.
 */
export const BASE_ACTION = {
  data: undefined,
  loading: false,
  error: null,
  action: async () => {
    throw new Error('Not implemented')
  },
}

/**
 * @description
 * The `BASE_CRUD` object is the base for all CRUD actions.
 */
export const BASE_CRUD: CrudActions<undefined> = {
  create: BASE_ACTION,
  delete: BASE_ACTION,
  getItem: BASE_ACTION,
  getList: BASE_ACTION,
  update: BASE_ACTION,
}
