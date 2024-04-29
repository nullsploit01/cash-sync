import { create } from 'zustand'

import { EntryTypes } from 'src/constants/entry-types'
import { IEntryActions, IEntryState } from 'src/types/stores'

const useEntryStore = create<IEntryState & IEntryActions>((set) => ({
  entries: [],
  netWorth: {
    netBalance: 0,
    totalIn: 0,
    totalOut: 0
  },
  addEntry: (entry) => {
    set((state) => {
      const entries = [...state.entries, entry]

      let netBalance = 0
      let totalIn = 0
      let totalOut = 0

      entries.forEach((entry) => {
        const amount = parseFloat(entry.amount)
        if (!isNaN(amount)) {
          if (entry.type === EntryTypes.cashIn) {
            totalIn += amount
          } else if (entry.type === EntryTypes.cashOut) {
            totalOut += amount
          }
        }
      })

      netBalance = totalIn - totalOut

      return {
        entries,
        netWorth: {
          netBalance,
          totalIn,
          totalOut
        }
      }
    })
  }
}))

export default useEntryStore
