import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCaniPage } from './lista-cani';

@NgModule({
  declarations: [
   
    ListaCaniPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCaniPage),
  ],
  exports:[
    ListaCaniPage
  ],
 
})
export class ListaCaniPageModule {}
