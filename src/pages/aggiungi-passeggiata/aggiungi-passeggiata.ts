import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ViewController  } from 'ionic-angular';
import { CaniProvider } from '../../providers/cani/cani';


/**
 * Generated class for the AggiungiPasseggiataPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aggiungi-passeggiata',
  templateUrl: 'aggiungi-passeggiata.html',
})
export class AggiungiPasseggiataPage {
  public currentCane:any={};
  
  attivitaTipo:string;
  public caneId:string;
  public attivitaId:string;
  passeggiataOra
  passeggiate = [];
 passeggiataData
 passeggiataDurata
data

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public caniProvider:CaniProvider ) {
    this.passeggiataData=new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-');
    this.passeggiataOra = new Date().toLocaleTimeString(navigator.language,{hour: '2-digit', minute:'2-digit'});
  }

  ionViewDidEnter() {
    this.caniProvider.getCaneDett(this.navParams.get('caneId'))
    .on('value', caneSnapshot =>{
      this.currentCane = caneSnapshot.val();
    this.currentCane.id = caneSnapshot.key;
  });

  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  addPasseggiata(passeggiataData:string, passeggiataOra:string, passeggiataDurata:string) {
    this.caniProvider.addPasseggiata(passeggiataData, this.currentCane.id, passeggiataOra, passeggiataDurata).then(() => {
    this.passeggiataData='';
    this.passeggiataOra='';
    this.passeggiataDurata='';
      
      this.navCtrl.pop();
    });
  
  }
}