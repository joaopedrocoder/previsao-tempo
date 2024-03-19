import { Action, createReducer } from "@ngrx/store"

export interface HomeState {
  city: string
}

export const homeInitialState: HomeState  = {
  city: "Rio de Janeiro"  
}

const reducer = createReducer(homeInitialState)

export function homeReducer(state: HomeState | undefined, action: Action): HomeState {
  return reducer(state, action)
}