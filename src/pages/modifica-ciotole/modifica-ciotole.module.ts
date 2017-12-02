import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificaCiotole } from './modifica-ciotole';

@NgModule({
  declarations: [
    ModificaCiotole,
  ],
  imports: [
    IonicPageModule.forChild(ModificaCiotole),
  ],
})
export class ModificaCiotolePageModule {}
