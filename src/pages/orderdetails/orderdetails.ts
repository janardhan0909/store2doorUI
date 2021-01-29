import { Component } from '@angular/core';
import { NavController, ModalController,NavParams } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { ShippiningPage } from '../shippining/shippining';
import { CategoryItems } from '../models/ModelObjects';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import{UserCart} from '../models/ModelObjects';
import { ToastController } from 'ionic-angular';
import {ShowItemsPage} from '../show-items/show-items';
@Component({
  selector: 'page-orderdetails ',
  templateUrl: 'orderdetails.html'
})
export class OrderdetailsPage {

    itemDetails: CategoryItems = new CategoryItems();
    userCartList: UserCart[] = new Array();
    cartSize: number;
    addCartData:  UserCart = new  UserCart();
itemName:string;
  constructor(public navCtrl: NavController, public helper:Helper,private toastCtrl: ToastController,public modalCtrl: ModalController,public navParms:NavParams,public apisProvider: ApisProvider) {
  }
  ionViewCanEnter() {
      this.itemDetails = this.navParms.get("item");
      this.itemName = this.itemDetails.itemName;
      this.apisProvider.loadData('api/userFlow/loadCart', '').then(data =>{
          if ( data["success"] ) {
              this.userCartList = data["loadCartData"];
              this.cartSize = this.userCartList.length;
          }else{
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          }
          
      }).catch(result =>{
          this.apisProvider.stopSpinner();
          this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
      });
  }
  searchPage() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }
  
   shippiningPage() {
    this.navCtrl.push(ShippiningPage);
  }
  
    cartPage() {
    let modal = this.modalCtrl.create(CartPage);
    modal.onDidDismiss(data => {
        this.cartSize=data;
      });
    modal.present();
  }
    
    decreaseQuality( itemData: any ) {
        this.itemDetails.itemQuantity = itemData - 1;
    }
    increaseQuality(itemData:any){
        this.itemDetails.itemQuantity=itemData + 1;
    }
    
    addToCart(){
        this.addCartData.itemId = this.itemDetails.id;
        this.addCartData.storeId = this.itemDetails.storeId;
        this.addCartData.totalPrice = this.itemDetails.itemPrice;
        this.addCartData.itemQuantity = this.itemDetails.itemQuantity;
        this.apisProvider.startSpinner();
       
          this.apisProvider.loadData('api/userFlow/addCart', this.addCartData).then(data =>{
              this.helper.logMessage("cartStatus", data);
              if(data["success"]){
                  this.apisProvider.stopSpinner();
                  this.presentToast();
                  this.userCartList = data["cartData"];
                  this.cartSize = this.userCartList.length;
                  this.navCtrl.push(ShowItemsPage);
                  
              }else{
                  this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
                  this.apisProvider.stopSpinner();
              }
          }).catch(result =>{
              this.apisProvider.stopSpinner();
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          });
          
          
      }
    
    presentToast() {
        let toast = this.toastCtrl.create({
          message: 'Item added successfully',
          duration: 3000,
          position: 'top'
        });

        toast.onDidDismiss(() => {
        });

        toast.present();
      }
}
