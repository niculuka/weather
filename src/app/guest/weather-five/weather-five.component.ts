import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { Weather } from '../../shared/model/weather.model';
import { CurrentLocationService } from 'src/app/shared/services/current-location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WallpaperService } from 'src/app/shared/services/wallpaper.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'weather-five',
  templateUrl: './weather-five.component.html',
  styleUrls: ['./weather-five.component.css']
})
export class WeatherFiveComponent implements OnInit, OnDestroy {

  myWeather5: Weather = new Weather();

  currentCity: any = "";
  searchCity: string = "";

  favorites: Weather[] = [];

  private sub0: any;
  private sub1: any;
  private sub2: any;
  private sub3: any;

  constructor(
    private currLocationService: CurrentLocationService,
    private weatherService: WeatherService,
    private wallpaperService: WallpaperService,
    private favoriteService: FavoriteService,
    private matSnackBar: MatSnackBar
  ) {
    this.sub0 = favoriteService.getFavoritesObservable().subscribe(data => {
      this.favorites = data;
    });
  }

  ngOnInit(): void {
    this.sub1 = this.currLocationService.getCurrentLocationObservable().subscribe(data => {
      this.myWeather5.lat = data.lat;
      this.myWeather5.lon = data.lon;
      if (this.myWeather5.lat == 0 || this.myWeather5.lon == 0) {
        this.currLocationService.getLocationService();
      }
      else {
        this.sub2 = this.currLocationService.getCurrentCityService(this.myWeather5.lat, this.myWeather5.lon).subscribe({
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
    this.sub3 = this.weatherService.get5DaysWeatherService(city).subscribe({
      next: (data: any) => {
        // console.log(data.list[0].weather[0].icon)
        this.myWeather5.currentCity = data.city.name;
        this.myWeather5.list = data.list;
        this.myWeather5.icon = data.list[0].weather[0].icon;
        this.myWeather5.background = this.wallpaperService.getWallpaper(this.myWeather5.icon);
        this.searchCity = "";
      },
      error: (error) => {
        this.matSnackBar.open("NOT CITY FOUND!", 'OK');
        console.log(error);
      }
    })
  }

  search() {
    if (this.searchCity.length >= 3) {
      this.get5DaysWeather(this.searchCity);
    }
    else {
      this.matSnackBar.open("INSERT MIN 3 CHARS!", 'OK');
    }
  }

  // FAVORITES ----------------------------------------------------------------------------
  isFavorite() {
    let city = this.favorites.find(item => item.currentCity == this.myWeather5.currentCity);
    if (city) {
      this.myWeather5.favorite = true;
    } else {
      this.myWeather5.favorite = false;
    }
  }

  getFavoriteCity(item: Weather) {
    this.get5DaysWeather(item.currentCity);
  }

  removeFavoriteCity(item: Weather) {
    this.favoriteService.removeFavoritesService(item);
    this.isFavorite();
  }

  // DESTROY ----------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.sub0?.unsubscribe();
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }
}
