import { Component, OnInit } from '@angular/core';
import { TabsConstants } from './tabs.constant';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  selectedTabs: string

  constructor() { }

  ngOnInit() {
    this.selectedTabs = TabsConstants.tabName.dashboard;
  }

  selectTab(selectedTab: string){
    this.selectedTabs = selectedTab;
  }

}
