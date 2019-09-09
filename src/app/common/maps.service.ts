import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location {
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) {}

  getLocation() {
    return this.http.get<Location>('https://ipapi.co/json/')
  }

  getDistanceToBoston(lat, lng) {
    return this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + lat + ',' + lng + '&destinations=Boston&units=imperial&key=AIzaSyBpYkIaaaMuSvo9Y_CRDvOHG6WBwm3WLT4')
  }
}
