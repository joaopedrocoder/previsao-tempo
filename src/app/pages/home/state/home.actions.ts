import { createAction, props } from "@ngrx/store";

export const loadCurrentyWeather = createAction(
  '[Home] Load Currenty Weather',
  props<{query: string}>()
)

export const loadCurrentyWeatherSuccess = createAction(
  '[Weather API] Load Currenty Weather Success',
  props<{entity: any}>()
)

export const loadCurrentyWeatherFailed = createAction(
  '[Weather API] Load Currenty Weather Failed'
)
