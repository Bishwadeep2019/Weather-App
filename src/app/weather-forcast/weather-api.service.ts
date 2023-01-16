import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private httpClient: HttpClient) { }

  getInfo(lat:number, lng:number, apiKey: string): Observable<any>
  {
    return this.httpClient.get<any>('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&units=metric&appid='+apiKey);
  }

  getWeatherData(cityName: string): Observable<any>{
    return this.httpClient.get<any>('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=metric&appid=18ca957759875d832ae134954d5cdddf');
  }
}
