import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
