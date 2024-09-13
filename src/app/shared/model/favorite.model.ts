export class Favorite {
    currentCity: string = "";
    temperature: number = 0;
    // favorite: boolean = false;
}

export class FavoriteList {
    list: Array<Favorite> = [];
}

export const FAVORITE_DATA = {
    list: [
        {
            currentCity: "Deva",
            temperature: 20,
            // favorite: true,
        },
        {
            currentCity: "Cluj",
            temperature: 10,
            // favorite: false,
        },
        {
            currentCity: "Timisoara",
            temperature: 18,
            // favorite: true,
        },
        {
            currentCity: "Bucharest",
            temperature: 21,
            // favorite: false,
        },
        {
            currentCity: "Oradea",
            temperature: 19,
            // favorite: true,
        },
    ]
}