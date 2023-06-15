import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { RequestService } from '../services/request.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-products-slider-card',
  templateUrl: './products-slider-card.component.html',
  styleUrls: ['./products-slider-card.component.css']
})
export class ProductsSliderCardComponent implements AfterViewInit, OnDestroy {
  @Input() product!: any;
  counter: number = 0;
  requests: any[] = [];
  subscription!: Subscription;

  constructor(
    private router: Router,
    private counterService: CounterService,
    private requestService: RequestService,
    private authService: AuthService
  ) { }

  redirectToProduct(id: number) {
    this.router.navigate(['product-details', id]);
  }

  ngAfterViewInit() {
    this.subscription = this.counterService.counterVal.subscribe(res => this.counter = res);
    this.requestService.orderRequests.subscribe(res => this.requests = res);
    setTimeout(() => {
      $('.slider').slick({
        dots: false,
        infinite: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 3000,
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
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addToCart(id: number) {
    this.authService.currentUsers.subscribe((data: any) => {
      if (data == null) {
        this.router.navigate(['/login']);
      } else {
        if (this.requests.includes(id)) {
          return;
        }
        this.requests.push(id);
        this.requestService.getReq(this.requests);
        this.counterService.setCounter(++this.counter);
      }
    });
  }
}
