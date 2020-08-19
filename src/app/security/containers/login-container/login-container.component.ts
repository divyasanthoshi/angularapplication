import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut } from 'src/app/_shared/animation/animation';
import { btnShrink, routeFullscreen } from '../../security-login/security-login.animation';
import { FormState } from '../../security.enum';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  animations: [
    btnShrink,
    routeFullscreen,
    fadeInOut
  ]
})
export class LoginContainerComponent implements OnInit {

  // submit button offset
  btnLeftOffset: string;
  btnTopOffset: string;

  // screen resolution
  screenX: number;
  screenY: number;
  radius: number;

  formState: string = FormState.Submitting;

  isShow = true;

  constructor( private router: Router) { }

  ngOnInit() {}

  loginClick() {
    // get the postion for the login button that shows in the page
    const loginButtons = document.querySelectorAll('ion-button');
    loginButtons.forEach((button) => {
      if (button.offsetParent) {
        // get the offset for the visible login button
        this.btnLeftOffset = button.getBoundingClientRect().left.toString();
        this.btnTopOffset = button.getBoundingClientRect().top.toString();

        // get the resolution for the screen
        const width = window.screen.width;
        const height = window.screen.height;
        // if the width is bigger, animate the radius to 90% of the height then expand fullscreen;
        // if height is bigger animate radius to 90% of width
        if (height <= width) {
          this.screenX = (width - height * 0.9) / 2;
          this.screenY = height * 0.05;
          this.radius = height * 0.9;
        } else {
          this.screenY = (height - width * 0.9) / 2;
          this.screenX = width * 0.05;
          this.radius = width * 0.9;
        }
      }
    });
    this.formState = FormState.Submitted;
    // navigate after the animation is done
    setTimeout(() => {
      this.isShow = false;
      this.formState = FormState.OnHold;
      setTimeout(() => {
        this.router.navigate(['welcome']);
      }, 900);
    }, 700);
  }
}
