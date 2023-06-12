import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { FormGroup , FormControl ,Validators, FormBuilder} from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products!:Product[];
  category!:Category[];
  flag:boolean=false;
  activeForm:boolean=false;
  activeAddbutton:boolean = false;
  activeupdatebutton:boolean = false;
  productId!:number;
  oldPic!:any;

  constructor(private productService:ProductsService , private categoryService:CategoryService){}

  selectedFile: File | null = null;
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    addProducts:FormGroup = new FormGroup({
      'name' :new FormControl(null , [Validators.required]),
      'description' :new FormControl(null , [Validators.required ]),
      'price' :new FormControl(null , [Validators.required ]),
      'category_id' :new FormControl(null , [Validators.required ]),
      'picture' :new FormControl(null),
    })

    ngOnInit(){
    this.productService.getProducts().subscribe((res:any)=>this.products=res);
    this.categoryService.getCategories().subscribe((res:any)=>this.category=res)

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
        if (this.addProducts.valid ) {
          const formData = new FormData();
          formData.append('name', this.addProducts.get('name')!.value);
          formData.append('description', this.addProducts.get('description')!.value);
          formData.append('price', this.addProducts.get('price')!.value);
          formData.append('category_id', this.addProducts.get('category_id')!.value);
          if(this.selectedFile){
          formData.append('picture', this.selectedFile);
          }else{
            formData.append('picture', this.oldPic);
          }

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
    window.scroll(0,0);
    this.productId=id;
    this.activeForm = true;
    this.activeupdatebutton = true;
    this.activeAddbutton = false;
    const product = this.products.find((elem: any) => elem.id === id);
    if (product) {
      this.oldPic = product.picture;
      this.addProducts.patchValue({
        'name': product.name,
        'description':product.description,
        'price':product.price,
        'category_id':product.category_id,
      });
    }
  }

}
