import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { DatePipe } from '@angular/common'
declare var $: any;
@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss'],
})
export class AddAdsComponent implements OnInit {
  valid = false;
  invalid = false;
  constructor(public datepipe: DatePipe,  public apiservice: ApiServiceService, private router: Router) {}

  ngOnInit(): void {}

  AddList(myForm: any) {
    if (myForm.status != 'INVALID') {
      let obj = { image: '', video: '', from_time: '', to_time: '' };
      if (myForm.value.type == 1) {
        obj.video = myForm.value.url;
      } else {
        obj.image = myForm.value.url;
      }
      obj.from_time  = `${this.datepipe.transform(myForm.value.from, 'dd/MM/yyyy h:mm:ss a')}` ;
      obj.to_time = `${this.datepipe.transform(myForm.value.to, 'dd/MM/yyyy h:mm:ss a')}` ;
      this.apiservice.list_ad.push(obj);
      localStorage.removeItem("list_ad");
      localStorage.setItem("list_ad", JSON.stringify(this.apiservice.list_ad));
      this.router.navigateByUrl('/dashboard/ad');
    } else {
      this.invalid = true;
      $('#popup').modal('show');
      setTimeout(() => {
        $('#popup').modal('hide');
        this.invalid = false;
      }, 3000);
    }
  }
}
