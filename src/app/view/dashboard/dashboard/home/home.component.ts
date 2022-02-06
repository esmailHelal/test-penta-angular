import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public apiservice: ApiServiceService) { }

  ngOnInit(): void {
  }

  Delete(i: any) {
    let arr = this.apiservice.list_ad.filter((element:any,index:any) => {
      if (i != index) return element;
    });
  
    this.apiservice.list_ad = arr;
    localStorage.removeItem("list_ad");
      localStorage.setItem("list_ad", JSON.stringify(this.apiservice.list_ad));
  }

}
