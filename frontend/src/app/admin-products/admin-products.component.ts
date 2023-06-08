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
flag:boolean=false;
activeForm:boolean=false;



constructor(private productService:ProductsService ){}

selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addProducts:FormGroup = new FormGroup({
    'name' :new FormControl(null , [Validators.required]),
    'description' :new FormControl(null , [Validators.required ]),
    'price' :new FormControl(null , [Validators.required ]),
    'category' :new FormControl(null , [Validators.required ]),
    'photo' :new FormControl(null , [Validators.required ]),
  })

  ngOnInit(){
  this.productService.getProducts().subscribe((res:any)=>this.products=res);

}

add(addProducts:any)
  {

      if (this.addProducts.valid && this.selectedFile) {
        const formData = new FormData();
        formData.append('name', this.addProducts.get('name')!.value);
        formData.append('title', this.addProducts.get('title')!.value);
        formData.append('desc', this.addProducts.get('desc')!.value);
        formData.append('author', this.addProducts.get('author')!.value);
        formData.append('category', this.addProducts.get('category')!.value);
        formData.append('photo', this.selectedFile);

        // Send the formData to the server using HttpClient
        this.productService.addProduct(formData).subscribe((data:any)=>{
              if (data.status === 'success') {
                this.activeForm = false;
                alert("success")
              }
              else{
                this.flag = true
              }})
      }

    }

    addform(){
      this.activeForm = true;

    }

}
