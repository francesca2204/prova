import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { BisogniPage } from '../pages/bisogni/bisogni';
import { PhotoLibrary } from '@ionic-native/photo-library';

import { ModificaCiotole } from '../pages/modifica-ciotole/modifica-ciotole';
import {AggiungiPasseggiataPage} from '../pages/aggiungi-passeggiata/aggiungi-passeggiata';
import {GestionePage} from '../pages/gestione/gestione';

import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { CaniProvider } from '../providers/cani/cani';
import { AttivitaProvider } from '../providers/attivita/attivita';
import {  AggiungiPrimoCanePage } from '../pages/aggiungi-primo-cane/aggiungi-primo-cane';
//import { CreaCanePage } from '../pages/crea-cane/crea-cane';





class CameraMock extends Camera {
  getPicture(options){
    return new Promise( (resolve, reject) => {
      resolve(`TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1
      bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgY
      SBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb2
      4gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=`);
    });
  }
}

@NgModule({
  declarations: [
    MyApp,
    AggiungiPasseggiataPage,
    BisogniPage,
    AggiungiPrimoCanePage,
    ModificaCiotole,
    GestionePage
  //  CreaCanePage
  
    
    
    
    
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    
    IonicModule.forRoot(MyApp,
      {
        monthNames: ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'] } )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AggiungiPasseggiataPage,
    BisogniPage,
    AggiungiPrimoCanePage,
    ModificaCiotole,
    GestionePage
 //   CreaCanePage
  
 
    
    
  ],
  providers: [
    
    {provide: Camera, useClass: CameraMock},
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    AuthProvider,
    ProfileProvider,
    CaniProvider,
    AttivitaProvider,
    Camera,
    PhotoLibrary

    
   
  ]
})
export class AppModule {}
