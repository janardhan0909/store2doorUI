import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
@Component({
  selector: 'page-placed ',
  templateUrl: 'placed.html'
})
export class PlacedPage {

  constructor(public navCtrl: NavController) {

  }
  
  homePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
