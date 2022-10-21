import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated = false;

  onSaveData(){
    this.dataStorageService.storeRecepies();
  }

  onFetchData(){
    this.dataStorageService.fetchRecepies().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;

    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }
}
