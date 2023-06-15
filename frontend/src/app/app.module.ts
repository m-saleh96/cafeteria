import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { WelcomeComponent } from './admin/welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { ThirdHomeSectionComponent } from './third-home-section/third-home-section.component';
import { FooterComponent } from './footer/footer.component';
import { FourthHomeSectionComponent } from './fourth-home-section/fourth-home-section.component';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CheeckNumbEmailComponent } from './cheeck-numb-email/cheeck-numb-email.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChecksComponent } from './admin/checks/checks.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllProductsCardComponent } from './all-products-card/all-products-card.component';
import { ProductsSliderComponent } from './products-slider/products-slider.component';
import { ProductsSliderCardComponent } from './products-slider-card/products-slider-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    AdminPanelComponent,
    AdminProductsComponent,
    AdminCategoryComponent,
    AllUsersComponent,
    AddUserComponent,
    DashboardComponent,
    WelcomeComponent,
    HeaderComponent,
    HomeComponent,
    EditUserComponent,
    RegisterComponent,
    LoginComponent,
    ThirdHomeSectionComponent,
    FooterComponent,
    FourthHomeSectionComponent,
    CategoryListComponent,
    CategoryCardComponent,
    CategoryDetailsComponent,
    CartComponent,
    NotfoundComponent,
    MyOrdersComponent,
    ProfileComponent,
    ForgetPasswordComponent,
    CheeckNumbEmailComponent,
    ResetpasswordComponent,
    ChecksComponent,
    AllProductsComponent,
    AllProductsCardComponent,
    ProductsSliderComponent,
    ProductsSliderCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
