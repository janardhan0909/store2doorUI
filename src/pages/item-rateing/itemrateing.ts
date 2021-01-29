import { Component } from '@angular/core';
import { NavController, ViewController,NavParams } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Ionic2RatingModule } from 'ionic2-rating';
import { UserCart } from '../models/ModelObjects';
@Component({
  selector: 'page-itemrateing',
  templateUrl: 'itemrateing.html'
})
export class ItemRateingPage {
  rate:number;
  isAddReview:boolean;
  comments:string;
  userItemsData:UserCart = new UserCart();     
  constructor(public navParms:NavParams,public navCtrl: NavController, public viewCtrl: ViewController,public apisProvider: ApisProvider,public helper:Helper, private _fb: FormBuilder) {
    this.userItemsData.id = this.navParms.get("data");
  }
  onModelChange($event){
this.isAddReview = true;
  }
  dismiss() {
    this.viewCtrl.dismiss("notSaved");
  }
  saveReviews(){
    this.apisProvider.startSpinner();
       this.userItemsData.rating = this.rate;
       this.userItemsData.reviewComments = this.comments;
       this.helper.logMessage("data",this.userItemsData);
       this.apisProvider.loadData('api/order/saveRating' ,this.userItemsData )
        .then( data => {
            if(data["success"]){
              this.apisProvider.presentToast("Thanks For Giving The Rating");
               this.dismiss();
            }
        }).catch(result =>{
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
        this.apisProvider.stopSpinner();
  }
  

}
