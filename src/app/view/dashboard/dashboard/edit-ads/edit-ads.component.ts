import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { DatePipe } from '@angular/common'
declare var $: any;
@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.scss']
})
export class EditAdsComponent implements OnInit {

  valid = false;
  invalid = false;
  to_edit: any;
  from_edit: any;
  url_edit: any;
  type_edit: any;
  constructor(public datepipe: DatePipe,  public apiservice: ApiServiceService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    let item = this.apiservice.list_ad.find((ele :any , index : any) => {
      if (index == this.route.snapshot.params.id) return ele;
    })

    if (item.image == '') {
      this.type_edit = 1;
      this.url_edit= item.video
    } else {
      this.type_edit = 2;
      this.url_edit= item.image
    }
   
    
    var from ='2014-04-03'.split('-')
    this.from_edit = this.datepipe.transform(new Date(item.from_time), 'yyyy-dd-MMTHH:mm') ;
    this.to_edit = this.datepipe.transform(new Date(item.to_time), 'yyyy-dd-MMTHH:mm') ;
    
  }

  AddList(myForm: any) {
    if (myForm.status != 'INVALID') {
      let obj = this.apiservice.list_ad.find((ele :any , index : any) => {
        if (index == this.route.snapshot.params.id) return ele;
      });
      if (myForm.value.type == 1) {
        obj.video = myForm.value.url;
      } else {
        obj.image = myForm.value.url;
      }
      
      obj.from_time  = `${this.datepipe.transform(myForm.value.from, 'dd/MM/yyyy h:mm:ss a')}` ;
      obj.to_time = `${this.datepipe.transform(myForm.value.to, 'dd/MM/yyyy h:mm:ss a')}` ;
      
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
