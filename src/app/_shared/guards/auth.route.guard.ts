import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Injectable()

export class AuthRouteGaurd implements CanActivate{

    constructor(private userService: UserService, private route:Router){

    }
    canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): 
        | boolean 
        | UrlTree 
        | Observable<boolean | UrlTree> 
        | Promise<boolean | UrlTree> 
        {
            if(state.url == "/"){
                return true;
            }
            const userData = this.userService.userInfo.getValue();
            
            if(userData && userData.email){
                if(state.url.indexOf("login") > -1){
                    this.route.navigate(["home"]);
                    return false;
                }
            }
            else{
                    if(state.url.indexOf("product/add") > -1){
                        this.route.navigate(["/login"]);
                        return false;
                    }
                    else{
                        if(state.url.indexOf("product/edit/:id") > -1){
                            this.route.navigate(["/login"]);
                            return false;
                        }
                        else{
                            if(state.url.indexOf("product") > -1){
                                this.route.navigate(["/login"]);
                                return false;
                            }
                        }
                    }
                }
                return true;
            }  
    }