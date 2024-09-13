import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { Weather1 } from 'src/app/shared/model/weather1.model';
import { LastFound, LastFoundList } from '../../shared/model/last-found.model';
import { LastFoundService } from '../../shared/services/last-found.service';
import { Favorite, FavoriteList } from '../../shared/model/favorite.model';
import { FavoriteService } from '../../shared/services/favorite.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  myWeather: Weather1 = new Weather1();
  searchCity: string = "";

  favorite!: Favorite;
  favoriteList!: FavoriteList;

  lastFound!: LastFound;
  lastFoundList!: LastFoundList;

  private sub0: any;
  private sub1: any;
  private sub2: any;
  private sub3: any;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private lastFoundService: LastFoundService,
    private favoriteService: FavoriteService,
    private toastrService: ToastrService
  ) {
    this.sub0 = favoriteService.getFavoriteListObservable().subscribe(data => {
      this.favoriteList = data;
    });
    this.sub1 = lastFoundService.getLastFoundListObservable().subscribe(data => {
      this.lastFoundList = data;
    });

  }

  ngOnInit(): void {
    this.locationService.getCurrentLocationObservable().subscribe(data => {
      this.myWeather.lat = data.lat;
      this.myWeather.lon = data.lon;
      if (this.myWeather.lat == 0 || this.myWeather.lon == 0) {
        this.locationService.getLocationService();
      }
      else {
        this.locationService.getCityService(this.myWeather.lat, this.myWeather.lon).subscribe({
          next: (data) => {
            this.getWeather(data.name);
          },
          error: (error) => {
            this.toastrService.warning("SERVER ERROR!");
            console.log(error);
          }
        })
      }
    });
  }

  getWeather(city: string) {
    this.weatherService.getWeatherService(city).subscribe({
      next: (data) => {
        this.myWeather.currentCity = data.name;
        this.myWeather.feelsLike = data.main.feels_like;
        this.myWeather.humidity = data.main.humidity;
        this.myWeather.pressure = data.main.pressure;
        this.myWeather.temperature = data.main.temp;
        this.myWeather.summary = data.weather[0].main;
        this.myWeather.iconCode = data.weather[0].icon;
        this.myWeather.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.iconCode + '@2x.png';
        // this.isFavorite();
        // this.getWallpaper();
        // this.addToLastFound(this.myWeather)
      },
      error: (error) => {
        this.toastrService.warning("NOT FOUND CITY!");
        console.log(error);
      }
    })
  }

  // find city by input --------------------------------------------------------------------------------
  onSubmit() {
    if (this.searchCity.length >= 3) {
      this.getWeather(this.searchCity);
    }
    else {
      this.toastrService.warning('INSERT MIN 3 CHARS!');
    }
  }

  // set city as Favorite -----------------------------------------------------------------------------------
  setFavorite(item: Weather1) {
    if (this.favoriteList.list.length > 4 && !this.myWeather.favorite) {
      alert("MAX 5 FAVORITES CITIES ALLOWED!");
      return;
    }
    this.myWeather.favorite = !this.myWeather.favorite;
    this.favorite = new Favorite();
    this.favorite.currentCity = item.currentCity;
    this.favorite.temperature = item.temperature;

    if (this.myWeather.favorite) {
      this.favoriteService.addToFavoriteService(this.favorite);
    } else {
      this.favoriteService.removeFavoriteCityService(this.favorite);
    }
  }

  // set city as Favorite -----------------------------------------------------------------------------------
  getFavoriteCity(item: Favorite) {
    this.searchCity = item.currentCity;
    this.onSubmit();
  }

  isFavorite() {
    let city = this.favoriteList.list.find(item => item.currentCity === this.myWeather.currentCity);
    if (city) {
      this.myWeather.favorite = true;
    } else {
      this.myWeather.favorite = false;
    }
  }

  removeFavoriteCity(item: Favorite) {
    this.favoriteService.removeFavoriteCityService(item)
    // console.log(item.currentCity)
    this.isFavorite();
  }

  // add searchings to the list -------------------------------------------------------------------------
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
    this.onSubmit();
  }

  clearFavoritesList() {
    this.lastFoundService.clearLastFoundService();
  }

  // set wallpaper by weather conditions -----------------------------------------------------------------
  getWallpaper() {
    switch (this.myWeather.iconCode) {
      case "01d": this.myWeather.backgroundImage = "assets/images/day01.jpg";
        break;
      case "02d": this.myWeather.backgroundImage = "assets/images/day02.jpg";
        break;
      case "03d": this.myWeather.backgroundImage = "assets/images/day03.jpg";
        break;
      case "04d": this.myWeather.backgroundImage = "assets/images/day04.jpg";
        break;
      case "09d": this.myWeather.backgroundImage = "assets/images/day09.jpg";
        break;
      case "10d": this.myWeather.backgroundImage = "assets/images/day10.jpg";
        break;
      case "11d": this.myWeather.backgroundImage = "assets/images/day11.jpg";
        break;
      case "13d": this.myWeather.backgroundImage = "assets/images/day13.jpg";
        break;
      case "50d": this.myWeather.backgroundImage = "assets/images/day50.jpg";
        break;
      case "01n": this.myWeather.backgroundImage = "assets/images/night.jpg";
        break;
      default:
        this.myWeather.backgroundImage = "assets/images/day.jpg";
    }
  }

  ngOnDestroy(): void {
    this.sub0?.unsubscribe();
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }
}
