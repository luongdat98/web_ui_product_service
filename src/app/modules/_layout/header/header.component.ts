import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showBtnLogin:boolean = false;
  showBtnLogout:boolean = false;

  constructor(private route:Router, private userService: UserService) { }

  ngOnInit(): void {
    this.isLogin();
  }

  isLogin(){
    const userData = this.userService.userInfo.value;
    if(userData != null){
      this.showBtnLogin = false;
      this.showBtnLogout = true; 
    }
    else{
      this.showBtnLogin = true;
      this.showBtnLogout = false;
    }
  };

  login(){
    this.route.navigate(['login']);
  };

  logout(){
    // console.log(localStorage.getItem("access_token"));
    // window.localStorage.clear();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.route.navigate(['login']);
  };

}
