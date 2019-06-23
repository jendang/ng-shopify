import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories()
    
  }

  onChange(e) {
    console.log(e.target)
    //console.log(this.categories$)
    //console.log(this.category.setValue(e.target.value))
    //this.categories$.setValue(e.target.value)
  }

  save(product) {
    //console.log(product)
    this.productService.create(product)
  }
  

}
