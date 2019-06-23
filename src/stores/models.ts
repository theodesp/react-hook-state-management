import { createModel, RematchDispatch } from '@rematch/core';

export type SharksState = number;

export const count: any = createModel({
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state: SharksState, payload: number) {
      return state + payload
    }
  },
  effects: (dispatch: RematchDispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload: number, rootState: any) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.count.increment(payload)
    }
  })
});
