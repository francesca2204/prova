import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ViewController } from 'ionic-angular';
import { CaniProvider } from '../../providers/cani/cani';




/**
 * Generated class for the BisogniPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bisogni',
  templateUrl: 'bisogni.html',
})
export class BisogniPage {
  public currentCane:any={};
  public currentAttivita:any={};
  public attivitaList: Array<any>;
  attivitaTipo:string;
  public caneId:string;
  cucumber:boolean;
  public attivitaId:string;
  attivitaOra
  attivitas = [];
  attivitaData
data

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public caniProvider:CaniProvider ) {
    this.attivitaData=new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-');
     this.attivitaOra = new Date().toLocaleTimeString(navigator.language,{hour: '2-digit', minute:'2-digit'});
    
     //.toLocaleTimeString().split(" ")[0];
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
addAttivita(attivitaData:string, attivitaTipo:string, attivitaOra:string) {
    this.caniProvider.addAttivita(attivitaData, this.currentCane.id, attivitaTipo, attivitaOra).then(() => {
      this.attivitaData = '';
      this.attivitaTipo = '';
      this.attivitaOra = '';
      
      this.navCtrl.pop();
    });
  
  }



}