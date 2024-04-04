import { Component } from '@angular/core';
import { BgImgServiceService } from './services/bg-img.service';
import { ProfileService } from './services/profile.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'c-v';

  bg_src = this.bgImg.bg_img;

  profileImg = this.myImg.my_photo;

  constructor(private bgImg: BgImgServiceService, private myImg: ProfileService, private scroller: ViewportScroller) { }

  email = "medoabdelhameed3@gmail.com";

  partsPosition(position: string) {
    this.scroller.scrollToAnchor(`${position}`);
  }

}
