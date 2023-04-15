import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { OpenWeather } from 'src/app/model/open-weather.model';
import { LAST_FOUND_DATA, LastFound, LastFoundList } from '../model/last-found.model';
import { LastFoundService } from '../service/last-found.service';
import { FAVORITE_DATA, Favorite, FavoriteList } from '../model/favorite.model';
import { FavoriteService } from '../service/favorite.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  myWeather: OpenWeather = new OpenWeather();
  searchCity: string = "";

  favorite!: Favorite;
  favoriteList!: FavoriteList;

  lastFound!: LastFound;
  lastFoundList!: LastFoundList;

  constructor(
    private weatherService: WeatherService,
    private lastFoundService: LastFoundService,
    private favoriteService: FavoriteService
  ) {
    favoriteService.getFavoriteListObservable().subscribe(data => {
      this.favoriteList = data;
    });
    lastFoundService.getLastFoundListObservable().subscribe(data => {
      this.lastFoundList = data;
    });
  }

  ngOnInit(): void {
    this.getLocation();
  }

  // get data from API through service -----------------------------------------------------------------------
  getLocation() {
    this.weatherService.getLocationService().then(location => {
      this.myWeather.lat = location.lat;
      this.myWeather.lon = location.lon;
      this.getCity(this.myWeather.lat, this.myWeather.lon);
    })
  }

  getCity(lat: number, lon: number) {
    this.weatherService.getCityService(lat, lon).subscribe({
      next: (data) => {
        let anyWeather = data;
        // console.log(anyWeather)
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
        this.myWeather.currentCity = anyWeather.name;
        this.myWeather.feelsLike = anyWeather.main.feels_like;
        this.myWeather.humidity = anyWeather.main.humidity;
        this.myWeather.pressure = anyWeather.main.pressure;
        this.myWeather.temperature = anyWeather.main.temp;
        this.myWeather.summary = anyWeather.weather[0].main;
        this.myWeather.iconCode = anyWeather.weather[0].icon;
        this.myWeather.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.iconCode + '@2x.png';
        this.isFavorite();
        this.getWallpaper();
        this.addToLastFound(this.myWeather)
      },
      error: (error) => {
        console.log(error);
        alert("CITY NOT FOUND!");
      }
    })
  }

  // set city as Favorite -----------------------------------------------------------------------------------
  setFavorite(item: OpenWeather) {
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
    let city = this.favoriteList.list.find(item => item.currentCity === this.myWeather.lastCity);
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

  // find city by input --------------------------------------------------------------------------------
  onSubmit() {
    if (!this.searchCity) {
      alert("NO CITY CHOOSE!");
    } else {
      this.getWeather();
      this.searchCity = "";
    }
  }

  // add searchings to the list -------------------------------------------------------------------------
  addToLastFound(item: OpenWeather) {
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

  // switch from Celsius to Fahrenheit ----------------------------------------------------------------
  onUnitChange() {
    if (this.myWeather.units == "metric") {
      this.myWeather.units = "imperial"
    } else {
      this.myWeather.units = "metric"
    }
    if (this.myWeather.localCity !== "") {
      if (this.myWeather.localCity == this.myWeather.currentCity) {
        this.getCity(this.myWeather.lat, this.myWeather.lon);
      } else {
        this.getWeather();
      }
    } else {
      alert("NO CITY CHOOSE!")
    }
  }

}
