import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Keyboard } from '@ionic-native/keyboard';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html',
  providers:[Keyboard]
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, private keyboard: Keyboard) {
    
    firebase.initializeApp({
     apiKey: "AIzaSyCz4jLjQhHHkX9KiWhQPZ9nSow8vtbIUrk",
      authDomain: "ionicsocialprova.firebaseapp.com",
      databaseURL: "https://ionicsocialprova.firebaseio.com",
      projectId: "ionicsocialprova",
      storageBucket: "ionicsocialprova.appspot.com",
      messagingSenderId: "304722777533"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = 'login';
        unsubscribe();
      } else { 
        this.rootPage = HomePage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    
    });
  }
}