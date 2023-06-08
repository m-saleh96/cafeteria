import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { FormGroup , FormControl ,Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
products!:Product[];



constructor(private productService:ProductsService ){}



  ngOnInit(){
  this.productService.getProducts().subscribe((res:any)=>this.products=res);

}




}
