export class Weather5 {
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