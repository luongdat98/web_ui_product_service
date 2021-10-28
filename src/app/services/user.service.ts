import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APIUrl } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserLoginModel{
  email : string;
  password : string;
};

export interface UserRegisterModel{
  email? : string;
  password? : string;
  fullname?: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { 
    this.loadUserInfo();
  }

  register(user : UserRegisterModel){
    return this.http.post<any>(`${APIUrl}/User/register`, user).pipe(
      map(user => user));
  };

  login(loginUserForm: UserLoginModel){
    return this.http.post<any>(`${APIUrl}/User/login`, {email: loginUserForm.email, password : loginUserForm.password}).pipe(
      map((token) =>{
        localStorage.setItem('access_token', JSON.stringify(token.accessToken));
        localStorage.setItem('refresh_token', JSON.stringify(token.refreshToken));
        const decodedToken = this.jwtHelper.decodeToken(token.accessToken);

        const data ={
          access_token : token.accessToken,
          refresh_token : token.refreshToken,
          email : decodedToken,
          tokenExpiration : decodedToken.exp
        }
        this.userInfo.next(data);

        return token;
      })
    )
  };

  loadUserInfo(){
    const userData = this.userInfo.getValue();
    if(!userData){
      const accesstoken = localStorage.getItem("access_token");
      if(accesstoken){
        const decodetoken = this.jwtHelper.decodeToken(accesstoken);
        const data = {
          access_token : localStorage.getItem('access_token'),
          refresh_token : localStorage.getItem('refresh_token'),
          email : decodetoken.email,
          tokenExpiration : decodetoken.exp
        };
        this.userInfo.next(data);
      }
    }
  };

  isUserRight():boolean{
    return false;
  };

   // Code moi them
  // login(loginUserForm: UserLoginModel){
  //   return this.http.post<any>(`${APIUrl}/User/login`, {email: loginUserForm.email, password : loginUserForm.password}).pipe(
  //     map((token) =>{
  //       console.log('token is server');
  //       console.log(token.accessToken);
  //       localStorage.setItem('access_token', JSON.stringify(token.accessToken));
  //       localStorage.setItem('refresh_token', JSON.stringify(token.refreshToken));
  //       const decodedToken = this.jwtHelper.decodeToken(token.accessToken);

  //       const data ={
  //         access_token : localStorage.getItem('access_token'),
  //         refresh_token : localStorage.getItem('refresh_token'),
  //         email : decodedToken.email,
  //         tokenExpiration : decodedToken.exp
  //       }
  //       this.userInfo.next(data);

  //       return token;
  //     })
  //   )
  // };
}
