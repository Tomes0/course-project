import { Component, OnInit } from '@angular/core';
import { Recepie } from '../recepie.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RecepieService } from '../recepie.service';

@Component({
  selector: 'app-recepie-detail',
  templateUrl: './recepie-detail.component.html',
  styleUrls: ['./recepie-detail.component.css']
})
export class RecepieDetailComponent implements OnInit {
  recepie:Recepie;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private recepieService: RecepieService) { }

  addToCart(){
    this.shoppingListService.addIngredients(this.recepie.ingredients)
  }

  ngOnInit(): void {
    this.route.params.subscribe( (param: Params) =>{
      this.id = +param['id'];
      this.recepie = this.recepieService.getRecepieById(this.id);
    });
  }

}
