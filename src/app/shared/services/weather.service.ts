import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeatherService(searchCity: string): Observable<any> {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=129fe5173bd0c4c830ba6e766b567567&units=metric"
    )
  }

  get5DaysWeatherService(searchCity: string) {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=129fe5173bd0c4c830ba6e766b567567&units=metric"
    )
  }
}
