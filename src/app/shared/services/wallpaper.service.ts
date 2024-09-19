import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WallpaperService {

    wallpaper: string = "";

    getWallpaper(iconCode: string) {
        switch (iconCode) {
            case "01d": this.wallpaper = "assets/images/day01.jpg";
                break;
            case "02d": this.wallpaper = "assets/images/day02.jpg";
                break;
            case "03d": this.wallpaper = "assets/images/day03.jpg";
                break;
            case "04d": this.wallpaper = "assets/images/day04.jpg";
                break;
            case "09d": this.wallpaper = "assets/images/day09.jpg";
                break;
            case "10d": this.wallpaper = "assets/images/day10.jpg";
                break;
            case "11d": this.wallpaper = "assets/images/day11.jpg";
                break;

            case "12d": this.wallpaper = "assets/images/day11.jpg";
                break;

            case "13d": this.wallpaper = "assets/images/day13.jpg";
                break;
            case "50d": this.wallpaper = "assets/images/day50.jpg";
                break;

            case "01n": this.wallpaper = "assets/images/night.jpg";
                break;
            case "02n": this.wallpaper = "assets/images/night.jpg";
                break;
            case "03n": this.wallpaper = "assets/images/night.jpg";
                break;
            case "04n": this.wallpaper = "assets/images/night.jpg";
                break;

            case "09n": this.wallpaper = "assets/images/night.jpg";
                break;
            case "10n": this.wallpaper = "assets/images/night.jpg";
                break;
            case "11n": this.wallpaper = "assets/images/night.jpg";
                break;
            case "12n": this.wallpaper = "assets/images/night.jpg";
                break;
            case "13n": this.wallpaper = "assets/images/night.jpg";
                break;
            case "50d": this.wallpaper = "assets/images/day50.jpg";
                break;
            default:
                this.wallpaper = "assets/images/day.jpg";
        }
        return this.wallpaper;
    }

}