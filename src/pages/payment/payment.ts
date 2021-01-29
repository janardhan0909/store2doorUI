import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { ApisProvider } from '../../providers/apis/apis';
import { PlacedPage } from '../placed/placed';
import { Helper } from '../../providers/helpers/helper';
import {UserCart} from '../models/ModelObjects';
import {DeliveryAddress} from '../models/ModelObjects';
import {UserOrderDetails} from'../models/ModelObjects';
@Component({
  selector: 'page-payment ',
  templateUrl: 'payment.html'
})
export class PaymentPage {
    
    totalAmountToPay: number = 0;
    orderdedDetails: UserCart[] = new Array();
    userOrderData: UserOrderDetails = new UserOrderDetails();
    deleveryAddress:any;
    paymentMethod:string="";
    isPaymentSuccess:boolean=false;
  constructor(public navCtrl: NavController,public navParms:NavParams,public helper:Helper,public apisProvider:ApisProvider) {
      this.totalAmountToPay = this.navParms.get("tatalAmount");
      this.orderdedDetails = this.navParms.get("orderDetails");
      this.deleveryAddress = this.navParms.get("develiryAddress");
  }  


  placedPage() {
      if(this.paymentMethod=='razorPay'){
          var options = {
                  description: 'Credits towards Order',
                  image: 'assets/icon/logo.jpg',
                  currency: 'INR',
                  key: 'rzp_test_FQTIPHr2bSNb46',
                  amount: this.totalAmountToPay*100,
                  name: 'MrGreen',
                  /*prefill: {
                    email: 'pranav@razorpay.com',
                    contact: '8879524924',
                    name: 'Pranav Gupta'
                   },*/
                  theme: {
                    color: '#39c526'
                  },
                  modal: {
                    ondismiss: function() {
                      alert('dismissed')
                    }
                  }
                };

                var successCallback = function(payment_id) {
                    this.saveOrder("RazorPay");
                }.bind(this);

                var cancelCallback = function(error) {
                  alert(error.description + ' (Error ' + error.code + ')');
                };

                RazorpayCheckout.open(options, successCallback, cancelCallback);
      }else{
          this.saveOrder("COD")
      }
  }
  saveOrder(paymentMethod:any){
      this.userOrderData.paymentType =paymentMethod;
      this.userOrderData.totalPrice = this.totalAmountToPay;
      this.userOrderData.orderAddressId = this.deleveryAddress.id;
      this.userOrderData.orderItemsData = this.orderdedDetails;
      this.userOrderData.orderStatus = this.helper.userOrderStatus;
      this.apisProvider.startSpinner();
      this.apisProvider.loadData('api/order/saveOrders', this.userOrderData).then(data =>{
          localStorage.removeItem("categoryId");
          localStorage.removeItem("storeId");
          localStorage.removeItem("categoryName");
          this.navCtrl.push(PlacedPage);
          this.apisProvider.stopSpinner();
      }).catch(result =>{
          this.apisProvider.stopSpinner();
          this.apisProvider.openErrorAlert("Failed!","Error while loading");
      });
  }
  onPaymentChange(payment:any){
      this.paymentMethod=payment;
  }
  
}
