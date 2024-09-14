import { Injectable } from '@angular/core';
import { Favorite } from '../model/favorite.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public favorites: Array<Favorite> = this.getFavoriteListFromLocalStorage();
  private favoritesSubject: BehaviorSubject<Array<Favorite>> = new BehaviorSubject(this.favorites);

  addToFavoriteService(favorite: Favorite): void {

    let duplicate = this.favorites.find(item => item.currentCity == favorite.currentCity);
    if (duplicate) {
      return;
    }
    this.favorites.push(favorite);
    this.setFavoriteListToLocalStorage();
  }

  getFavoriteListObservable(): Observable<Array<Favorite>> {
    return this.favoritesSubject.asObservable();
  }

  getFavoriteList(): Array<Favorite> {
    return this.favoritesSubject.value;
  }

  removeFavoriteCityService(favorite: Favorite) {
    let newFavoriteList = this.favorites.filter(city => city.currentCity != favorite.currentCity);
    this.favorites = newFavoriteList;
    this.setFavoriteListToLocalStorage();
  }

  private setFavoriteListToLocalStorage(): void {
    const favJson = JSON.stringify(this.favorites);
    localStorage.setItem('favorites', favJson);
    // console.log(favJson)
    this.favoritesSubject.next(this.favorites);
  }

  private getFavoriteListFromLocalStorage(): Array<Favorite> {
    const favJson = localStorage.getItem('favorites');
    return favJson ? JSON.parse(favJson) : [];
  }
}