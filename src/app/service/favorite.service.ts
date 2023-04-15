import { Injectable } from '@angular/core';
import { Favorite, FavoriteList } from '../model/favorite.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorite: Favorite = new Favorite();

  public favoriteList: FavoriteList = this.getFavoriteListFromLocalStorage();
  private favoriteListSubject: BehaviorSubject<FavoriteList> = new BehaviorSubject(this.favoriteList);

  constructor() { }

  addToFavoriteService(favorite: Favorite): void {

    let duplicate = this.favoriteList.list.find(item => item.currentCity === favorite.currentCity);
    if (duplicate) {
      return;
    }
    if (this.favoriteList.list.length <= 4) {
      this.favoriteList.list.push(favorite);
    }
    this.setFavoriteListToLocalStorage();
    this.favorite = new Favorite();
  }

  getFavoriteListObservable(): Observable<FavoriteList> {
    return this.favoriteListSubject.asObservable();
  }

  getFavoriteList(): FavoriteList {
    return this.favoriteListSubject.value;
  }

  removeFavoriteCityService(favorite: Favorite) {
    let newFavoriteList = this.favoriteList.list.filter(city => city.currentCity != favorite.currentCity);
    this.favoriteList.list = newFavoriteList;
    this.setFavoriteListToLocalStorage();
  }

  private setFavoriteListToLocalStorage(): void {
    const favJson = JSON.stringify(this.favoriteList);
    localStorage.setItem('favorite', favJson);
    // console.log(favJson)
    this.favoriteListSubject.next(this.favoriteList);
  }

  private getFavoriteListFromLocalStorage(): FavoriteList {
    const favJson = localStorage.getItem('favorite');
    return favJson ? JSON.parse(favJson) : new FavoriteList();
  }
}