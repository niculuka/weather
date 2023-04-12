import { Injectable } from '@angular/core';
import { Favorite, FavoriteList } from '../model/favorite.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  item: Favorite = new Favorite();
  favoritesItems: FavoriteList = new FavoriteList();

  constructor() { }

  addToFavoriteService(favorite: Favorite): void {    

    this.favoritesItems.list.push(favorite);
    
    const favJson = JSON.stringify(favorite);
    localStorage.setItem('favorite', favJson);


    // console.log(localStorage.getItem('favorite'))
    
    // console.log(this.favoritesItems)
    // console.log(favoritesList)
  }
}
