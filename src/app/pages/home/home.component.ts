import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromHomeActions from './state/home.actions';
import * as fromHomeSelectors from './state/home.selectors';
import * as fromBookmarksSelectors from '../bookmarks/state/bookmarks.selectors';
import { CityWeather } from '../../shared/models/weather.mode';
import { Observable, Subject, combineLatest, map, shareReplay, takeUntil } from 'rxjs';
import { Bookmark } from '../../shared/models/bookmark.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchControl: FormControl = new FormControl('', Validators.required)
  cityWeather$: Observable<CityWeather> = new Observable()
  cityWeather: CityWeather | undefined = undefined
  loading$: Observable<boolean> = new Observable()
  error$: Observable<boolean> = new Observable()
  isCurrentyFavorite$: Observable<boolean> = new Observable()
  bookmarksList$: Observable<Bookmark[]> = new Observable()

  private componentDestroyed$ = new Subject()

  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    this.cityWeather$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeather));
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(res => this.cityWeather = res);

    this.loading$ = this.store.pipe(
      shareReplay(),
      select(fromHomeSelectors.selectCurrentWeatherLoading)
    )

    this.error$ = this.store.pipe(
      shareReplay(),
      select(fromHomeSelectors.selectCurrentWeatherError)
    )

    this.bookmarksList$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarksList))

    this.isCurrentyFavorite$ = combineLatest([this.cityWeather$, this.bookmarksList$])
      .pipe(
        map(([current, bookmarksList]: any) => {
          if (!!current) {
            return bookmarksList.some((bookmark: Bookmark) => bookmark.id === current.city.id);
          }
          return false;
        }),
      );
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
