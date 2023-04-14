import { Injectable } from '@angular/core';
import { LastFound, LastFoundList } from '../model/last-found.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastFoundService {

  lastFound: LastFound = new LastFound();

  public lastFoundList: LastFoundList = this.getLastFoundListFromLocalStorage();
  private lastFoundListSubject: BehaviorSubject<LastFoundList> = new BehaviorSubject(this.lastFoundList);

  constructor() { }

  addToFLastFoundService(lastFound: LastFound): void {
    
    let duplicate = this.lastFoundList.list.find(item => item.currentCity === lastFound.currentCity);
    if (duplicate) {
      return;
    }
    if (this.lastFoundList.list.length <= 4) {
      this.lastFoundList.list.push(lastFound);
    } else {
      this.lastFoundList.list.splice(0, 1);
      this.lastFoundList.list.push(lastFound);
    }
    this.setLastFoundListToLocalStorage();
    this.lastFound = new LastFound();
  }


  getLastFoundListObservable(): Observable<LastFoundList> {
    return this.lastFoundListSubject.asObservable();
  }

  getLastFoundList(): LastFoundList {
    return this.lastFoundListSubject.value;
  }

  clearLastFoundService() {
    this.lastFoundList = new LastFoundList();
    this.setLastFoundListToLocalStorage();
  }

  private setLastFoundListToLocalStorage(): void {
    const favJson = JSON.stringify(this.lastFoundList);
    localStorage.setItem('last-found', favJson);
    // console.log(favJson)
    this.lastFoundListSubject.next(this.lastFoundList);
  }

  private getLastFoundListFromLocalStorage(): LastFoundList {
    const favJson = localStorage.getItem('last-found');
    return favJson ? JSON.parse(favJson) : new LastFoundList();
  }
}
