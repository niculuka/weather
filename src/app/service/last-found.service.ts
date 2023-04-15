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

  addToLastFoundService(lastFound: LastFound): void {
    
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
    const lastJson = JSON.stringify(this.lastFoundList);
    localStorage.setItem('last-found', lastJson);
    // console.log(lastJson)
    this.lastFoundListSubject.next(this.lastFoundList);
  }

  private getLastFoundListFromLocalStorage(): LastFoundList {
    const lastJson = localStorage.getItem('last-found');
    return lastJson ? JSON.parse(lastJson) : new LastFoundList();
  }
}
