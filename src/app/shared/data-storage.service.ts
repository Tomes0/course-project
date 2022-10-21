import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recepie } from '../recepies/recepie.model';
import { RecepieService } from '../recepies/recepie.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
  constructor(
    private http: HttpClient,
    private recepieService: RecepieService,
    private authService: AuthService) { }

  storeRecepies() {
    const recepies = this.recepieService.getRecepies();
    this.http.put(
      'https://angular-course-kuti-default-rtdb.europe-west1.firebasedatabase.app/recepies.json',
      recepies
      )
      .subscribe( response =>{
        console.log(response);
      } );
  }

  fetchRecepies(){
    return this.http
      .get<Recepie[]>(
        'https://angular-course-kuti-default-rtdb.europe-west1.firebasedatabase.app/recepies.json'
      )
      .pipe(
      map(recepies => {
        return recepies.map(recepie => {
          return{
            ...recepie, ingredients: recepie.ingredients ? recepie.ingredients : []
        }
      });
    }),
      tap(recepies => {
        this.recepieService.setRecepies(recepies);
  }));

  }
}
