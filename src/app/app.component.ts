import { Component, OnInit } from '@angular/core';
import { BgImgServiceService } from './services/bg-img.service';
import { ProfileService } from './services/profile.service';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { AdminService } from './services/admin.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'c-v';

  // bg_src = this.bgImg.bg_img;
  bg_src = "assets/view.png";

  profileImg = this.myImg.my_photo;
  
  admin:boolean=false;

  listArray: any[] = [];


  constructor(private bgImg: BgImgServiceService, private route:Router,
    private myImg: ProfileService, private scroller: ViewportScroller ,private dataServ: AdminService) { 
    route.events.subscribe(data=>{
      if(data instanceof NavigationEnd){
        if(data.url.includes("admin"))
          this.admin=true;
        else
        this.admin=false
      }
    })
    
    dataServ.getdata("projects").subscribe(data => {
      for (const key in data) {
        this.listArray.push(data[key])
      }
    })
  }
  
  ngOnInit(): void {
    AOS.init()
  }

  email = "medoabdelhameed3@gmail.com";

  partsPosition(position: string) {
    this.scroller.scrollToAnchor(`${position}`);
  }

  f(){
    console.log(6)
  }


}
