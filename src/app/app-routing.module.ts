import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { WeatherComponent } from './guest/weather/weather.component';
import { WeatherFiveComponent } from './guest/weather-five/weather-five.component';
import { HomeComponent } from './guest/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "day-1", component: WeatherComponent},
  { path: "day-5", component: WeatherFiveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
