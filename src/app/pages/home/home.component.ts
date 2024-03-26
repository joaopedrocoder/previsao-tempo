import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromHomeActions from './state/home.actions';
import * as fromHomeSelectors from './state/home.selectors';
import { CityWeather } from '../../shared/models/weather.mode';
import { Observable, Subject, shareReplay, takeUntil } from 'rxjs';
import { Bookmark } from '../../shared/models/bookmark.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchControl: FormControl = new FormControl('', Validators.required)
  cityWeather: CityWeather | undefined = undefined
  loading$: Observable<boolean> = new Observable()
  error$: Observable<boolean> = new Observable()

  private componentDestroyed$ = new Subject()

  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromHomeSelectors.selectCurrentWeather),
        takeUntil(this.componentDestroyed$)
      ).subscribe({
        next: res => this.cityWeather = res,
        error: err => console.log(err)
      })

    this.loading$ = this.store.pipe(
      shareReplay(),
      select(fromHomeSelectors.selectCurrentWeatherLoading)
    )

    this.error$ = this.store.pipe(
      shareReplay(),
      select(fromHomeSelectors.selectCurrentWeatherError)
    )
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null)
    this.componentDestroyed$.unsubscribe()
    this.store.dispatch(fromHomeActions.clearHomeState())
  }

  searchWeather(): void {
    const query = this.searchControl.value
    this.store.dispatch(fromHomeActions.loadCurrentyWeather({query}))
    this.searchControl.reset()
  }

  onToggleBookmark(): void {
    const bookmark = new Bookmark()
    bookmark.id = this.cityWeather?.city.id
    bookmark.name = this.cityWeather?.city.name
    bookmark.country = this.cityWeather?.city.country
    bookmark.coord = this.cityWeather?.city.coord

    this.store.dispatch(fromHomeActions.toggleBookmark({entity: bookmark}))
  }
}
