import { Component } from '@angular/core';
import { NavController,NavParams,AlertController,ModalController } from 'ionic-angular';
import { Helper } from '../../providers/helpers/helper';
import { ApisProvider } from '../../providers/apis/apis';
import { PaymentPage } from '../payment/payment';
import {UserCart} from '../models/ModelObjects';
import {DeliveryAddress,DeliveryCharges,Coupons,UserOrderDetails} from '../models/ModelObjects';
import { AddressPage } from '../address/address';

@Component({
  selector: 'page-shippining ',
  templateUrl: 'shippining.html'
})
export class ShippiningPage {

    orderdedDetails:UserCart[] = new Array();
    totalVal:number;
    deviveryAddress:DeliveryAddress = new DeliveryAddress();
    addressList:DeliveryAddress[] = new Array();
    selectedAddress:any;
    deliveryCharges:DeliveryCharges=new DeliveryCharges();
    estimatedDeliveryDate:any;
    couponsList:Coupons[]=new Array();
    couponCode:string="";
    couponDicount:number=0;
    myOrderDetails:UserOrderDetails[] = new Array();
    myOrderHistoryDetailsForDisplay:UserOrderDetails[] = new Array();
    isValidCoupon:boolean=false;
    isInvalidCoupon:boolean=false;
    isNotFirstOrder:boolean=false;
    isDateExpired:boolean=false;
    addCartData:  UserCart = new  UserCart();
    cartData:any
  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public navParms:NavParams,public helper:Helper,public apisProvider: ApisProvider,public popup:AlertController) {
      if(!this.helper.isEmpty(localStorage.getItem("buyNowData"))){
          this.cartData=JSON.parse(localStorage.getItem("buyNowData"));
          this.addCartData.itemId = this.cartData["itemId"];;
          this.addCartData.storeId = this.cartData["storeId"];
          this.addCartData.totalPrice = this.cartData["itemPrice"];
          this.addCartData.itemQuantity = this.cartData["itemQuantity"];
          this.buyNow1();
       }else{
           this.orderdedDetails = [];
           this.orderdedDetails = this.navParms.get("orderData");
       }
      this.totalAmountCalculation();
      this.loadAllAddress();
      this.loadDeliveryCharges();
      this.estimatedDeliveryDate = new Date();
      this.estimatedDeliveryDate.setHours(this.estimatedDeliveryDate.getHours() + 1);
      this.loadCoupons();
      this.loadOrderedDetails();
      this.loadOrderedHistoryDetails();
  }
  paymentPage() {
      if(this.totalVal<this.deliveryCharges.deliveryAmountLimit)
              this.totalVal=this.totalVal+this.deliveryCharges.deliveryCharge;
          this.totalVal=this.totalVal-this.couponDicount;
          this.navCtrl.push( PaymentPage, {
              "tatalAmount": this.totalVal,
              "develiryAddress": this.addressList[this.selectedAddress],
              "orderDetails": this.orderdedDetails
          } );
  }
     totalAmountCalculation(){
         this.totalVal = 0;
         this.orderdedDetails.forEach(( val, i ) => {
             this.totalVal = this.totalVal + ( val.totalPrice * val.itemQuantity );
         } );
     }
     
     decreaseQuality( itemData: any ) {
         this.apisProvider.startSpinner();
         itemData.itemQuantity = itemData.itemQuantity - 1;
         this.apisProvider.loadData( 'api/userFlow/addCart', itemData ).then( data => {
             this.helper.logMessage( "cartStatus", data );
             if ( data["success"] ) {
                 this.apisProvider.stopSpinner();
                 this.orderdedDetails = data["cartData"];
                 this.totalAmountCalculation();
                 this.applyCoupon();
             } else {
                 this.apisProvider.openErrorAlert( "Failed!", "Somenting Went Worng, Please Try Again..!" );
                 this.apisProvider.stopSpinner();
             }
         } ).catch(result =>{
             this.apisProvider.stopSpinner();
             this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
         });
     }
     increaseQuality( itemData: any, index: any ) {
         this.apisProvider.startSpinner();
         itemData.itemQuantity = itemData.itemQuantity + 1;
         this.apisProvider.loadData( 'api/userFlow/addCart', itemData ).then( data => {
             this.helper.logMessage( "cartStatus", data );
             if ( data["success"] ) {
                 this.apisProvider.stopSpinner();
                 this.orderdedDetails = data["cartData"];
                 this.totalAmountCalculation();
                 this.applyCoupon();
             } else {
                 this.apisProvider.openErrorAlert( "Failed!", "Somenting Went Worng, Please Try Again..!" );
                 this.apisProvider.stopSpinner();
             }
         } ).catch(result =>{
             this.apisProvider.stopSpinner();
             this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
         });
     }
     
     addressPopup() {
         let modal = this.modalCtrl.create(AddressPage);
         modal.onDidDismiss(data => {
             if(data=="saved"){
                 this.loadAllAddress();
             }
         });
         modal.present();
         }
     
     removeItem(itemData:any){
         this.apisProvider.startSpinner();
         this.apisProvider.loadData('api/userFlow/deleteItemFromCart', itemData).then(data =>{
             if(data["success"]){
                 this.apisProvider.stopSpinner();
                 this.orderdedDetails = data["loadCartData"];
                 this.totalAmountCalculation();
             }else{
                 this.apisProvider.stopSpinner();
                 this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
             }
             
         }).catch(result =>{
             this.apisProvider.stopSpinner();
             this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
         });
         
     }
     
     loadAllAddress(){
         this.apisProvider.loadData('api/order/loadAddress' ,'' )
         .then( data => {
             this.addressList = data["address"];
             if(this.addressList.length == 0){
                 this.addressPopup();
             }
         });
         
     }
     loadDeliveryCharges(){
         this.apisProvider.startSpinner();
         this.apisProvider.loadData('api/order/getDeliveryCharges')
         .then( data => {
             this.apisProvider.stopSpinner();
               if(data["success"]){
                 if(!this.helper.isEmpty(data.data)){
                     this.deliveryCharges=data.data;
                 }
               }
         } ).catch(result =>{
             this.apisProvider.stopSpinner();
             this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
         });
     }
     loadCoupons() {
         this.apisProvider.loadData( 'api/stores/loadCoupons', '' )
             .then( data => {
                 if ( data["success"] ) {
                     this.couponsList = data["couponsList"];
                 }else{
                     this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
                 }
                 
             } ).catch(result =>{
                 this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
             });
         }
     applyCoupon(){
         for(let i=0;i<this.couponsList.length;i++){
             if(this.couponsList[i].couponCode==this.couponCode){
                 let today = new Date();
                 today.setHours(0, 0, 0, 0);
                 let expiryDate=new Date(this.couponsList[i].expiryDate.split("T")[0]);
                 expiryDate.setHours(0, 0, 0, 0);
                 if(expiryDate>=today){
                     if(this.couponsList[i].couponType==this.helper.userFirstOrder){
                         if(this.myOrderDetails.length===0 && this.myOrderHistoryDetailsForDisplay.length===0){
                             this.isValidCoupon=true;
                             this.isInvalidCoupon=false;
                             this.isDateExpired=false;
                             this.isNotFirstOrder=false;
                             this.couponDicount=(this.couponsList[i].couponOffer*this.totalVal)/100;
                             if(this.couponDicount>this.couponsList[i].maximumLimit)
                                 this.couponDicount=this.couponsList[i].maximumLimit
                         }else{
                             this.isDateExpired=false;
                             this.isNotFirstOrder=true;
                             this.isInvalidCoupon=false;
                             this.isValidCoupon=false;
                         }
                     }else{
                         this.isValidCoupon=true;
                         this.isInvalidCoupon=false;
                         this.isDateExpired=false;
                         this.isNotFirstOrder=false;
                         this.couponDicount=(this.couponsList[i].couponOffer*this.totalVal)/100;
                         if(this.couponDicount>this.couponsList[i].maximumLimit)
                             this.couponDicount=this.couponsList[i].maximumLimit
                     }
                 }else{
                     this.isDateExpired=true;
                     this.isValidCoupon=false;
                     this.isInvalidCoupon=false;
                     this.isNotFirstOrder=false;
                 }
                 break;
              }else{
                 this.isInvalidCoupon=true;
                 this.isValidCoupon=false;
                 this.isDateExpired=false;
                 this.isNotFirstOrder=false;
                 this.couponDicount=0;
              }
         }
     }
     loadOrderedDetails() {
         this.apisProvider.loadData( 'api/order/loadOrderedDetails', '' )
             .then( data => {
                 if ( data["success"] ) {
                     this.myOrderDetails = data["data"];
                 }
             } ).catch( result => {
                 this.apisProvider.openErrorAlert( "Failed!", "Somenting Went Worng, Please Try Again..!" );
             } );
     }
     loadOrderedHistoryDetails() {
         this.apisProvider.loadData( 'api/order/loadOrderedHistoryDetails', '' )
             .then( data => {
                 if ( data["success"] ) {
                     this.myOrderHistoryDetailsForDisplay = data["data"];
                 }
             } ).catch( result => {
                 this.apisProvider.openErrorAlert( "Failed!", "Somenting Went Worng, Please Try Again..!" );
             } );
     }
     populateDate( date: Date ) {
         return date.getFullYear() + '-' + ( '0' + ( date.getMonth() + 1 ) ).slice( -2 ) + '-' + ( '0' + date.getDate() ).slice( -2 );
     }
     buyNow1(){
         this.apisProvider.loadData('api/userFlow/addCart', this.addCartData).then(data =>{
             this.helper.logMessage("cartStatus", data);
             if(data["success"]){
                 this.orderdedDetails = data["cartData"];
                 localStorage.removeItem("buyNowData");
             }else{
                 this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
             }
         }).catch(result =>{
             this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
      });
     }
}
