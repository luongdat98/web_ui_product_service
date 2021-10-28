import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserForm: any = FormGroup;

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginUserForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }

  onSubmit(){
    if(this.loginUserForm.invalid){
      return;
    }
    this.userService.login(this.loginUserForm.value).pipe(
      map(token => this.route.navigate(['home']))
    ).subscribe();
  }

  // onSubmit(){
  //   if(this.loginUserForm.invalid){
  //     return;
  //   }
  //   this.userService.login(this.loginUserForm.value).pipe(
  //     map(token => this.route.navigate(['/home']))
  //   ).subscribe();
  // }
}
