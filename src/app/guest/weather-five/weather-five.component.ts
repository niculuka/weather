import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { Weather } from '../../shared/model/weather.model';
import { CurrentLocationService } from 'src/app/shared/services/current-location.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'weather-five',
  templateUrl: './weather-five.component.html',
  styleUrls: ['./weather-five.component.css']
})
export class WeatherFiveComponent implements OnInit, OnDestroy {

  myWeather5: Weather = new Weather();

  currentCity: any = "";
  searchCity: string = "";

  private sub0: any;
  private sub1: any;
  private sub2: any;

  constructor(
    private currLocationService: CurrentLocationService,
    private weatherService: WeatherService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.sub0 = this.currLocationService.getCurrentLocationObservable().subscribe(data => {
      this.myWeather5.lat = data.lat;
      this.myWeather5.lon = data.lon;
      if (this.myWeather5.lat == 0 || this.myWeather5.lon == 0) {
        this.currLocationService.getLocationService();
      }
      else {
        this.sub1 = this.currLocationService.getCurrentCityService(this.myWeather5.lat, this.myWeather5.lon).subscribe({
          next: (data) => {
            this.currentCity = data.name;
            this.get5DaysWeather(data.name);
          },
          error: (error) => {
            this.matSnackBar.open("SERVER ERROR!", 'OK');
            console.log(error);
          }
        })
      }
    });
  }

  // WEATHER 5 --------------------------------------------------------------------------
  get5DaysWeather(city: string) {
    this.sub2 = this.weatherService.get5DaysWeatherService(city).subscribe({
      next: (data: any) => {
        console.log(data)
        this.myWeather5.currentCity = data.city.name;
        this.myWeather5.list = data.list;


        this.getWallpaper();
        
      },
      error: (error) => {
        console.log(error);
        alert("CITY NOT FOUND!");
      }
    })
  }

  onSubmit() {
    // if (!this.searchCity) {
    //   alert("NO CITY CHOOSE!");
    // } else {
    //   this.get5DaysWeather();
    //   this.searchCity = "";
    // }
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
    // console.log(this.myWeather5.iconCode)
  }

    // DESTROY ----------------------------------------------------------------------------
    ngOnDestroy(): void {
      this.sub0?.unsubscribe();
      this.sub1?.unsubscribe();
      this.sub2?.unsubscribe();
    }
}
