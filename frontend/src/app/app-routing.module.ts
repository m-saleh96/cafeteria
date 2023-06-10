import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { WelcomeComponent } from './admin/welcome/welcome.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path: 'editUser/:id',
    component: EditUserComponent
  },
  {
    path: 'addUser',
    component: AddUserComponent},
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
        path:'products',
        component : AdminProductsComponent
      },
      {
        path:'categories',
        component : AdminCategoryComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
