import { createAction, props } from "@ngrx/store";
import { Bookmark } from "../../../shared/models/bookmark.model";

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

export const toggleBookmark = createAction(
  '[Home] Toggle Bookmark',
  props<{entity: Bookmark}>()
)

export const clearHomeState = createAction(
  '[Home] Clear State'
)
