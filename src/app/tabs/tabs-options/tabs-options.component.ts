import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs-options',
  templateUrl: './tabs-options.component.html',
  styleUrls: ['./tabs-options.component.scss'],
})
export class TabsOptionsComponent implements OnInit {

  @Output() selectedTab = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {}

  selectTab(tabValue: string){
    this.selectedTab.emit(tabValue);
  }

}
