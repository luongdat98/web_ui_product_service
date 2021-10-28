import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_shared/components/home/home.component';
import { AddEditProductComponent } from './_shared/components/product/add-edit-product/add-edit-product.component';
import { ShowProductComponent } from './_shared/components/product/show-product/show-product.component';
import { ProductShowComponent } from './_shared/components/product/show-product2/product-show/product-show.component';
import { LoginComponent } from './_shared/components/user/login/login.component';
import { RegisterComponent } from './_shared/components/user/register/register.component';
import { AuthRouteGaurd } from './_shared/guards/auth.route.guard';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'product', component:ShowProductComponent, canActivate:[AuthRouteGaurd]},
  {path: 'product/add', component:AddEditProductComponent, canActivate:[AuthRouteGaurd]},
  {path: 'product/edit/:id', component:AddEditProductComponent, canActivate:[AuthRouteGaurd]},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'show', component:ProductShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
