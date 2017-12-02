import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { CaniProvider } from '../../providers/cani/cani';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

/**
 * Generated class for the ProfiloCanePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'profilo-cane',
  segment: 'cane-dett/:caneId'
})
@Component({
  selector: 'page-profilo-cane',
  templateUrl: 'profilo-cane.html',
})
export class ProfiloCanePage {
  captureDataUrl:string;
  
  public currentCane:any={};
  public userProfileRef:firebase.database.Reference;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public caniProvider: CaniProvider,  private camera: Camera) {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfileRef = firebase.database()
        .ref(`userProfile/${user.uid}`);
     
      }
    });
  }

  ionViewDidEnter() {
    this.caniProvider.getCaneDett(this.navParams.get('caneId'))
    .on('value', caneSnapshot =>{
      this.currentCane = caneSnapshot.val();
    this.currentCane.id = caneSnapshot.key;
   // var datacane= this.currentCane.date;
    //this.currentCane.date=datacane.replace(/T.*/,'').split('-').reverse().join('-');
  });
}
eliminaCane() { 
  let alert = this.alertCtrl.create({
  title: 'Eliminazione Cane',
  message: 'Sei sicuro di volere eliminare questo cane? ',
  buttons:[
    {
      text:'Annulla',
    },
    {
      text: 'Elimina',
      handler:()=>{
        this.caniProvider.getCaneDett(this.navParams.get('caneId')).ref.remove().then(() => {
         
        this.navCtrl.setRoot(HomePage);
      });
    }
    }
  ]
  });

alert.present();
}
capture(){
const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 // Handle error
});
}
upload():any{
  var storageRef = this.userProfileRef.child('/caniList').child(this.currentCane.id);//firebase.storage().ref();
  const filename = Math.floor(Date.now()/ 1000);
 const imageRef = storageRef
 ;
  imageRef.push({captureDataUrl:this.captureDataUrl}).then((snapshot)=> {
    // Do something here when the data is succesfully uploaded!
//return this.userProfileRef.child('/caniList').child(this.currentCane.id).push(captureDataUrl)
   
});
}

}
