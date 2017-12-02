import { Component } from '@angular/core';
import { NavController,IonicPage, Loading,
  LoadingController, NavParams } from 'ionic-angular';

import { CaneDettPage } from '../cane-dett/cane-dett';
import { ModalController } from 'ionic-angular';
import { CaniProvider } from '../../providers/cani/cani';
@IonicPage({
  name:'home-page',
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
today
public caniList: Array<any>;
caneDate
canegenere

public currentCane:any={};


  constructor(public navCtrl: NavController, public modalCtrl:ModalController, public caniProvider: CaniProvider,public loadingCtrl: LoadingController,public navParams: NavParams) {
 
    this.caneDate = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-');

    
  }
  ionViewDidLoad(){

 
  
   
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
          foto: snap.val().foto,
          genere:snap.val().genere,
          
          
        });
        return false
      });
     
    });


  }
goToProfile()
   
     {
    this.navCtrl.push('profile');
    
    
  }

goToCreate(){
  this.navCtrl.setRoot('crea-cane');
}
//goToList(){ this.navCtrl.push('cani-list');}
goCaneDett(caneId){
  this.navCtrl.push('cane-dett', {'caneId': caneId });
}

  }



