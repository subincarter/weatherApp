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
  speed: number;
  temp_max: any;
  temp_min: any;
  day: string;
  month: string;
  date: any;
  constructor(private service: WeatherService, private toastr: ToastrService) { }

  ngOnInit() {
    this.location = 'Bangalore';
    this.icon = "10d";
    this.weather = 'Clouds'
    this.summary = '';
    this.temp = this.pressure = this.himudity = this.feels_like = 0
    this.getWeather();

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
            this.speed = this.mps_to_kmph(data.wind.speed)
            this.temp_max = data.main.temp_max;
            this.temp_min = data.main.temp_min;
            let datetime = new Date();
            this.day = this.getDay(datetime.getDay());
            this.month = this.getMonth(datetime.getMonth());
            this.date = datetime.getDate();
          },
          error: (e) => {
            this.toastr.error('please enter the valid city name')
            console.log(e);
          }
        });
    }
  }
  /**
   * convert m/sec to km/hr
   * @param mps 
   * @returns 
   */
  mps_to_kmph(mps: number) {
    return Math.round(3.6 * mps);
  }

  getDay(day: number) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[day];
  }
  getMonth(month: number) {
    const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return allMonths[month];
  }
}
