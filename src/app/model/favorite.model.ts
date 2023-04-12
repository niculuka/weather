import { OpenWeather } from "./open-weather.model";

export class Favorite {    

    currentCity: string = "";
    humidity: number = 0;
    pressure: number = 0;
    temperature: number = 0;
    summary: string = "";

}

export class FavoriteList {    

    list: Array<Favorite> = [];

}

export const FAVOTITE_DATA = [
    {
        currentCity: "Deva",
        feelsLike: 18,
        humidity: 50,
        pressure: 1200,
        temperature: 20,
        summary: "Clouds",
    },
    {
        currentCity: "Cluj",
        feelsLike: 8,
        humidity: 60,
        pressure: 2000,
        temperature: 10,
        summary: "Rain",
    },
    {
        currentCity: "Timisoara",
        feelsLike: 18,
        humidity: 50,
        pressure: 2500,
        temperature: 18,
        summary: "Clear",
    },
    {
        currentCity: "Bucharest",
        feelsLike:20,
        humidity: 160,
        pressure: 2180,
        temperature: 21,
        summary: "Few Clouds",
    },
    {
        currentCity: "Oradea",
        feelsLike: 17,
        humidity: 120,
        pressure: 2200,
        temperature: 19,
        summary: "Clear",
    },
]
