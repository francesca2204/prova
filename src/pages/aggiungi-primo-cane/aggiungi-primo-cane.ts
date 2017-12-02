import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreaCanePage} from '../crea-cane/crea-cane';

/**
 * Generated class for the AggiungiPrimoCanePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'agg-primo-cane'
})
@Component({
  selector: 'page-aggiungi-primo-cane',
  templateUrl: 'aggiungi-primo-cane.html',
})
export class AggiungiPrimoCanePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AggiungiPrimoCanePage');
  }
  goToCreation(){
    this.navCtrl.setRoot('crea-cane')
  }
}
