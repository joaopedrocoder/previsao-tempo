import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { catchError, map, mergeMap } from "rxjs";
import * as fromHomeActions from './home.actions'
import { WeatherService } from "../../../shared/services/weather.service";

@Injectable()
export class HomeEffects {
  loadCurrentyWeather$ = createEffect(() => this.actions$.pipe(
    ofType(fromHomeActions.loadCurrentyWeather),
    mergeMap(({query}) => this.weatherService.getCityWeatherByQuery(query)),
    catchError((err, caugth$) => {
      this.store.dispatch(fromHomeActions.loadCurrentyWeatherFailed())
      return caugth$
    }),
    map((entity: any) => fromHomeActions.loadCurrentyWeatherSuccess({entity}))
  ))

  constructor(
    private actions$: Actions,
    private store: Store,
    private weatherService: WeatherService
  ) {}
}