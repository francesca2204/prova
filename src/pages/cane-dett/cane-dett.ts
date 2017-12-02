import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CaniProvider } from '../../providers/cani/cani';
import { BisogniPage } from '../bisogni/bisogni';
import { ModalController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AggiungiPasseggiataPage } from '../aggiungi-passeggiata/aggiungi-passeggiata';
import { ModificaCiotole } from '../modifica-ciotole/modifica-ciotole';

import { ProfiloCanePage } from '../profilo-cane/profilo-cane';
import { GestionePage } from '../gestione/gestione';
import firebase from 'firebase';

/**
 * Generated class for the CaneDettPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'cane-dett',
  segment: 'cane-dett/:caneId'
})
@Component({
  selector: 'page-cane-dett',
  templateUrl: 'cane-dett.html',
})
export class CaneDettPage {
  public cameraPlugin: Camera;
  public DogPicture: string = null;
public currentCane:any={};
public currentA:any={};
public attivitaName:string='';
public attivitaList: Array<any>;
public passeggiataList: Array<any>;
public bevuteList: Array<any>;
attivitaTipo:string;
public caneId:string;
public attivitaId:string;
public pappaId:string;
public attivitas :Array<any>;
public passeggiate :Array<any>;
public bereList:Array<any>;
public pappaList:Array<any>;
public bereId:string;

bisognoId:string;
passeggiateId:string;
public loadedAttivitaList:Array<any>;
public loadedPasseggiataList:Array<any>;
correnti;

ciotoleAcqua='4';
ciotolePappa='2';
public currentImpo:Array<any>;
obiettivoraggiunto;
obb
bereData;
currentIm;
//per far apparire o sparire le cards delle attivita
public pappa:boolean;
public acqua:boolean;
public bisogni:boolean;
public passeggiata:boolean;
//
mangiareData;
  public userProfileRef:firebase.database.Reference;
 public today;
data



  constructor(public navCtrl: NavController, public navParams: NavParams, public caniProvider: CaniProvider, public modalCtrl:ModalController, ) {
 
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfileRef = firebase.database()
        .ref(`userProfile/${user.uid}`);
     
      }
    });
    

    var datee= new Date();
    datee.setHours(datee.getHours()-2);
    this.today= datee.toISOString();
    var today = this.today;
    this.bereData=new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-');
    this.mangiareData=new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-');

   
     
    
       
  }

  ionViewDidEnter() {
    
    this.caniProvider.getCaneDett(this.navParams.get('caneId'))
    .on('value', caneSnapshot =>{
      this.currentCane = caneSnapshot.val();
    this.currentCane.id = caneSnapshot.key;
    var datacane= this.currentCane.date;
    this.currentCane.date=datacane.replace(/T.*/,'').split('-').reverse().join('-');

    //ciotole
    this.caniProvider.getImpostazioni(this.navParams.get('caneId'))
    .on('value', imposnapshot =>{
      this.currentImpo = imposnapshot.val();
      this.ciotoleAcqua = imposnapshot.val().Acqua;
      this.ciotolePappa = imposnapshot.val().Pappa;
  
    });
   
    this.caniProvider.getImpo(this.navParams.get('caneId'))
    .on('value', imsnapshot =>{
      this.currentIm = imsnapshot.val();
     this.acqua = imsnapshot.val().acqua;
     this.pappa = imsnapshot.val().pappa;
     this.bisogni = imsnapshot.val().bisogni;
     this.passeggiata = imsnapshot.val().passeggiata;
      
    });
  });
 


//di default mostra le attivita per il determinato giorno
var datee= new Date();
datee.setHours(datee.getHours()-2);
    this.data= datee.toISOString().replace(/T.*/,'').split('-').reverse().join('-');
    var date = this.data;
    this.caniProvider.getattivitaList(this.navParams.get('caneId')).ref.orderByChild('data').equalTo(date).on('value', attivitaList => {
      let attivitas = [];
         // this.attivitaList = [];
          attivitaList.forEach( attivita => {
            attivitas.push({
              
              data:attivita.val().data,
              tipo: attivita.val().tipo,
              ora: attivita.val().ora,
              Id:attivita.key,
               
              
            });
            return false
          });
         
       this.attivitaList=attivitas;
       this.loadedAttivitaList=attivitas;
       
      
      });//ora passeggiata
      
      this.caniProvider.getPasseggiataList(this.navParams.get('caneId')).ref.orderByChild('data').equalTo(date).on('value', passeggiataList => {
        let passeggiate = [];
           // this.attivitaList = [];
            passeggiataList.forEach( passeggiata => {
              passeggiate.push({
                
                data:passeggiata.val().data,
                ora: passeggiata.val().ora,
                durata: passeggiata.val().durata,
                Id:passeggiata.key,
                 
                
              });
              return false
            });
           
         this.passeggiataList=passeggiate;
         this.loadedPasseggiataList=passeggiate;
         
        
        });
//ora bere
this.caniProvider.getBereList(this.navParams.get('caneId')).ref.orderByChild('data').equalTo(date).on('value', bereList => {
  let bevute = [];
     // this.attivitaList = [];
      bereList.forEach( bere => {
        bevute.push({
          
          data:bere.val().data,
        
          Id:bere.key,
           
          
        });
        return false
      });
      this.bereList=bevute;
  
  
  });
//ora pappa
this.caniProvider.getPappaList(this.navParams.get('caneId')).ref.orderByChild('data').equalTo(date).on('value', pappaList => {
  let mangiate = [];
     // this.attivitaList = [];
      pappaList.forEach( pappa => {
        mangiate.push({
          
          data:pappa.val().data,
      
          Id:pappa.key,
           
          
        });
        return false
      });
      this.pappaList=mangiate;
      
  
  
  });


}

  //al cambio di data cambia la lista delle attivita 
cambiaData(data){
  
  var date = this.data.replace(/T.*/,'').split('-').reverse().join('-');
  this.caniProvider.getattivitaList(this.navParams.get('caneId')).ref.orderByChild('data').equalTo(date).on('value', attivitaList => {
    let attivitas = [];
       // this.attivitaList = [];
        attivitaList.forEach( attivita => {
          attivitas.push({
            
            data:attivita.val().data,
            tipo: attivita.val().tipo,
            ora: attivita.val().ora,

            Id:attivita.key,
            
            
          });
          return false
        });
     this.attivitaList=attivitas;
     this.loadedAttivitaList=attivitas;
     
    });
    this.caniProvider.getPasseggiataList(this.navParams.get('caneId')).ref.orderByChild('data').equalTo(date).on('value', passeggiataList => {
      let passeggiate = [];
         // this.attivitaList = [];
          passeggiataList.forEach( passeggiata => {
            passeggiate.push({
              
              data:passeggiata.val().data,
              ora: passeggiata.val().ora,
              durata: passeggiata.val().durata,
              Id:passeggiata.key,
               
              
            });
            return false
          });
         
       this.passeggiataList=passeggiate;
       this.loadedPasseggiataList=passeggiate;
       
      
      });
      this.caniProvider.getPappaList(this.navParams.get('caneId')).ref.orderByChild('data').equalTo(date).on('value', pappaList => {
        let mangiate = [];
           // this.attivitaList = [];
            pappaList.forEach( pappa => {
              mangiate.push({
                
                data:pappa.val().data,
            
                Id:pappa.key,
                 
                
              });
              return false
            });
            this.pappaList=mangiate;
            
        
        
        });
        this.caniProvider.getBereList(this.navParams.get('caneId')).ref.orderByChild('data').equalTo(date).on('value', bereList => {
          let bevute = [];
             // this.attivitaList = [];
              bereList.forEach( bere => {
                bevute.push({
                  
                  data:bere.val().data,
                
                  Id:bere.key,
                   
                  
                });
                return false
              });
              this.bereList=bevute;
          
          
          });
   


}


  presentBisogniModal() {
    let BisogniModal = this.modalCtrl.create(BisogniPage,{caneId:this.currentCane.id});
    BisogniModal.present();
  }
  presentPasseggiataModal() {
    let PasseggiataModal = this.modalCtrl.create(AggiungiPasseggiataPage,{caneId:this.currentCane.id});
    PasseggiataModal.present();
  }
  eliminaCane() { 
  this.caniProvider.getCaneDett(this.navParams.get('caneId')).ref.remove();
  this.navCtrl.push('home-page');
  }
  
  modificaCiotole(){
    let modificaCiotoleModal = this.modalCtrl.create(ModificaCiotole,{caneId:this.currentCane.id});
    modificaCiotoleModal.present();
  }
  gestisci(){
    let gestisciModal = this.modalCtrl.create(GestionePage,{caneId:this.currentCane.id});
   gestisciModal.present();
  }
  addBere(caneId:string, bereData){
    this.caniProvider.addBere(this.currentCane.id,this.bereData).then(() => {
    
      
  
    });
  
   }
   addMangiare(caneId:string, mangiareData){
     
    this.caniProvider.addMangiare(this.currentCane.id,this.mangiareData).then(() => {
    
      
  
    });
  
   }
elimina(){
  var bisognoId=this.bisognoId;
  this.caniProvider.getCaneDett(this.navParams.get('caneId')).child('/attivitaList').child('/bisogni').child(bisognoId).ref.remove();
}
eliminaPasseggiata(){
  var passeggiateId=this.passeggiateId;
  this.caniProvider.getCaneDett(this.navParams.get('caneId')).child('/attivitaList').child('/passeggiate').child(passeggiateId).ref.remove();
}
eliminaPappa(){
  var pappaId=this.pappaId;
  this.caniProvider.getCaneDett(this.navParams.get('caneId')).child('/attivitaList').child('/mangiare').child(pappaId).ref.remove();
}
eliminaAcqua(){
  var bereId=this.bereId;
  this.caniProvider.getCaneDett(this.navParams.get('caneId')).child('/attivitaList').child('/bere').child(bereId).ref.remove();
}
ProfiloCane(caneId){
  
  this.navCtrl.push('profilo-cane', {'caneId': caneId })
}

}
