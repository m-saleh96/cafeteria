import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { FormGroup , FormControl ,Validators, FormBuilder} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {
  category!:Category[];
  categoryId!:any;
  flag:boolean = false;
  activeForm:boolean=false;
  activeAddbutton:boolean = false;
  activeupdatebutton:boolean = false;


  addCategory:FormGroup = new FormGroup({
    'name' :new FormControl(null , [Validators.required]),
  })

  constructor(private categoryService:CategoryService){}
  ngOnInit() {
    this.categoryService.getCategories().subscribe((res: any) =>this.category = res);
  }

  add(addCategory:any)
  {
    if (this.activeAddbutton) {
      if (this.addCategory.valid) {;
        const formData = new FormData();
        formData.append('name', this.addCategory.get('name')!.value);
        this.categoryService.createCategory(formData).subscribe((data:any)=>{
          if (data) {
            this.activeForm = false;
            this.activeAddbutton = false
            alert("success")
            window.location.reload();
          }
          else{
            this.flag = true
          }
        })
      }

    } else if(this.activeupdatebutton){
      if (this.addCategory.valid) {
      const formData = new FormData();
      formData.append('name', this.addCategory.get('name')!.value);
      this.categoryService.updateCategory(formData , this.categoryId).subscribe((data:any)=>{
        if (data) {
          this.activeForm = false;
          this.activeupdatebutton = false
          alert("Updated")
          window.location.reload();
        }
        else{
          this.flag = true
        }})
      }
    }
  }



  deletecategory(id: number) {
    this.category = this.category.filter((elem:any)=>(elem.id)!=id)
    this.categoryService.deletecategory(id).subscribe((res:any) => {
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
    this.categoryId=id;
    this.activeForm = true;
    this.activeupdatebutton = true;
    this.activeAddbutton = false;
  }

}
