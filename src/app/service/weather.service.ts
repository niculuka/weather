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

  getWeatherInitService(lat: number, lon: number): Observable<any> {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=129fe5173bd0c4c830ba6e766b567567"
    )
  }

  getWeatherService(searchCity: string, units: string): Observable<any> {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=129fe5173bd0c4c830ba6e766b567567&units=" + units
    )
  }

  getLocationService(): Promise<any> {
    return new Promise((res, error) => {
      navigator.geolocation.getCurrentPosition(data => {
        res({ lon: data.coords.longitude, lat: data.coords.latitude })
      })
    })
  }

  get5DaysWeatherService() {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/forecast?q=Deva&appid=129fe5173bd0c4c830ba6e766b567567&units=metric"
      // "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=129fe5173bd0c4c830ba6e766b567567&units=" + units
    )
  }
}
