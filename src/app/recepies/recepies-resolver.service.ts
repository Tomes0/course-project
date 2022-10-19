import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recepie } from "./recepie.model";
import { RecepieService } from "./recepie.service";

@Injectable({providedIn: 'root'})
export class RecepieResolver implements Resolve<Recepie[]>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recepie[] | Observable<Recepie[]> | Promise<Recepie[]> {
    const recepies = this.recepiesService.getRecepies();
    if(recepies.length === 0){
      return this.dataStorageService.fetchRecepies();
    }
    return recepies;

  }

  constructor(private dataStorageService: DataStorageService, private recepiesService: RecepieService){}
}
