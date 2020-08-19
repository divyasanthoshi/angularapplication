import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { TabsHeaderComponent } from './tabs-header/tabs-header.component';
import { TabsOptionsComponent } from './tabs-options/tabs-options.component';
import { TabsMenuComponent } from './tabs-menu/tabs-menu.component';



const routes: Routes = [
  { path:'', component:TabsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { 
  static components = [
    TabsComponent,
    TabsHeaderComponent,
    TabsOptionsComponent,
    TabsMenuComponent
  ]
}
