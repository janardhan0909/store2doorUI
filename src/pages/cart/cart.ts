import { Component } from '@angular/core';
import {App, NavController, ViewController } from 'ionic-angular';
import { PhonenumberPage } from '../phonenumber/phonenumber';
import { ApisProvider } from '../../providers/apis/apis';
import {UserCart}from '../models/ModelObjects';
import { Helper } from '../../providers/helpers/helper';
import { ShippiningPage } from '../shippining/shippining';
@Component({
  selector: 'page-cart ',
  templateUrl: 'cart.html'
})
export class CartPage {

    userCart:UserCart[] = new Array();
    cartSize:number;
    totalVal:number;
  constructor(public appCtrl: App,public navCtrl: NavController, public viewCtrl: ViewController,public apisProvider: ApisProvider,public helper:Helper) {
  }
  ionViewCanEnter() {
    if(!this.apisProvider.authenticated())
     this.navCtrl.push(PhonenumberPage);
    this.apisProvider.startSpinner();
    this.apisProvider.loadData( 'api/userFlow/loadCart', '' ).then( data => {
        if ( data["success"] ) {
            this.userCart = data["loadCartData"];
            this.totalVal = 0;
            this.totalAmountCalculation();
            this.apisProvider.stopSpinner();
        } else {
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert( "Failed!", "Somenting Went Worng, Please Try Again..!" );
        }

    } ).catch(result =>{
        this.apisProvider.stopSpinner();
        this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
    });
  }
  dismiss() {
    this.viewCtrl.dismiss(this.userCart.length);
  }
  
  deleteItemFromCart(itemData:any){
      this.apisProvider.startSpinner();
      this.apisProvider.loadData('api/userFlow/deleteItemFromCart', itemData).then(data =>{
          if(data["success"]){
              this.apisProvider.stopSpinner();
              this.userCart = data["loadCartData"];
              this.cartSize=this.userCart.length;
              this.totalAmountCalculation();
              //location.reload();
          }else{
              this.apisProvider.stopSpinner();
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          }
          
      }).catch(result =>{
          this.apisProvider.stopSpinner();
          this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
      });
      
  }
  decreaseQuality( itemData: any ) {
      this.apisProvider.startSpinner();
      itemData.itemQuantity = itemData.itemQuantity - 1;
      this.apisProvider.loadData( 'api/userFlow/addCart', itemData ).then( data => {
          this.helper.logMessage( "cartStatus", data );
          if ( data["success"] ) {
              this.apisProvider.stopSpinner();
              this.userCart = data["cartData"];
              this.totalAmountCalculation();
          } else {
              this.apisProvider.openErrorAlert( "Failed!", "Somenting Went Worng, Please Try Again..!" );
              this.apisProvider.stopSpinner();
          }
      } ).catch(result =>{
          this.apisProvider.stopSpinner();
          this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
      });
  }
  increaseQuality(itemData:any,index:any){
      this.apisProvider.startSpinner();
      itemData.itemQuantity=itemData.itemQuantity+1;
      this.apisProvider.loadData('api/userFlow/addCart',itemData).then(data =>{
          this.helper.logMessage("cartStatus", data);
          if(data["success"]){
              this.apisProvider.stopSpinner();
              this.userCart = data["cartData"];
              this.totalAmountCalculation();
          }else{
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
              this.apisProvider.stopSpinner();
          }
      }).catch(result =>{
          this.apisProvider.stopSpinner();
          this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
      });
  }
  shippiningPage(orderedData:any) {
      this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().push(ShippiningPage,{
          'orderData':this.userCart
      });
     /* this.navCtrl.push(ShippiningPage,{
          'orderData':this.userCart
      });*/
    }
  
  totalAmountCalculation(){
      this.totalVal = 0;
      this.userCart.forEach(( val, i ) => {
          this.totalVal = this.totalVal + ( val.totalPrice * val.itemQuantity );
      } );
  }
}
