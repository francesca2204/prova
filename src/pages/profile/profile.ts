import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile:any;
  public birthDate:string;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public profileProvider: ProfileProvider, public authProvider: AuthProvider,
    ) {
  }
 ionViewDidEnter(){
   this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
     this.userProfile = userProfileSnapshot.val();
     this.birthDate = userProfileSnapshot.val().birthDate;
     
   });
 }
 logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('login');
    });
  }

  updateName(){
    const alert = this.alertCtrl.create({
      message: "Il tuo nome e cognome",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Nome',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Cognome',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Annulla',
        },
        {
          text: 'Salva',
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate){
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Nuova Email',
        },
        {
          name: 'password',
          placeholder: 'La tua password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Annulla',
        },
        {
          text: 'Salva',
          handler: data => {
            let newEmail = data.newEmail;

            this.profileProvider.updateEmail(data.newEmail, data.password).then( () =>{
              this.userProfile.email = newEmail;
            }).catch(error => {
              console.log('ERROR: '+error.message);
            });
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Nuova Password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Vecchia Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Annulla',
        },
        {
          text: 'Salva',
          handler: data => {
            this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }
  eliminaAccount() { 
    let alert = this.alertCtrl.create({
    title: 'Eliminazione Account',
    message: 'Sei sicuro di volere eliminare il tuo Account? ',
    buttons:[
      {
        text:'Annulla',
      },
      {
        text: 'Elimina',
        handler:()=>{
          this.profileProvider.getUserProfile().ref.remove().then(() => {
            this.navCtrl.setRoot('login');
          });
          
        }
      }
    ]
    });
  
  alert.present();
  
  
  }
}
