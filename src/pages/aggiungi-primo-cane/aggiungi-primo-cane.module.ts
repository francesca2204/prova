import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AggiungiPrimoCanePage } from './aggiungi-primo-cane';
import {CreaCanePage} from '../crea-cane/crea-cane';

@NgModule({
  declarations: [
    AggiungiPrimoCanePage,
    CreaCanePage,
  ],
  imports: [
    IonicPageModule.forChild(AggiungiPrimoCanePage),
  ],
})
export class AggiungiPrimoCanePageModule {}
