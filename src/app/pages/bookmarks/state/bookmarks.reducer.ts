import { createReducer, Action, on } from "@ngrx/store";
import { Bookmark } from "../../../shared/models/bookmark.model";

import * as fromHomeActions from "../../home/state/home.actions"
import * as fromBookmarkActions from "./bookmarks.actions"

export interface BookmarkState {
  list: Bookmark[]
}

export const bookmarkInitialState: BookmarkState = {
  list: []
}

const reducer = createReducer(
  bookmarkInitialState,
  on(fromHomeActions.toggleBookmark, (state, {entity}) => ({
    ...state,
    list: toggleBookmark(state.list, entity)
  })),
  on(fromBookmarkActions.removeBookmark, (state, {id}) => ({
    ...state,
    list: state.list.filter(b => b.id !== id)
  }))
)

export function bookmarkReducer(state: BookmarkState | undefined, action: Action): BookmarkState{
  return reducer(state, action)
}

function toggleBookmark(list: Bookmark[], entity: Bookmark): Bookmark[] {
  if(list.find(bookmarkItem => bookmarkItem.id === entity.id)) {
    return list.filter(bookmarkItem => bookmarkItem.id !== entity.id)
  }

  return [...list, entity]
}