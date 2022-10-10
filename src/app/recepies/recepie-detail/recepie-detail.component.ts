import { Component, Input, OnInit } from '@angular/core';
import { Recepie } from '../recepie.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recepie-detail',
  templateUrl: './recepie-detail.component.html',
  styleUrls: ['./recepie-detail.component.css']
})
export class RecepieDetailComponent implements OnInit {
  @Input() recepie!:Recepie;


  constructor(private shoppingListService: ShoppingListService) { }

  addToCart(){
    this.shoppingListService.addIngredients(this.recepie.ingredients)
  }

  ngOnInit(): void {
  }

}
