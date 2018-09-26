import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  urlBase = 'http://netflames-catalog.herokuapp.com/api/catalog/';
  items: any;
  brands: any;
  types: any;
  selectedBrand: any;
  selectedType: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getItems();
    this.getBrands();
    this.getTypes();
  }

  updateItemList() {
    this.getItems(this.selectedBrand, this.selectedType);
  }

  getItems(filterBrand: number = 0, filterType: number = 0) {
    if (filterBrand === 0 && filterType === 0)  {
      this.http.get( this.urlBase + 'item' ).subscribe(response => {
        this.items = response;
      }, error => {
        console.error(error);
      });
      return;
    }

    if (filterBrand >= 1 && filterType <= 0)  {
        this.http.get(this.urlBase + 'item/brand/' + filterBrand).subscribe(response => {
        this.items = response;
      }, error => {
        console.error(error);
      });
      return;
    }

    if (filterType >= 1 && filterBrand <= 0)  {
      this.http.get(this.urlBase + 'item/type/' + filterType).subscribe(response => {
        this.items = response;
      }, error => {
        console.error(error);
      });
      return;
    }

    if (filterType >= 1 && filterBrand >= 1)  {
      this.http.get(this.urlBase + 'item/filter/' + filterBrand + '/' + filterType).subscribe(response => {
        this.items = response;
      }, error => {
        console.error(error);
      });
      return;
    }
  }

  getBrands() {
    this.http.get(this.urlBase + 'brand').subscribe(response => {
      this.brands = response;
    }, error => {
      console.error(error);
    });
  }

  getTypes() {
    this.http.get(this.urlBase + 'type').subscribe(response => {
      this.types = response;
    }, error => {
      console.error(error);
    });
  }
}
