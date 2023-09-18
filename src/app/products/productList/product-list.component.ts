import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { Subscription, filter } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    constructor(private productService: ProductService) { }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = "";
    sub: Subscription | undefined;

    private _listFilter = '';

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    toggleImage() {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => { 
                this.products = products,
                this.filteredProducts = this.products
            },
            error: err => this.errorMessage = err
        });
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List ' + message;
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}
