import { Component, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { RequestService } from '../services/request.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-products-slider-card',
  templateUrl: './products-slider-card.component.html',
  styleUrls: ['./products-slider-card.component.css']
})
export class ProductsSliderCardComponent implements AfterViewInit {
  @Input() product!: any;
  counter: number = 0;
  requests: any;

  constructor(private route: Router, private counterService: CounterService, private requestService: RequestService,
    private authService: AuthService,private router: Router) { }

  redirectToProduct(id: number) {
    this.route.navigate(['product-details', id]);
  }

  ngOnInit() {
    this.counterService.counterVal.subscribe(res => this.counter = res);
    this.requestService.orderRequests.subscribe(res => this.requests = res);
  };

  ngAfterViewInit() {
    $('.slider').slick({
      dots: false,
      infinite: true,
      arrows: false,
      speed: 700,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ],
    });
  }

  addToCart(id: number) {
    this.authService.currentUsers.subscribe((data: any) => {
      if (data == null) {
        this.router.navigate(['/login'])
      } else {
        if (this.requests.includes(id)) {
          return;
        }
        this.requests.push(id);
        this.requestService.getReq(this.requests);
        this.counterService.setCounter(++this.counter);
      }
    })
  }
}
