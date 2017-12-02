import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BisogniPage } from './bisogni';

@NgModule({
  declarations: [
    BisogniPage,
  ],
  imports: [
    IonicPageModule.forChild(BisogniPage),
  ],
})
export class BisogniPageModule {}
