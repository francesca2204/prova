import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController,Loading  } from 'ionic-angular';
import { CaniProvider } from '../../providers/cani/cani';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { HomePage } from '../home/home';
/**
 * Generated class for the CreaCanePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'crea-cane'
})
@Component({
  selector: 'crea-cane',
  templateUrl: 'crea-cane.html',
})
export class CreaCanePage {
  public DogPicture: string = null;
  public caneId:string;
  
  ciotoleAcqua='4';
  ciotolePappa='2';
  public userProfileRef:firebase.database.Reference;
 public captureDataUrl:string;
  
  public currentCane:any={};
 
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public caniProvider: CaniProvider, private camera: Camera,public viewCtrl: ViewController,
    public loadingCtrl: LoadingController) {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfileRef = firebase.database()
        .ref(`userProfile/${user.uid}`);
     
      }
    });
    
  
  }


 createCane(caneName, caneRazza, caneGenere, caneDate, caneChip, canePeso, caneAltezza, captureDataUrl,ciotoleAcqua:string, ciotolePappa:string){
   this.caniProvider.createCane(caneName, caneRazza, caneGenere, caneDate, caneChip, canePeso, caneAltezza,captureDataUrl,ciotoleAcqua,ciotolePappa )
   .then(newCane => {
    this.loading = this.loadingCtrl.create(
      {
        content:'Solo qualche secondo',
        duration: 5000,
      }
      
    );
    this.loading.present();
    
    this.navCtrl.push('home-page');
   
   })
   ;
  
  
 }
 capture(){
  const options: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    targetHeight: 600,
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
