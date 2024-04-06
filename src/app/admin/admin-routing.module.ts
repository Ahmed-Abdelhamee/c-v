import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinksComponent } from './links/links.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path:"admin",component:AdminComponent, children:[
    {path:"links",component:LinksComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
