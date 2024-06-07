import { createContext, useContext, useEffect } from "react"
import { LeadsStore, LeadsStoreModel } from "../RootStore"

/**
 * Create the initial (empty) global RootStore instance here.
 *
 */
const _rootStore = LeadsStoreModel.create({
  Prospects: [],
})

/**
 * The RootStoreContext provides a way to access
 * the RootStore in any screen or component.
 */
const RootStoreContext = createContext<LeadsStore>(_rootStore)

export const RootStoreProvider = RootStoreContext.Provider

export const useStores = () => useContext(RootStoreContext)

/**
 * Used only in the app.tsx file, this hook sets up the RootStore
 * @param {() => void | Promise<void>} callback - an optional callback that's invoked once the store is ready
 * @returns {object} - the RootStore and rehydrated state
 */
export const useInitialRootStore = (callback?: () => void | Promise<void>) => {
  const rootStore = useStores()

  useEffect(() => {
    ;(async () => {
      if (callback) callback()
    })()
  }, [])

  return { rootStore }
}
