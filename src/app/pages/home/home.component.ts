import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromHomeActions from './state/home.actions';
import * as fromHomeSelectors from './state/home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchControl: FormControl = new FormControl('', Validators.required)
  city: string = ''

  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    this.store.pipe(select(fromHomeSelectors.selectHomeCity))
      .subscribe({
        next: (city: string) => this.city = city
      })
  }

  searchWeather(): void {
    const city = this.searchControl.value
    this.searchControl.reset()
  }
}
