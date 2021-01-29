import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import {UserOrderDetails, LookUpItems,UserCart}from '../../pages/models/ModelObjects';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-myorder_2 ',
  templateUrl: 'myorder_2.html'
})
export class Myorder_2Page {
    account: string = "pending";
    myOrderDetails: UserOrderDetails[] = new Array();
    orderStatus: LookUpItems[] = new Array();
    itemdata: UserCart = new UserCart();

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,private toastCtrl: ToastController,public helper:Helper,public apisProvider: ApisProvider) {
      
      this.loadOrderedDetails();
    this.loadOrderSatus();
  }
  
  cartPage() {
      let modal = this.modalCtrl.create( CartPage );
      modal.present();
  }

  searchPage() {
      let modal = this.modalCtrl.create( SearchPage );
      modal.present();
  }

  loadOrderedDetails() {
      this.apisProvider.startSpinner();
      this.apisProvider.loadData( 'api/order/loadAllOrders', 'ADMIN' )
          .then( data => {
              if ( data["success"] ) {
                  this.myOrderDetails = data["data"];
                  this.helper.logMessage( "data", this.myOrderDetails );
              }else{
                  this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
              }
              this.apisProvider.stopSpinner();
          } ).catch(result =>{
              this.apisProvider.stopSpinner();
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          });
}
    statusChanged( items: any ) {
        this.apisProvider.startSpinner();
        this.apisProvider.loadData( 'api/order/changeOrderStatus', items )
            .then( data => {
                if ( data["success"] ) {
                    this.presentToast();
                    this.helper.logMessage("data",data["data"]);
                    this.myOrderDetails = data["data"];
                }else{
                    this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
                }
                this.apisProvider.stopSpinner();
                
            } ).catch(result =>{
                this.apisProvider.stopSpinner();
                this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
            });

}

    loadOrderSatus() {
        
        this.apisProvider.loadData( 'api/lookUp/getCategoryItemByName', 'OrderStatus' )
            .then( data => {
                if ( data["success"] ) {
                    this.orderStatus = data["orderStatus"];
                }else{
                    this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
                }
                
            } ).catch(result =>{
                this.apisProvider.stopSpinner();
                this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
            });
    }

    presentToast() {
        let toast = this.toastCtrl.create( {
            message: 'Order Status Changed Successfully',
            duration: 3000,
            position: 'top'
        } );

        toast.onDidDismiss(() => {
        } );

        toast.present();
  }
  orderDetails(){
  }
}
