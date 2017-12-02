import { Component } from '@angular/core';
import { CaniProvider } from '../../providers/cani/cani';
import {  NavController, NavParams, ViewController, ModalController, IonicPage } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the ModificaCiotolePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modifica-ciotole',
  templateUrl: 'modifica-ciotole.html'
})
export class ModificaCiotole {
  ciotole: number;
  ciotolepappa: number;
  ciotoleAcqua='2';
  ciotolePappa='4';
  public currentImpo:Array<any>;
  Arr = Array;
  num:number ;
  public currentCane:any={};

  public userProfileRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public caniProvider: CaniProvider,public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfileRef = firebase.database()
        .ref(`userProfile/${user.uid}`);
     
      }
    });
    this.caniProvider.getImpostazioni(this.navParams.get('caneId'))
    .on('value', imposnapshot =>{
      this.currentImpo = imposnapshot.val();
      this.ciotoleAcqua = imposnapshot.val().Acqua;
      this.ciotolePappa = imposnapshot.val().Pappa;
  
    });
    
  }
  ionViewDidEnter() {
    this.caniProvider.getCaneDett(this.navParams.get('caneId'))
    .on('value', caneSnapshot =>{
      this.currentCane = caneSnapshot.val();
    this.currentCane.id = caneSnapshot.key;
    var datacane= this.currentCane.date;
    this.currentCane.date=datacane.replace(/T.*/,'').split('-').reverse().join('-');
  });
 
}
  ionViewDidLoad() {
  //  this.ciotole=4;
  //  this.ciotolepappa=2;
  //  this.num=this.ciotole;
  
  }
   closeModal(): void {
    this.viewCtrl.dismiss();
  }

  addCiotole(caneId:string, ciotoleAcqua:string, ciotolePappa:string) {
   this.caniProvider.addCiotole(this.currentCane.id, this.ciotoleAcqua, this.ciotolePappa)
   .then(() => {
    this.ciotoleAcqua='';
    this.ciotolePappa='';

    this.closeModal();
   });
   
   
  
  
   }
   

}
