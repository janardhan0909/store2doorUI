import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VerificationPage } from '../verification/verification';

@Component({
  selector: 'page-password ',
  templateUrl: 'password.html'
})
export class PasswordPage {

  constructor(public navCtrl: NavController) {

  }
  verificationPage(){
    this.navCtrl.push(VerificationPage);
    }

}
