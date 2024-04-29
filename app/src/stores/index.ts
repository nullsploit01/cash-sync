import { create } from 'zustand'

import { IEntryActions, IEntryState } from 'src/types/stores'

const useEntryStore = create<IEntryState & IEntryActions>((set) => ({
  entries: [],

  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] }))
}))

export default useEntryStore
