import { Component } from '@angular/core';
import { Weather } from './shared/weather';
import { WeatherService } from './shared/weather.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  location: string;
  show: boolean
  icon: string;
  temp: number;
  city: string;
  himudity: number;
  feels_like: any;
  pressure: any;
  summary: any;
  weather: string;
  constructor(private service: WeatherService, private toastr: ToastrService) { }

  ngOnInit() {
    this.location = '';
    this.icon = "10d";
    this.weather = 'Clouds'
    this.temp = this.pressure = this.himudity = this.feels_like = this.summary = 0
  }

  getWeather() {
    if (this.location == '') {
      this.toastr.error('please enter the city');
    } else {
      this.service.getWeather(this.location)
        .subscribe({
          next: (data: any) => {
            console.log(data)
            this.temp = data.main.temp;
            this.city = data.name;
            this.himudity = data.main.humidity;
            this.feels_like = data.main.feels_like;
            this.pressure = data.main.pressure;
            this.summary = data.weather[0].description;
            this.weather = data.weather[0].main
            this.icon = data.weather[0].icon
          },
          error: (e) => {
            this.toastr.error('please enter the valid city name')
            console.log(e);
          }
        });
    }
  }
}
