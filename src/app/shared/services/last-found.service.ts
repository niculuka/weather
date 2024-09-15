import { Injectable } from '@angular/core';
import { LastFound } from '../model/last-found.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastFoundService {

  public lastFounds: LastFound[] = this.getLastFoundsFromLS();
  private lastFoundsSubject: BehaviorSubject<LastFound[]> = new BehaviorSubject(this.lastFounds);

  addToLastFoundsService(lastFound: LastFound): void {
    let duplicate = this.lastFounds.find(item => item.currentCity == lastFound.currentCity);
    if (duplicate) return;
    if (this.lastFounds.length < 5) this.lastFounds.push(lastFound);
    else {
      this.lastFounds.splice(0, 1);
      this.lastFounds.push(lastFound);
    }
    this.setLastFoundsToLS();
  }

  getLastFoundsObservable(): Observable<LastFound[]> {
    return this.lastFoundsSubject.asObservable();
  }

  getLastFoundsList(): LastFound[] {
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

  private getLastFoundsFromLS(): LastFound[] {
    const lastJson = localStorage.getItem('last-founds');
    return lastJson ? JSON.parse(lastJson) : [];
  }
}
