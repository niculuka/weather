import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { WeatherFiveDayComponent } from './weather-five-day/weather-five-day.component';

const routes: Routes = [
  { path: "", component: WeatherComponent},
  { path: "5days", component: WeatherFiveDayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
