import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http:HttpClient) { }

  getWeather(location : string){
    // return this.http.get(`${"https://api.openweathermap.org/data/2.5/weather?q="+location+'&appid=7ad05252fe5822cf96c38f478fdebc40'}`,

    return this.http.get(`${"https://api.openweathermap.org/data/2.5/weather"}`,
    {params : {q : location , appid : '7ad05252fe5822cf96c38f478fdebc40',units : 'metric'}})
  }
}
