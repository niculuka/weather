import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { Weather1 } from 'src/app/shared/model/weather1.model';
import { LastFound, LastFoundList } from '../../shared/model/last-found.model';
import { LastFoundService } from '../../shared/services/last-found.service';
import { Favorite } from '../../shared/model/favorite.model';
import { FavoriteService } from '../../shared/services/favorite.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { WallpaperService } from 'src/app/shared/services/wallpaper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  myWeather1: Weather1 = new Weather1();
  searchCity: string = "";

  favorite: Favorite = new Favorite();
  favorites: Array<Favorite> = [];

  lastFound!: LastFound;
  lastFoundList!: LastFoundList;

  private sub0: any;
  private sub1: any;
  private sub2: any;
  private sub3: any;
  private sub4: any;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private wallpaperService: WallpaperService,
    private lastFoundService: LastFoundService,
    private favoriteService: FavoriteService,
    private matSnackBar: MatSnackBar
  ) {
    this.sub0 = favoriteService.getFavoriteListObservable().subscribe(data => {
      this.favorites = data;
      console.log(this.favorites)
    });
    this.sub1 = lastFoundService.getLastFoundListObservable().subscribe(data => {
      this.lastFoundList = data;
    });

  }

  ngOnInit(): void {
    this.sub2 = this.locationService.getCurrentLocationObservable().subscribe(data => {
      this.myWeather1.lat = data.lat;
      this.myWeather1.lon = data.lon;
      if (this.myWeather1.lat == 0 || this.myWeather1.lon == 0) {
        this.locationService.getLocationService();
      }
      else {
        this.sub3 = this.locationService.getCityService(this.myWeather1.lat, this.myWeather1.lon).subscribe({
          next: (data) => {
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
        this.isFavorite();
        // this.addToLastFound(this.myWeather)
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



  setFavorite(item: Weather1) {
    if (this.favorites.length > 4 && !item.favorite) {
      this.matSnackBar.open("MAX 5 FAVORITES CITIES ALLOWED!", 'OK');
      return;
    }
    item.favorite = !item.favorite;
    this.favorite = new Favorite();
    this.favorite.currentCity = item.currentCity;
    this.favorite.temperature = item.temperature;
    if (item.favorite) {
      this.favoriteService.addToFavoriteService(this.favorite);
    }
    else {
      this.favoriteService.removeFavoriteCityService(this.favorite);
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




  // getFavoriteCity(item: Favorite) {
  //   this.searchCity = item.currentCity;
  //   this.search();
  // }

  // removeFavoriteCity(item: Favorite) {
  //   this.favoriteService.removeFavoriteCityService(item)
  //   // console.log(item.currentCity)
  //   this.isFavorite();
  // }

  // clearFavoritesList() {
  //   this.lastFoundService.clearLastFoundService();
  // }





  addToLastFound(item: Weather1) {
    this.lastFound = new LastFound();
    this.lastFound.currentCity = item.currentCity;
    this.lastFound.humidity = item.humidity;
    this.lastFound.pressure = item.pressure;
    this.lastFound.summary = item.summary;
    this.lastFound.temperature = item.temperature;
    this.lastFoundService.addToLastFoundService(this.lastFound)
  }

  getLastFound(item: LastFound) {
    this.searchCity = item.currentCity;
    this.search();
  }

  ngOnDestroy(): void {
    this.sub0?.unsubscribe();
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }
}
