import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { OpenWeather5 } from '../model/open-weather.interface';

@Component({
  selector: 'weather-five-day',
  templateUrl: './weather-five-day.component.html',
  styleUrls: ['./weather-five-day.component.css']
})
export class WeatherFiveDayComponent implements OnInit {

  image: string = "assets/images/day.jpg"

  myWeather5: OpenWeather5 = new OpenWeather5();
  searchCity: string = "";

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
    // this.get5DaysWeather();
  }

  onSubmit() {
    if (!this.searchCity) {
      alert("NO CITY CHOOSE!");
    } else {
      this.get5DaysWeather();
      this.searchCity = "";
    }
  }

  getLocation() {
    this.weatherService.getLocationService().then(location => {
      this.myWeather5.lat = location.lat;
      this.myWeather5.lon = location.lon;
      this.getCity(this.myWeather5.lat, this.myWeather5.lon);
    })
  }

  getCity(lat: number, lon: number) {
    this.weatherService.getCityService(lat, lon).subscribe({
      next: (data) => {
        let anyWeather = data;
        // console.log(anyWeather)
        this.myWeather5.localCity = anyWeather.name;
        this.myWeather5.currentCity = anyWeather.name;
        this.get5DaysWeather();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  get5DaysWeather() {
    if (!this.searchCity) {
      this.myWeather5.lastCity = this.myWeather5.currentCity;
    } else {
      this.myWeather5.lastCity = this.searchCity;
    }
    this.weatherService.get5DaysWeatherService(this.myWeather5.lastCity).subscribe({
      next: (data: any) => {
        this.myWeather5 = data;
        this.myWeather5.currentCity = this.myWeather5.city.name;
        let aaa: any = this.myWeather5.list[0].weather;
        // console.log(aaa[0].icon)
        this.myWeather5.iconCode = aaa[0].icon;
        this.getWallpaper();
      },
      error: (error) => {
        console.log(error);
        alert("CITY NOT FOUND!");
      }
    })
  }

  getWallpaper() {
    switch (this.myWeather5.iconCode) {
      case "01d": this.myWeather5.backgroundImage = "assets/images/day01.jpg";
        break;
      case "02d": this.myWeather5.backgroundImage = "assets/images/day02.jpg";
        break;
      case "03d": this.myWeather5.backgroundImage = "assets/images/day03.jpg";
        break;
      case "04d": this.myWeather5.backgroundImage = "assets/images/day04.jpg";
        break;
      case "09d": this.myWeather5.backgroundImage = "assets/images/day09.jpg";
        break;
      case "10d": this.myWeather5.backgroundImage = "assets/images/day10.jpg";
        break;
      case "11d": this.myWeather5.backgroundImage = "assets/images/day11.jpg";
        break;
      case "13d": this.myWeather5.backgroundImage = "assets/images/day13.jpg";
        break;
      case "50d": this.myWeather5.backgroundImage = "assets/images/day50.jpg";
        break;
      case "01n": this.myWeather5.backgroundImage = "assets/images/night.jpg";
        break;
      default:
        this.myWeather5.backgroundImage = "assets/images/day.jpg";
    }
    console.log(this.myWeather5.iconCode)
  }

}
