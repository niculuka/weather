import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { OpenWeather } from 'src/app/model/open-weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  image: string = "assets/images/day.jpg"

  myWeather: OpenWeather = new OpenWeather();
  searchCity: string = "";  

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  onSubmit() {
    this.getWeather();
    this.searchCity = "";
  }

  onUnitChange() {
    if (this.myWeather.units == "metric") {
      this.myWeather.units = "imperial"
    } else {
      this.myWeather.units = "metric"
    }
    if (this.myWeather.localCity !== "") {
      if (this.myWeather.localCity == this.myWeather.currentCity) {
        this.getWeatherInit(this.myWeather.lat, this.myWeather.lon);
      } else {
        this.getWeather();
      }
    } else {
      alert("NO CITY CHOOSE!")
    }
  }

  getLocation() {
    this.weatherService.getLocationService().then(location => {
      this.myWeather.lat = location.lat;
      this.myWeather.lon = location.lon;
      this.getWeatherInit(this.myWeather.lat, this.myWeather.lon);
    })
  }

  getWeatherInit(lat: number, lon: number) {
    this.weatherService.getWeatherInitService(lat, lon).subscribe({
      next: (data) => {
        let anyWeather = data;
        // console.log(openWeather)
        this.myWeather.localCity = anyWeather.name;
        this.myWeather.currentCity = anyWeather.name;
        this.getWeather();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getWeather() {
    if (!this.searchCity) {
      this.myWeather.lastCity = this.myWeather.currentCity;
    } else {
      this.myWeather.lastCity = this.searchCity;
    }
    this.weatherService.getWeatherService(this.myWeather.lastCity, this.myWeather.units).subscribe({
      next: (data) => {
        let anyWeather = data;
        // console.log(openWeather)
        this.myWeather.currentCity = anyWeather.name;
        this.myWeather.feelsLike = anyWeather.main.feels_like;
        this.myWeather.humidity = anyWeather.main.humidity;
        this.myWeather.pressure = anyWeather.main.pressure;
        this.myWeather.temperature = anyWeather.main.temp;
        this.myWeather.summary = anyWeather.weather[0].main;
        this.myWeather.iconURL = 'https://openweathermap.org/img/wn/' + anyWeather.weather[0].icon + '@2x.png';
      },
      error: (error) => {
        console.log(error);
        alert("CITY NOT FOUND!");
      }
    })
  }

  

}
