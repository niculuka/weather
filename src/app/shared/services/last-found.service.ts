import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Weather } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class LastFoundService {

  public lastFounds: Weather[] = this.getLastFoundsFromLS();
  private lastFoundsSubject: BehaviorSubject<Weather[]> = new BehaviorSubject(this.lastFounds);

  addToLastFoundsService(lastFound: Weather): void {
    let duplicate = this.lastFounds.find(item => item.currentCity == lastFound.currentCity);
    if (duplicate) return;
    if (this.lastFounds.length < 5) this.lastFounds.push(lastFound);
    else {
      this.lastFounds.splice(0, 1);
      this.lastFounds.push(lastFound);
    }
    this.setLastFoundsToLS();
  }

  getLastFoundsObservable(): Observable<Weather[]> {
    return this.lastFoundsSubject.asObservable();
  }

  getLastFoundsList(): Weather[] {
    return this.lastFoundsSubject.value;
  }

  clearLastFoundService() {
    this.lastFounds = [];
    this.setLastFoundsToLS();
  }

  private setLastFoundsToLS(): void {
    const lastJson = JSON.stringify(this.lastFounds);
    localStorage.setItem('last-founds', lastJson);
    this.lastFoundsSubject.next(this.lastFounds);
  }

  private getLastFoundsFromLS(): Weather[] {
    const lastJson = localStorage.getItem('last-founds');
    return lastJson ? JSON.parse(lastJson) : [];
  }
}
