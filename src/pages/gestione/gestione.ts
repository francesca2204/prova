import { Component } from '@angular/core';
import { CaniProvider } from '../../providers/cani/cani';
import {  NavController, NavParams, ViewController, ModalController, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the GestionePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestione',
  templateUrl: 'gestione.html',
})
export class GestionePage {
  public userProfileRef:firebase.database.Reference;
  public currentGestione:Array<any>;
  public currentCane:any={};
  public caneId;
  public acqua:boolean=true;
  public bisogni:boolean=true;
  public passeggiata:boolean=true;
  public pappa:boolean=true;

  cucumber:boolean;

  currentIm;
  constructor(public navCtrl: NavController, public caniProvider: CaniProvider,public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfileRef = firebase.database()
        .ref(`userProfile/${user.uid}`);
     
      }
      this.caniProvider.getImpo(this.navParams.get('caneId'))
      .on('value', imsnapshot =>{
        this.currentIm = imsnapshot.val();
       this.acqua = imsnapshot.val().acqua;
       this.pappa = imsnapshot.val().pappa;
       this.bisogni = imsnapshot.val().bisogni;
       this.passeggiata = imsnapshot.val().passeggiata;
        
      });
      this.caniProvider.getCaneDett(this.navParams.get('caneId'))
      .on('value', caneSnapshot =>{
        this.currentCane = caneSnapshot.val();
      this.currentCane.id = caneSnapshot.key;
      var datacane= this.currentCane.date;
      this.currentCane.date=datacane.replace(/T.*/,'').split('-').reverse().join('-');
    });
 
  
 
  });



 
 


  }

closeModal(): void {
  this.viewCtrl.dismiss();
 }
 salvaImpo(caneId:string, acquashow:boolean, pappashow:boolean, bisognishow:boolean, passeggiatashow:boolean){
   this.caniProvider.salvaImpo(this.currentCane.id, this.acqua, this.pappa, this.bisogni, this.passeggiata).then(()=>{
   

   });
 }

}
