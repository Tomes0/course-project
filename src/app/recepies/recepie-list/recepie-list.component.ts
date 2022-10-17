import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recepie } from '../recepie.model';
import { RecepieService } from '../recepie.service';

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrls: ['./recepie-list.component.css']
})
export class RecepieListComponent implements OnInit, OnDestroy {
  recepies: Recepie[];
  private sub: Subscription;

  constructor(private recepieService: RecepieService) { }

  ngOnInit(): void {
    this.sub = this.recepieService.recepiesChanged.subscribe(
      (recepies: Recepie[]) => {
        this.recepies = recepies;
      }
    );
    this.recepies = this.recepieService.getRecepies();

  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
