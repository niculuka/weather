import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { Weather } from 'src/app/shared/model/weather.model';
import { LastFoundService } from '../../shared/services/last-found.service';
import { FavoriteService } from '../../shared/services/favorite.service';
import { CurrentLocationService } from 'src/app/shared/services/current-location.service';
import { WallpaperService } from 'src/app/shared/services/wallpaper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  myWeather1: Weather = new Weather();

  currentCity: any = "";
  searchCity: string = "";

  favorite: Weather = new Weather();
  favorites: Weather[] = [];

  lastFound: Weather = new Weather();
  lastFounds: Weather[] = [];

  private sub0: any;
  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;

  constructor(
    private currLocationService: CurrentLocationService,
    private weatherService: WeatherService,
    private wallpaperService: WallpaperService,
    private lastFoundService: LastFoundService,
    private favoriteService: FavoriteService,
    private matSnackBar: MatSnackBar
  ) {
    this.sub0 = favoriteService.getFavoritesObservable().subscribe(data => {
      this.favorites = data;
    });
    this.sub1 = lastFoundService.getLastFoundsObservable().subscribe(data => {
      this.lastFounds = JSON.parse(JSON.stringify(data)).reverse();
    });

  }

  ngOnInit(): void {
    this.sub2 = this.currLocationService.getCurrentLocationObservable().subscribe(data => {
      this.myWeather1.lat = data.lat;
      this.myWeather1.lon = data.lon;
      if (this.myWeather1.lat == 0 || this.myWeather1.lon == 0) {
        this.currLocationService.getLocationService();
      }
      else {
        this.sub3 = this.currLocationService.getCurrentCityService(this.myWeather1.lat, this.myWeather1.lon).subscribe({
          next: (data) => {
            this.currentCity = data.name;
            this.getWeather(data.name);
          },
          error: (error) => {
            this.matSnackBar.open("SERVER ERROR!", 'OK');
            console.log(error);
          }
        })
      }
    });
  }

  // WEATHER ----------------------------------------------------------------------------
  getWeather(city: string) {
    this.sub4 = this.weatherService.getWeatherService(city).subscribe({
      next: (data) => {
        this.myWeather1.currentCity = data.name;
        this.myWeather1.feelsLike = data.main.feels_like;
        this.myWeather1.humidity = data.main.humidity;
        this.myWeather1.pressure = data.main.pressure;
        this.myWeather1.temperature = data.main.temp;
        this.myWeather1.summary = data.weather[0].main;
        this.myWeather1.iconCode = data.weather[0].icon;
        this.myWeather1.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather1.iconCode + '@2x.png';
        this.myWeather1.backgroundImage = this.wallpaperService.getWallpaper(this.myWeather1.iconCode);
        this.searchCity = "";
        this.isFavorite();
        this.addToLastsFound();
      },
      error: (error) => {
        this.matSnackBar.open("NOT CITY FOUND!", 'OK');
        console.log(error);
      }
    })
  }

  search() {
    if (this.searchCity.length >= 3) {
      this.getWeather(this.searchCity);
    }
    else {
      this.matSnackBar.open("INSERT MIN 3 CHARS!", 'OK');
    }
  }

  resetCurrentLocation() {
    this.currLocationService.resetCurrentLocationService();
  }

  isCurrentCity() {
    return this.currentCity == this.myWeather1.currentCity;
  }

  // FAVORITES ----------------------------------------------------------------------------
  setFavorite(item: Weather) {
    if (this.favorites.length >= 5 && !item.favorite) {
      this.matSnackBar.open("MAXIM 5 FAVORITES CITIES!", 'OK');
      return;
    }
    item.favorite = !item.favorite;
    this.favorite = new Weather();
    this.favorite.currentCity = item.currentCity;
    this.favorite.temperature = item.temperature;
    if (item.favorite) {
      this.favoriteService.addToFavoriteService(this.favorite);
    }
    else {
      this.favoriteService.removeFavoritesService(this.favorite);
    }
  }

  isFavorite() {
    let city = this.favorites.find(item => item.currentCity == this.myWeather1.currentCity);
    if (city) {
      this.myWeather1.favorite = true;
    } else {
      this.myWeather1.favorite = false;
    }
  }

  getFavoriteCity(item: Weather) {
    this.getWeather(item.currentCity);
  }

  removeFavoriteCity(item: Weather) {
    this.favoriteService.removeFavoritesService(item);
    this.isFavorite();
  }

  // HISTORY ----------------------------------------------------------------------------
  addToLastsFound() {
    if (this.currentCity == this.myWeather1.currentCity) return;
    this.lastFound = new Weather();
    this.lastFound.currentCity = this.myWeather1.currentCity;
    this.lastFound.humidity = this.myWeather1.humidity;
    this.lastFound.pressure = this.myWeather1.pressure;
    this.lastFound.temperature = this.myWeather1.temperature;
    this.lastFound.summary = this.myWeather1.summary;
    this.lastFoundService.addToLastFoundsService(this.lastFound)
  }

  getLastFound(item: Weather) {
    this.getWeather(item.currentCity);
  }

  clearLastFound() {
    this.lastFoundService.clearLastFoundService();
  }

  // DESTROY ----------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.sub0?.unsubscribe();
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }
}
