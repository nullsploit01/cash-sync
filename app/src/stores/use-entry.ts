import { create } from 'zustand'

import { EntryTypes } from 'src/constants/entry'
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
          if (entry.type === EntryTypes.CASH_IN) {
            totalIn += amount
          } else if (entry.type === EntryTypes.CASH_OUT) {
            totalOut += amount
          }
        }
      })

      netBalance = totalIn - totalOut

      return {
        entries: entries.sort((a, b) => b.enteredOn.getTime() - a.enteredOn.getTime()),
        netWorth: {
          netBalance,
          totalIn,
          totalOut
        }
      }
    })
  },
  updateEntry: (entry) => {
    set((state) => {
      const updatedEntries = state.entries.map((e) => (e.id === entry.id ? entry : e))

      let netBalance = 0
      let totalIn = 0
      let totalOut = 0

      updatedEntries.forEach((entry) => {
        const amount = parseFloat(entry.amount)

        if (!isNaN(amount)) {
          if (entry.type === EntryTypes.CASH_IN) {
            totalIn += amount
          } else if (entry.type === EntryTypes.CASH_OUT) {
            totalOut += amount
          }
        }
      })

      netBalance = totalIn - totalOut

      const sortedEntries = updatedEntries.sort(
        (a, b) => b.enteredOn.getTime() - a.enteredOn.getTime()
      )

      return {
        entries: sortedEntries,
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
