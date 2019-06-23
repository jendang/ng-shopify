import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product;
  id;

  constructor(
    categoryService: CategoryService, 
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {

    this.categories$ = categoryService.getCategories()
    this.id = this.route.snapshot.paramMap.get('id') // getting id params from route
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => {
      //console.log(p.payload.val())
      return this.product = p.payload.val()
    })
    
  }

  save(product) {
    if(this.id) this.productService.update(this.id, product)
    else this.productService.create(product)
    this.router.navigate(['admin/products'])
  }
  
  delete() {
    if(!confirm('Are you sure you want to delete this product')) return;

    this.productService.delete(this.id)
    this.router.navigate(['admin/products'])
    
  }

}
