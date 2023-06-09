import { Component , Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input() product!:any

constructor(private route:Router ){}

redirectToProduct(id:number){
  this.route.navigate(['product-details' , id])
}

}
