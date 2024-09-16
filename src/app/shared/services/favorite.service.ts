import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Weather } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public favorites: Array<Weather> = this.getFavoritesFromLocalStorage();
  private favoritesSubject: BehaviorSubject<Array<Weather>> = new BehaviorSubject(this.favorites);

  addToFavoriteService(favorite: Weather): void {
    let duplicate = this.favorites.find(item => item.currentCity == favorite.currentCity);
    if (duplicate) return;
    this.favorites.push(favorite);
    this.setFavoritesToLocalStorage();
  }

  getFavoritesObservable(): Observable<Array<Weather>> {
    return this.favoritesSubject.asObservable();
  }

  getFavorites(): Array<Weather> {
    return this.favoritesSubject.value;
  }

  removeFavoritesService(favorite: Weather) {
    this.favorites = this.favorites.filter(city => city.currentCity != favorite.currentCity);
    this.setFavoritesToLocalStorage();
  }

  private setFavoritesToLocalStorage(): void {
    const favJson = JSON.stringify(this.favorites);
    localStorage.setItem('favorites', favJson);
    this.favoritesSubject.next(this.favorites);
  }

  private getFavoritesFromLocalStorage(): Array<Weather> {
    const favJson = localStorage.getItem('favorites');
    return favJson ? JSON.parse(favJson) : [];
  }
}