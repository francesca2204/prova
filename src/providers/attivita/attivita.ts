import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AttivitaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AttivitaProvider {
public userProfileRef:firebase.database.Reference;
  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfileRef = firebase.database()
        .ref(`userProfile/${user.uid}/caniList/caneId`);
      }
    })
  }

}
