import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recepie } from '../recepie.model';
import { RecepieService } from '../recepie.service';

@Component({
  selector: 'app-recepie-edit',
  templateUrl: './recepie-edit.component.html',
  styleUrls: ['./recepie-edit.component.css']
})
export class RecepieEditComponent implements OnInit {
  id: number;
  editMode = false;
  recepieForm: FormGroup;

  constructor(private route:ActivatedRoute, private recepieService: RecepieService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recepieName = '';
    let recepieImagePath = '';
    let recepieDescription = '';
    let recepieIngredients = new FormArray([]);

    if(this.editMode){
      const recepie = this.recepieService.getRecepieById(this.id);
      recepieName = recepie.name;
      recepieDescription = recepie.description;
      recepieImagePath = recepie.imagePath;
      if(recepie['ingredients']){
        for (let ingrednt of recepie.ingredients){
          recepieIngredients.push(
            new FormGroup({
              'name': new FormControl(ingrednt.name, Validators.required),
              'amount': new FormControl(ingrednt.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recepieForm = new FormGroup({
      'name': new FormControl(recepieName, Validators.required),
      'imagePath': new FormControl(recepieImagePath, Validators.required),
      'description': new FormControl(recepieDescription, Validators.required),
      'ingredients': recepieIngredients
    });
  }

  onSubmit(){
    /* const newRecepie = new Recepie(
      this.recepieForm.value['name'],
      this.recepieForm.value['description'],
      this.recepieForm.value['imagePath'],
      this.recepieForm.value['ingredients']
      ) */
    if(this.editMode){
      this.recepieService.updateRecepie(this.id, this.recepieForm.value);
    }else this.recepieService.addRecepie(this.recepieForm.value);

    this.redirect();
  }

  onAddIngredient(){
    (<FormArray>this.recepieForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  redirect(){
    this.router.navigate(['../']);
  }

  get controls() { // a getter!
    return (<FormArray>this.recepieForm.get('ingredients')).controls;
  }

  onDelete(i: number){
    (<FormArray>this.recepieForm.get('ingredients')).removeAt(i);

  }

}
