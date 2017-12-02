import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiloCanePage } from './profilo-cane';

@NgModule({
  declarations: [
    ProfiloCanePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiloCanePage),
  ],
})
export class ProfiloCanePageModule {}
