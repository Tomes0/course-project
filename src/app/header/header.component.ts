import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selector: EventEmitter<string> = new EventEmitter();

  onSelect(selection: string){
    this.selector.emit(selection);
  }




  constructor() { }

  ngOnInit(): void {
  }

}
