import { Store, select } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { Bookmark } from '../../shared/models/bookmark.model';
import { Subject, takeUntil } from 'rxjs';
import * as fromBookmarksSelectors from './state/bookmarks.selectors'
import * as fromBookmarksActions from './state/bookmarks.actions'

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {
  favorites: Bookmark[] = []
  componentDestroyed$ = new Subject()
  store = inject(Store)

  constructor(){}

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromBookmarksSelectors.selectBookmarksList),
        takeUntil(this.componentDestroyed$)
      ).subscribe({
        next: res => this.favorites = res,
        error: err => console.log(err)
      })
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null)
    this.componentDestroyed$.unsubscribe()
  }

  removeFavoriteFromList(id: number): void {
    this.store.dispatch(fromBookmarksActions.removeBookmark({id}))
  }
}
