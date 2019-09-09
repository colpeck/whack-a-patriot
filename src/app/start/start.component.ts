import { Component, OnInit } from '@angular/core';
import { MapsService } from '../common/maps.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['../../assets/sass/start.scss']
})
export class StartComponent implements OnInit {

  public distance: number;
  public start: boolean = false;
  public click: any;

  location: Object;

  constructor(private map: MapsService) { }

  ngOnInit() {
    this.loadDistanceData().subscribe(res => {
      this.distance = parseInt(res.rows[0].elements[0].distance.text.split(' ')[0]);
    })
  }
  
  loadDistanceData(): Observable<any> {
    return this.map.getLocation().pipe(switchMap(data => {
      return this.map.getDistanceToBoston(data.latitude, data.longitude);
    }))
  }

  clicked() {
    this.click = !this.click;
  }
}
