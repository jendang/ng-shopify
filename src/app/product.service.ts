import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) {

  }

  create(product) {
    return this.db.list('/products').push(product)
  }

  
  getAll() {
    return this.db.list('/products')
    
  }

  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges()
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product)
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove()
  }

}
