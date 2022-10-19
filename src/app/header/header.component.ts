import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) { }

  onSaveData(){
    this.dataStorageService.storeRecepies();
  }

  onFetchData(){
    this.dataStorageService.fetchRecepies().subscribe();
  }

  ngOnInit(): void {
  }

}
