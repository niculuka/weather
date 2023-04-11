import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { OpenWeather5 } from '../model/open-weather.interface';

@Component({
  selector: 'weather-five-day',
  templateUrl: './weather-five-day.component.html',
  styleUrls: ['./weather-five-day.component.css']
})
export class WeatherFiveDayComponent implements OnInit{

  myWeather5: OpenWeather5 = new OpenWeather5();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    // this.getLocation();
    this.get5DaysWeather();
  }

  get5DaysWeather() {
    this.weatherService.get5DaysWeatherService().subscribe({
      next: (data: any) => {
        this.myWeather5 = data;
        console.log(this.myWeather5)

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
