import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentLocation } from '../model/current-location.model';

@Injectable({
    providedIn: 'root'
})
export class CurrentLocationService {

    public currLocation: CurrentLocation = this.getCurrentLocationFromLS();
    private currLocationSubject: BehaviorSubject<CurrentLocation> = new BehaviorSubject(this.currLocation);

    constructor(
        private http: HttpClient
    ) { }

    getLocationService(): Promise<any> {
        return new Promise((res, error) => {
            navigator.geolocation.getCurrentPosition(data => {
                res({ lat: data.coords.latitude, lon: data.coords.longitude })
                this.currLocation.lat = data.coords.latitude;
                this.currLocation.lon = data.coords.longitude;
                this.setCurrentLocationToLS();
            })
        })
    }

    getCurrentLocationObservable(): Observable<CurrentLocation> {
        return this.currLocationSubject.asObservable();
    }

    resetCurrentLocationService() {
        this.currLocation.lat = 0;
        this.currLocation.lon = 0;
        this.setCurrentLocationToLS();
        window.location.reload();
    }

    private setCurrentLocationToLS(): void {
        const currLocJson = JSON.stringify(this.currLocation);
        localStorage.setItem('currLocation', currLocJson);
        this.currLocationSubject.next(this.currLocation);
    }

    private getCurrentLocationFromLS(): CurrentLocation {
        const currLocJson = localStorage.getItem('currLocation');
        return currLocJson ? JSON.parse(currLocJson) : new CurrentLocation();
    }

    getCurrentCityService(lat: number, lon: number): Observable<any> {
        return this.http.get(
            "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=129fe5173bd0c4c830ba6e766b567567"
        )
    }
}