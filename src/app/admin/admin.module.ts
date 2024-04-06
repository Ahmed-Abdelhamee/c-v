import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinksComponent } from './links/links.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LinksComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    RouterModule
  ],
  exports:[
    LinksComponent
  ]
})
export class AdminModule { }
