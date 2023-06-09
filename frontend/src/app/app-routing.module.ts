import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';

const routes: Routes = [
  {
    path: 'users',
    component: AllUsersComponent
  },
  {
    path: 'addUser',
    component: AddUserComponent},
  {
    path:'',
    component : ProductListComponent
  },
  {
    path:'products',
    component : ProductListComponent
  },
  {
    path:'product-details/:id',
    component : ProductDetailsComponent
  },
  {
    path:'admin-product',
    component : AdminProductsComponent
  },
  {
    path:'admin-category',
    component : AdminCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
