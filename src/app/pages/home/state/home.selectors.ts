import { createAction, createFeatureSelector, createSelector, props } from "@ngrx/store";
import { HomeState } from "./home.reducer";
import { Bookmark } from "../../../shared/models/bookmark.model";

export const selectHomeState = createFeatureSelector<HomeState>('home')

export const selectCurrentWeather = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.entity
)

export const selectCurrentWeatherLoading = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.loading
)

export const selectCurrentWeatherError = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.error
)

export const selectClearHomeState = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState
)