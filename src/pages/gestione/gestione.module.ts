import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionePage } from './gestione';

@NgModule({
  declarations: [
    GestionePage,
  ],
  imports: [
    IonicPageModule.forChild(GestionePage),
  ],
})
export class GestionePageModule {}
