export class OpenWeather {
    localCity: string = "";
    currentCity: string = "";
    lastCity: string = "";

    units: string = "metric";
    feelsLike: number = 0;
    humidity: number = 0;
    pressure: number = 0;
    temperature: number = 0;
    summary: string = "";

    lat: number = 0;
    lon: number = 0;

    image: string = "assets/images/day.jpg";
    day: string = "day";
    night: string = "night";
    rain: string = "";
    iconURL: string = "";
}

export class OpenWeather5 {
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
