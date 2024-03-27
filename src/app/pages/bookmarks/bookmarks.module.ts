import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarksComponent } from './bookmarks.component';
import { StoreModule } from '@ngrx/store';
import { bookmarkReducer } from './state/bookmarks.reducer';
import { BtnRemoveComponent } from './components/btn-remove/btn-remove.component';


@NgModule({
  declarations: [
    BookmarksComponent,
    BtnRemoveComponent
  ],
  imports: [
    CommonModule,
    BookmarksRoutingModule,
    StoreModule.forFeature('bookmarks', bookmarkReducer),
  ]
})
export class BookmarksModule { }
