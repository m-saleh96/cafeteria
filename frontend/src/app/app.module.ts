import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
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
import { RegisterComponent } from './register/register.component';

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
    DashboardComponent,
    WelcomeComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule , FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
