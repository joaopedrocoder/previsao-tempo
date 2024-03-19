import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchControl: FormControl = new FormControl('', Validators.required)

  ngOnInit(): void {
    
  }

  searchWeather(): void {
    console.log()
  }
}
