import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookmarkState } from "./bookmarks.reducer";

export const selectBookmarkState = createFeatureSelector<BookmarkState>('bookmarks')

export const selectBookmarksList = createSelector(
  selectBookmarkState,
  (bookmarksState: BookmarkState) => bookmarksState.list
)

