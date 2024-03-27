import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CityWeather } from '../../../../shared/models/weather.mode';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
  // muda a estrategia de detecção de mudança. Só verificará quando houver uma mudança no @Input ou em alguma outra propriedade
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CurrentWeatherComponent {
  @Input() cityWeather: CityWeather | undefined
  @Input() isFavorite: boolean | null = false
  @Output() toggleBookmark = new EventEmitter() 

  faStar = faStar

  ngOnInit(): void {
    console.log('CARD',this.isFavorite)
  }

  get cityName(): string {
    return `${this.cityWeather?.city?.name} - ${this.cityWeather?.city?.country}`
  }

  onToggleBookmark(): void {
    this.isFavorite = !this.isFavorite

    this.toggleBookmark.emit()
  }
}
