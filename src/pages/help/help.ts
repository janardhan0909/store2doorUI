import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-help ',
  templateUrl: 'help.html'
})
export class HelpPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

     cartPage() {
    let modal = this.modalCtrl.create(CartPage);
    modal.present();
  }
  
     searchPage() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }


}
