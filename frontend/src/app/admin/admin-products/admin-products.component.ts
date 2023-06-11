import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
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
  activeAddbutton:boolean = false;
  activeupdatebutton:boolean = false;
  productId!:number;

  constructor(private productService:ProductsService){}

  selectedFile: File | null = null;
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    addProducts:FormGroup = new FormGroup({
      'name' :new FormControl(null , [Validators.required]),
      'description' :new FormControl(null , [Validators.required ]),
      'price' :new FormControl(null , [Validators.required ]),
      'category_id' :new FormControl(null , [Validators.required ]),
      'picture' :new FormControl(null , [Validators.required ]),
    })

    ngOnInit(){
    this.productService.getProducts().subscribe((res:any)=>this.products=res);

  }

  add(addProducts:any)
    {
      if (this.activeAddbutton) {
        if (this.addProducts.valid && this.selectedFile) {
          const formData = new FormData();
          formData.append('name', this.addProducts.get('name')!.value);
          formData.append('description', this.addProducts.get('description')!.value);
          formData.append('price', this.addProducts.get('price')!.value);
          formData.append('category_id', this.addProducts.get('category_id')!.value);
          formData.append('picture', this.selectedFile);
          this.productService.addProduct(formData).subscribe((data:any)=>{
                if (data) {
                  this.activeForm = false;
                  this.activeAddbutton = false;
                  alert("success");
                  window.location.reload();
                }
                else{
                  this.flag = true;
                }})
        }

      } else if(this.activeupdatebutton){
        if (this.addProducts.valid && this.selectedFile) {
          const formData = new FormData();
          formData.append('name', this.addProducts.get('name')!.value);
          formData.append('description', this.addProducts.get('description')!.value);
          formData.append('price', this.addProducts.get('price')!.value);
          formData.append('category_id', this.addProducts.get('category_id')!.value);
          formData.append('picture', this.selectedFile);

        this.productService.updateProduct(this.productId ,formData).subscribe((data:any)=>{
          if (data) {
            this.activeForm = false;
            this.activeupdatebutton = false
            alert("Updated")
            window.location.reload();
          }
          else{
            this.flag = true;
          }})
        }
      }
    }



  deleteproducts(id: number) {
    this.products = this.products.filter((elem:any)=>(elem.id)!=id)
    this.productService.deleteProduct(id).subscribe((res:any) => {
      if (res) {
        alert("deleted successfully");
        window.location.reload();
      }
    });
  }

  addform(){
    this.activeForm = true;
    this.activeAddbutton = true;
    this.activeupdatebutton = false;
  }
  updateform(id:number){
    this.productId=id;
    this.activeForm = true;
    this.activeupdatebutton = true;
    this.activeAddbutton = false;
  }

}
