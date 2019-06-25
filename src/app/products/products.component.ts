import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  products: any[] = [];
  filteredProducts: any[];
  categories$;
  category: string;
  subcription: Subscription

  constructor(
    route: ActivatedRoute,
    productService: ProductService, 
    categoryService: CategoryService) { 
    
    this.categories$ = categoryService.getCategories().snapshotChanges();
    this.subcription = productService.getAll().valueChanges().subscribe(products => {
      //console.log(products)
      this.products = products;
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        //console.log(params.get('category'))
  
        this.filteredProducts = (this.category) 
        ? this.products.filter(p => p.category === this.category)
        : this.products
  
      })
    })
  }

}
