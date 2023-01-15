import { Component } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'WeatherApp';
  public lat: any;
  public lng: any;
  private httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
  public ngOnInit(){
    this.getLocation();
  }
  
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getInfo(this.lat,this.lng,"18ca957759875d832ae134954d5cdddf").subscribe(data =>{
            console.log(data);
          });
          this.getWeatherData()
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getInfo(lat:number, lng:number, apiKey: string): Observable<any>
  {
    return this.httpClient.get<any>('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid='+apiKey);
  }

  
  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=18ca957759875d832ae134954d5cdddf')
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
    })
}
}

