import { create } from 'zustand'

import { IEntryActions, IEntryState } from 'src/types/stores'

const useEntryStore = create<IEntryState & IEntryActions>((set) => ({
  entries: [
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    },
    {
      amount: 69,
      remark: 'TEst',
      enteredOn: new Date(),
      type: 'online',
      balanceOnEntry: 420
    }
  ],
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] }))
}))

export default useEntryStore
