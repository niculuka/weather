import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
import { AppComponent } from './app.component';
import { HomeComponent } from './guest/home/home.component';
import { WeatherComponent } from './guest/weather/weather.component';
import { WeatherFiveComponent } from './guest/weather-five/weather-five.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherFiveComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000, verticalPosition: 'top'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
