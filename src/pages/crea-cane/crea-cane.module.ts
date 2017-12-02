import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreaCanePage } from './crea-cane';

@NgModule({
  declarations: [
    CreaCanePage,
  ],
  imports: [
    IonicPageModule.forChild(CreaCanePage),
  ],
})
export class CreaCanePageModule {}
