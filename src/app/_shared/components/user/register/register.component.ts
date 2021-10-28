import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserForm:any = FormGroup;

  constructor(private userService: UserService, private router : Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerUserForm = this.formBuilder.group({
      email:[null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      password:[null, [
        Validators.required,
        Validators.minLength(6)
      ]],
      fullname:[null, [
        Validators.required,
        Validators.minLength(6)
      ]]
    })
  };

  onSubmit(){
    if(this.registerUserForm.invalid){
      return;
    }
    console.log(this.registerUserForm.value);
    this.userService.register(this.registerUserForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe();
  };

  backToSignIn(){
      this.router.navigate(['login']);
  };

}
