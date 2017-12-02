import { Injectable } from '@angular/core';
import firebase from 'firebase';


/*
  Generated class for the CaniProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CaniProvider {
  public userProfileRef:firebase.database.Reference;
  public userProfileRefDog:firebase.database.Reference;
  captureDataUrl:string;
  caneId:string;
  bisognoId:string;
  data
  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfileRef = firebase.database()
        .ref(`userProfile/${user.uid}`);
      
      }
      
    });
   
 
  
   

  }
  createCane(caneName:string, caneRazza:string, caneGenere:string, caneDate:string, caneChip:string, canePeso:string, caneAltezza:string,captureDataUrl:string,ciotoleAcqua:string, ciotolePappa:string): firebase.Promise <any>{
      return this.userProfileRef.child('/caniList').push({
      name: caneName,
      razza: caneRazza,
      genere: caneGenere,
      date: caneDate,
      chip: caneChip,
      peso: canePeso,
      altezza: caneAltezza,
      foto: captureDataUrl,
   
    }).child('impostazioni').set({
      Acqua:ciotoleAcqua='4',
      Pappa:ciotolePappa='2',
    })
    ;
   
   
 
  }


getCaniList(): firebase.database.Reference {
  return this.userProfileRef.child('/caniList');
}
getCaneDett(caneId:string):firebase.database.Reference{
  return this.userProfileRef.child('/caniList').child(caneId);
}
 addAttivita(attivitaData:string, caneId:string, attivitaTipo:string, attivitaOra:string): firebase.Promise<any> {
    return this.userProfileRef.child('/caniList').child(caneId)
    .child('/attivitaList').child('bisogni').push({
      data: attivitaData,
      tipo: attivitaTipo,
      ora: attivitaOra
    });
 }
 addBere(caneId:string, bereData):firebase.Promise<any>{
  return this.userProfileRef.child('/caniList').child(caneId)
  .child('/attivitaList').child('bere').push({
    data: bereData,
   
  });


 }
 salvaImpo(caneId:string, acquashow:boolean, pappashow:boolean, bisognishow:boolean, passeggiatashow:boolean):firebase.Promise<any> {
  return this.userProfileRef.child('/caniList').child(caneId).child('/impo')
  .set({
acqua:acquashow,
pappa:pappashow,
bisogni:bisognishow,
passeggiata: passeggiatashow
  });
}
 addMangiare(caneId:string, mangiareData):firebase.Promise<any>{
  return this.userProfileRef.child('/caniList').child(caneId)
  .child('/attivitaList').child('mangiare').push({
    data: mangiareData,
   
  });

 }
 addPasseggiata(passeggiataData:string,caneId:string, passeggiataOra:string, passeggiataDurata:string, ): firebase.Promise<any> {
  return this.userProfileRef.child('/caniList').child(caneId)
  .child('/attivitaList').child('passeggiate').push({
    data: passeggiataData,
    ora: passeggiataOra,
    durata: passeggiataDurata,
  });
}
 addCiotole(caneId:string, ciotoleAcqua:string, ciotolePappa:string): firebase.Promise<any> {
  return this.userProfileRef.child('/caniList').child(caneId).child('impostazioni')
  .set({
Acqua:ciotoleAcqua,
 Pappa:ciotolePappa,
  });

 }
getBereList(caneId:string):firebase.database.Reference{
  return this.userProfileRef.child('/caniList').child(caneId).child('/attivitaList').child('/bere');
 }
 getPappaList(caneId:string):firebase.database.Reference{
  return this.userProfileRef.child('/caniList').child(caneId).child('/attivitaList').child('/mangiare');
 }
 
 getattivitaList(caneId:string):firebase.database.Reference{
 return this.userProfileRef.child('/caniList').child(caneId).child('/attivitaList').child('/bisogni');
}
getPasseggiataList(caneId:string):firebase.database.Reference{
  return this.userProfileRef.child('/caniList').child(caneId).child('/attivitaList').child('/passeggiate');
 }
 goBisognoDett(bisognoId:string):firebase.database.Reference{
   var caneId=caneId;
  return this.userProfileRef.child('/caniList').child(caneId).child('/attivitaList').child('/bisogni').child(bisognoId);
}
getImpostazioni(caneId:string):firebase.database.Reference{
  return this.userProfileRef.child('/caniList').child(caneId).child('impostazioni');
}
getImpo(caneId:string):firebase.database.Reference{
  return this.userProfileRef.child('/caniList').child(caneId).child('/impo');
}
//ci dovrebbe essere una funzione che crea una lista di attività del cane
}

