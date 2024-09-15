import { Injectable } from '@angular/core';
import { Favorite } from '../model/favorite.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public favorites: Array<Favorite> = this.getFavoritesFromLocalStorage();
  private favoritesSubject: BehaviorSubject<Array<Favorite>> = new BehaviorSubject(this.favorites);

  addToFavoriteService(favorite: Favorite): void {
    let duplicate = this.favorites.find(item => item.currentCity == favorite.currentCity);
    if (duplicate) return;
    this.favorites.push(favorite);
    this.setFavoritesToLocalStorage();
  }

  getFavoritesObservable(): Observable<Array<Favorite>> {
    return this.favoritesSubject.asObservable();
  }

  getFavorites(): Array<Favorite> {
    return this.favoritesSubject.value;
  }

  removeFavoritesService(favorite: Favorite) {
    this.favorites = this.favorites.filter(city => city.currentCity != favorite.currentCity);
    this.setFavoritesToLocalStorage();
  }

  private setFavoritesToLocalStorage(): void {
    const favJson = JSON.stringify(this.favorites);
    localStorage.setItem('favorites', favJson);
    this.favoritesSubject.next(this.favorites);
  }

  private getFavoritesFromLocalStorage(): Array<Favorite> {
    const favJson = localStorage.getItem('favorites');
    return favJson ? JSON.parse(favJson) : [];
  }
}