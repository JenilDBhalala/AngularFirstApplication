import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: "pm-star",
    templateUrl: "./star.component.html",
    styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnChanges{
    @Input() rating: string = "0";
    cropWidth: number = 75;
    @Output() ratingClicked : EventEmitter<string> = new EventEmitter<string>();
    
    ngOnChanges(): void {
        this.cropWidth = parseFloat(this.rating) * 75/5;
    }

    onClick() : void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}