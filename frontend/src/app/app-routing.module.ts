import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { WelcomeComponent } from './admin/welcome/welcome.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotfoundComponent } from './notfound/notfound.component';
const routes: Routes = [
  {
    path: 'editUser/:id',
    component: EditUserComponent
  },
  {
    path:'',
    redirectTo : 'home',
    pathMatch:"full"
  },
  {
    path:'home',
    component : HomeComponent
  },
  {
    path:'category',
    component : CategoryListComponent
  },
  {
    path:'category-details/:id',
    component : CategoryDetailsComponent
  },
  {
    path: 'register',
    component : RegisterComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path:'product-details/:id',
    component : ProductDetailsComponent
  },
  {
    path: 'admin',
    component:DashboardComponent,
    children:[
      {
        path: 'welcome',
        component:WelcomeComponent
      },
      {
        path: 'users',
        component: AllUsersComponent
      },
      {
        path: 'addUser',
        component: AddUserComponent
      },
      {
        path:'products',
        component : AdminProductsComponent
      },
      {
        path:'categories',
        component : AdminCategoryComponent
      },
    ]
  },
  {
    path:'cart',
    component : CartComponent
  },
  {
    path:'my-orders',
    component : MyOrdersComponent
  },
  {
    path:'**',
    component : NotfoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
