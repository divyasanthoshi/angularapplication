import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UserManagerService } from 'src/app/_core/services/user-manager.service';
import { UserToken } from 'src/app/_shared/Interfaces/security';
import { FormState } from '../security.enum';
import { btnShrink, routeFullscreen } from './security-login.animation';



@Component({
  selector: 'app-security-login',
  templateUrl: './security-login.component.html',
  styleUrls: ['./security-login.component.scss'],
  animations: [
    btnShrink,
    routeFullscreen
  ]
})


export class SecurityLoginComponent implements OnInit {

  @Output() loginClick = new EventEmitter();

  constructor(
    private spinner: NgxSpinnerService,
    private userManager: UserManagerService,
    private formBuilder: FormBuilder) { }

  loginForm: FormGroup;
  userLogin: UserToken;
  isLoggedIn$: Observable<boolean>;
  formState: string = FormState.OnHold;
  btnLeftOffset: string;
  btnTopOffset: string;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onClick() {

  }
  getFormState() {
    // start the animation
    if (this.loginForm.valid) {
      this.formState = FormState.Submitting;
      this.spinner.show();

      // get the value for the forms
      this.userLogin = this.loginForm.value;

      // give a timeout for the purpose of showing the animation
      setTimeout(() => {
        this.isLoggedIn$ = this.userManager.signin(this.userLogin);
        // if the user is logged in emit click, otherwise go back to normal
        this.isLoggedIn$.subscribe((user) => {
          if (user) {
            this.spinner.hide();
            this.formState = FormState.Submitted;
            this.loginClick.emit();
          } else {
            setTimeout(() => {
              this.spinner.hide();
              this.formState = FormState.OnHold;
            }, 1000);
          }
        });
      }, 800);
    }
  }
}
