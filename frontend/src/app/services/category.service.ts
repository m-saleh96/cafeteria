import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories() {
    return this.http.get('http://localhost/cafeteria/backend/categories');
  }

  createCategory(formData:any) {
    return this.http.post('http://localhost/cafeteria/backend/categories' , formData );
  }

  updateCategory(formData:any , id:any) {
  return this.http.put('http://localhost/cafeteria/backend/categories/'+id , formData);
  }

  deletecategory(id:number) {
    return this.http.delete(('http://localhost/cafeteria/backend/category/'+id));
  }



}
