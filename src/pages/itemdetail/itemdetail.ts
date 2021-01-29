import { Component } from '@angular/core';
import { NavController, ModalController,NavParams } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { ShippiningPage } from '../shippining/shippining';
import { CategoryItems } from '../models/ModelObjects';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import{UserCart} from '../models/ModelObjects';
import { ToastController } from 'ionic-angular';
import {ShowItemsPage} from '../show-items/show-items';
import { PhonenumberPage } from '../phonenumber/phonenumber';
@Component({
  selector: 'page-itemdetail ',
  templateUrl: 'itemdetail.html'
})
export class ItemdetailPage {

    itemDetails: CategoryItems = new CategoryItems();
    userCartList: UserCart[] = new Array();
    cartSize: number;
    addCartData:  UserCart = new  UserCart();
    itemName:string;
    totalVal:number;
    actualQuantity:any;
    avgRating:number=0;
    isShowReviews:boolean=false;
    cartData:any
  constructor(public navCtrl: NavController, public helper:Helper,private toastCtrl: ToastController,public modalCtrl: ModalController,public navParms:NavParams,public apisProvider: ApisProvider) {
      this.itemDetails = this.navParms.get("item");
      this.itemName = this.itemDetails.itemName;
      this.actualQuantity=this.itemDetails.itemQuantity;
      this.totalAmountCalculation();
      let i=0;
      if(!this.helper.isEmpty(this.itemDetails["itemRatingDto"])){
          for(i=0;i<this.itemDetails["itemRatingDto"].length;i++){
              this.avgRating+=this.itemDetails["itemRatingDto"][i]["rating"];
          }
          this.avgRating=this.avgRating/i;
      }
       if(this.apisProvider.authenticated()){
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
  }
 /* ionViewCanEnter() {
  }*/
 /* searchPage() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }
  */
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
        this.apisProvider.startSpinner();
        this.itemDetails.itemQuantity = itemData -this.actualQuantity;
        this.totalAmountCalculation();
        this.apisProvider.stopSpinner();
    }
    increaseQuality(itemData:any){
        this.apisProvider.startSpinner();
        this.itemDetails.itemQuantity=itemData +this.actualQuantity;
        this.totalAmountCalculation();
        this.apisProvider.stopSpinner();
    }
    
    addToCart(){
        if(!this.apisProvider.authenticated()){
            this.navCtrl.push(PhonenumberPage,{
                'isSkipLogin':true
            });
            let cartData={
                    "itemId":this.itemDetails.id,
                    "itemPrice":this.itemDetails.itemPrice,
                    "itemQuantity":this.itemDetails.itemQuantity,
                    "storeId":this.itemDetails.storeId
                }
                localStorage.setItem("cartData", JSON.stringify(cartData));
        }
        else{
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
      totalAmountCalculation(){
        this.totalVal = 0;
        this.totalVal = this.totalVal + ( this.itemDetails.itemPrice * this.itemDetails.itemQuantity );
    }

    buyNow(itemData:any,index:any){
        if(!this.apisProvider.authenticated()){
            this.navCtrl.push(PhonenumberPage,{
                'isSkipLogin':true
            });
            
            let buyNowData={
                    "itemId":this.itemDetails.id,
                    "itemPrice": this.itemDetails.itemPrice,
                    "itemQuantity":this.itemDetails.itemQuantity,
                    "storeId":this.itemDetails.storeId
                }
                localStorage.setItem("buyNowData", JSON.stringify(buyNowData));
        }
        else{
            this.addCartData.itemId = this.itemDetails.id;
            this.addCartData.storeId = this.itemDetails.storeId;
            this.addCartData.totalPrice = this.itemDetails.itemPrice;
            this.addCartData.itemQuantity = this.itemDetails.itemQuantity;
            this.buyNow1();
        }
    }
    buyNow1(){
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/userFlow/addCart', this.addCartData).then(data =>{
            this.helper.logMessage("cartStatus", data);
            if(data["success"]){
                this.apisProvider.stopSpinner();
                this.userCartList = data["cartData"];
                this.cartSize = this.userCartList.length;
                localStorage.removeItem("buyNowData");
                this.navCtrl.push(ShippiningPage,{
                  'orderData':this.userCartList
               });
            }else{
                this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
            }
        }).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
     });
    }
    showReviews(){
        this.isShowReviews=!this.isShowReviews;
    }
}
