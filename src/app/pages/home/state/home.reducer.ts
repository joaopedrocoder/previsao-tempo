import { Action, createReducer, on } from "@ngrx/store"

import * as fromHomeActions from './home.actions';
import * as fromHomeSelectors from './home.selectors';

export interface HomeState {
  entity: any
  loading: boolean
  error: boolean
}

export const homeInitialState: HomeState  = {
  entity: undefined,
  loading: false,
  error: false  
}

const reducer = createReducer(
  homeInitialState,
  on(fromHomeActions.loadCurrentyWeather, state => ({
    ...state,
    loading: true,
    error: false
  })),
  on(fromHomeActions.loadCurrentyWeatherSuccess, (state, {entity}) => ({
    ...state,
    entity,
    loading: false,
  })),
  on(fromHomeActions.loadCurrentyWeatherFailed, state => ({
    ...state,
    loading: false,
    error: true
  }))
)

export function homeReducer(state: HomeState | undefined, action: Action): HomeState {
  return reducer(state, action)
}