import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CaniProvider } from '../../providers/cani/cani';
import { CaneDettPage } from '../cane-dett/cane-dett';

/**
 * Generated class for the ListaCaniPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'cani-list'
})
@Component({
  selector: 'lista-cani',
  templateUrl:'lista-cani.html'
  
})
export class ListaCaniPage {
public caniList: Array<any>;

  constructor(public navCtrl: NavController, public caniProvider: CaniProvider) {
  }

  ionViewDidEnter() {
    this.caniProvider.getCaniList().on('value', snapshot => {
      this.caniList = [];
      snapshot.forEach( snap=> {
        this.caniList.push({
          id:snap.key,
          name:snap.val().name,
          razza: snap.val().razza,
          date: snap.val().date,
        });
        return false
      });
    });

  }
  goCaneDett(caneId){
    this.navCtrl.push('cane-dett', {'caneId': caneId });
  }

  


}
 