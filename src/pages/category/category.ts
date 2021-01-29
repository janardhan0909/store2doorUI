import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { VegetablePage } from '../vegetable/vegetable';
import { PhonenumberPage } from '../phonenumber/phonenumber';
import { ApisProvider } from '../../providers/apis/apis';

@Component({ 
  selector: 'page-category ',
  templateUrl: 'category.html'
})
export class CategoryPage {
 products: string = "vegetables";
  constructor(public navCtrl: NavController,public apisProvider: ApisProvider) {

  }
  ionViewCanEnter() {
    if(!this.apisProvider.authenticated())
     this.navCtrl.push(PhonenumberPage);
  }
  
  vegetablePage(){
    this.navCtrl.push(VegetablePage);
    }

}
