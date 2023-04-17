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

  // cautarea latitudinii / longitudinii actuale
  getLocationService(): Promise<any> {
    return new Promise((res, error) => {
      navigator.geolocation.getCurrentPosition(data => {
        res({ lon: data.coords.longitude, lat: data.coords.latitude })
      })
    })
  }

  // cautarea orasului in functie de latitudine/ longitudine
  getCityService(lat: number, lon: number): Observable<any> {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=129fe5173bd0c4c830ba6e766b567567"
    )
  }

  // importarea datelor despre vreme (1 zi)
  getWeatherService(searchCity: string): Observable<any> {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=129fe5173bd0c4c830ba6e766b567567&units=metric"
    )
  }

  // importarea datelor despre vreme (5 zile / 3 h)
  get5DaysWeatherService(searchCity: string) {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=129fe5173bd0c4c830ba6e766b567567&units=metric"
    )
  }
}
