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
  activeAddbutton:boolean = false;
  activeupdatebutton:boolean = false;
  productId!:number;

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
      if (this.activeAddbutton) {
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
                  this.activeAddbutton = false
                  alert("success")
                }
                else{
                  this.flag = true
                }})
        }

      } else if(this.activeupdatebutton){
        if (this.addProducts.valid && this.selectedFile) {
          const formData = new FormData();
          formData.append('name', this.addProducts.get('name')!.value);
          formData.append('title', this.addProducts.get('title')!.value);
          formData.append('desc', this.addProducts.get('desc')!.value);
          formData.append('author', this.addProducts.get('author')!.value);
          formData.append('category', this.addProducts.get('category')!.value);
          formData.append('photo', this.selectedFile);

        this.productService.updateProduct(this.productId ,formData).subscribe((data:any)=>{
          console.log(data);

          if (data.status === 'success') {
            this.activeForm = false;
            this.activeupdatebutton = false
            alert("Updated")
          }
          else{
            this.flag = true
          }})
        }
      }
    }



  deleteproducts(_id: number) {
    this.products = this.products.filter((elem:any)=>(elem._id)!=_id)
    this.productService.getProduct(_id).subscribe((res:any) => {
      if (res.success) {
        this.productService.getProducts();
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
    console.log(this.productId);

    this.activeForm = true;
    this.activeupdatebutton = true;
    this.activeAddbutton = false;
  }

}
