import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { ConfirmMessageComponent } from './confirm-message/confirm-message.component';



@NgModule({
  declarations: [
    ConfirmMessageComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ConfirmMessageComponent
  ]
})
export class ComponentsModule { }
