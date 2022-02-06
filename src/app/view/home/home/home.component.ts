import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( public apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.apiservice.switch_dashboard = false;
  }

  ngOnDestroy(): void {
    this.apiservice.switch_dashboard = true;
    
  }

}
