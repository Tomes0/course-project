import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selector: string = 'recepie';

  onSelection(selection: string){
    this.selector = selection;
  }
}
