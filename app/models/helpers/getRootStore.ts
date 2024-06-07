import { getRoot, IStateTreeNode } from "mobx-state-tree"
import { LeadsStore, LeadsStoreModel } from "../RootStore"

/**
 * Returns a RootStore object in strongly typed way
 * for stores to access other stores.
 * @param {IStateTreeNode} self - The store instance.
 * @returns {RootStore} - The RootStore instance.
 */
export const getRootStore = (self: IStateTreeNode): LeadsStore => {
  return getRoot<typeof LeadsStoreModel>(self)
}
