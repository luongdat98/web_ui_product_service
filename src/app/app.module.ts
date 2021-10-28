import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_shared/components/home/home.component';
import { HeaderComponent } from './modules/_layout/header/header.component';
import { SidebarComponent } from './modules/_layout/sidebar/sidebar.component';
import { ShowProductComponent } from './_shared/components/product/show-product/show-product.component';
import { AddEditProductComponent } from './_shared/components/product/add-edit-product/add-edit-product.component';
import { ProductService } from './services/product.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoryService } from './services/category.service';
import { SupplierService } from './services/supplier.service';
import { LoginComponent } from './_shared/components/user/login/login.component';
import { RegisterComponent } from './_shared/components/user/register/register.component';
import { UserService } from './services/user.service';
import { AuthRouteGaurd } from './_shared/guards/auth.route.guard';
import { ProductShowComponent } from './_shared/components/product/show-product2/product-show/product-show.component';

import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    ShowProductComponent,
    AddEditProductComponent,
    LoginComponent,
    RegisterComponent,
    ProductShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [
    ProductService,
    CategoryService,
    SupplierService,
    UserService,
    AuthRouteGaurd
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
