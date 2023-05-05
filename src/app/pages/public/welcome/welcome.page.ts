import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
SwiperCore.use([Pagination]);

import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomePage implements AfterContentChecked {
  deferredPrompt: any;
  showButton = false;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  language: string = '';
  last_slide: boolean = false;

  @ViewChild('swiper') swiper: SwiperComponent;

  // Swiper config
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: false },
    allowTouchMove: false, // set true to allow swiping
  };

  constructor(private router: Router, private ref: ChangeDetectorRef) {}

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  // Trigger swiper slide change
  swiperSlideChanged(e) {
    // console.log(e);
  }

  // Go to next slide
  nextSlide() {
    this.swiper.swiperRef.slideNext(500);
  }

  // Last slide trigger
  onLastSlide() {
    this.last_slide = true;
  }

  // Go to main content
  async getStarted() {
    // Navigate to /home
    this.router.navigateByUrl('/signin');
  }
}
