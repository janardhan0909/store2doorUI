import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
@Component({
  selector: 'page-createaccount',
  templateUrl: 'createaccount.html'
})
export class CreateaccountPage {

  constructor(public navCtrl: NavController) {

  }
  
  homePage(){
    this.navCtrl.push(HomePage);
    }

}
