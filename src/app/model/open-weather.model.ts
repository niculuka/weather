export class OpenWeather {
    localCity: string = "";
    currentCity: string = "";
    lastCity: string = "";

    favorite: boolean = false;

    units: string = "metric";
    feelsLike: number = 0;
    humidity: number = 0;
    pressure: number = 0;
    temperature: number = 0;
    summary: string = "";

    lat: number = 0;
    lon: number = 0;
    
    day: string = "day";
    night: string = "night";
    rain: string = "";
    iconCode: string = "01d";
    iconURL: string = "";    
    backgroundImage: string = "assets/images/day.jpg";
}

export class OpenWeather5 {
    localCity: string = "";
    currentCity: string = "";
    lastCity: string = "";

    lat: number = 0;
    lon: number = 0;

    iconCode: string = "01d";
    backgroundImage: string = "assets/images/day.jpg";

    city = {
        name: "",
    };
    list = [
        {
            dt_txt: "",
        },
        {
            main: {
                temp: 0,
                humidity: 0,
                pressure: 0,
                temp_max: 0,
                temp_min: 0
            },
            weather: [
                {
                    main: "Clouds",
                    icon: "01d"
                }
            ],
        }
    ]
}
