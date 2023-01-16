import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeatherApiService } from './weather-api.service';

@Component({
  selector: 'app-weather-forcast',
  templateUrl: './weather-forcast.component.html'
})
export class WeatherForcastComponent implements OnInit {
  public lat: number;
  public lng: number;
  public weatherDetails: any;
  public isGeoLocationAvailabe: boolean = false;
  public isLoaded: boolean = false;
  public buildCityForm: FormGroup;
  public model: any;
  public temprature: number;

  constructor(public WeatherApiService : WeatherApiService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildCityInputForm();
    this.getLocation();
    
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.isGeoLocationAvailabe = true;
          this.WeatherApiService.getInfo(this.lat,this.lng,"18ca957759875d832ae134954d5cdddf").subscribe(data => {
            this.model = data;
            this.temprature = Math.round(data.main.temp);
            this.isLoaded = true;
          })
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  buildCityInputForm()
  {
    this.buildCityForm = this.formBuilder.group({
      city: new FormControl('' || null)
  });
  }

  findCity()
  {
    this.WeatherApiService.getWeatherData(String(this.buildCityForm.get('city').value)).subscribe(data =>{
      this.model = data;
      this.temprature = Math.round(data.main.temp);
      this.isGeoLocationAvailabe = true;
      this.isLoaded = true;
      this.buildCityForm.get('city').setValue(null);
    }, (error) => {
      alert("no city found")
    }
    );
  }
}

