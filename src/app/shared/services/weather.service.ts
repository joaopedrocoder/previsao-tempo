import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { responseToCityWeather } from '../utils/response.utils';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getCityWeatherByQuery(query: string): Observable<any> {
    const params = new HttpParams({ fromObject: {q: query} })
    return this.doGet('weather', params).pipe(
      map(res => responseToCityWeather(res))
    )
  }

  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    params = params.append('appid', environment.apiKey)
    params = params.append('lang', 'pt_br')
    return this.http.get<T>(`https://api.openweathermap.org/data/2.5/${url}`, {params})
  }
}
