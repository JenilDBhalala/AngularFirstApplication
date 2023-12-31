import { NgModule } from '@angular/core';
import { ProductListComponent } from './productList/product-list.component';
import { ProductDetailComponent } from './productDetail/product-detail.component';
import { ConvertToSpacePipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './productDetail/product-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacePipe,
  ],
  imports: [
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id', 
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
    ]),
    SharedModule
  ]
})
export class ProductModule { }
