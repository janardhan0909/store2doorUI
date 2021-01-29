import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import {UserOrderDetails}from '../../pages/models/ModelObjects';
import { ItemRateingPage } from '../../pages/item-rateing/itemrateing';
import { Ionic2RatingModule } from 'ionic2-rating';
@Component({
  selector: 'page-myorder_1 ',
  templateUrl: 'myorder_1.html'
})
export class Myorder_1Page {

 account: string = "profile";
 myOrderDetails:UserOrderDetails[] = new Array();
packed:string;
shipped:string;
delivery:string;
 myOrderHistoryDetails:UserOrderDetails[] = new Array();
 myOrderHistoryDetailsForDisplay:UserOrderDetails[] = new Array();
 public pagingEnabled: boolean = true;
 page = 2;
 maximumPages = 5;
 defaultCardOnLoad = 2;
 onload = true;
 counter=0;
 rate:number;
 isAddReview:boolean = false;
 estimatedDeliveryDate:any;
 constructor(public navCtrl: NavController, public modalCtrl: ModalController,public helper:Helper,public apisProvider: ApisProvider) {
     this.loadOrderedDetails();
     this.loadOrderedHistoryDetails();
     this.estimatedDeliveryDate = new Date();
     this.estimatedDeliveryDate.setHours(this.estimatedDeliveryDate.getHours() + 1);
  }
  
  searchPage() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }
  
    cartPage() {
    let modal = this.modalCtrl.create(CartPage);
    modal.present();
  }
    
    loadOrderedDetails(){
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/loadOrderedDetails' ,'' )
        .then( data => {
            this.apisProvider.stopSpinner();
            if(data["success"]){
                this.myOrderDetails = data["data"];
                this.helper.logMessage("data", this.myOrderDetails);
            }
        }).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
    }
    
    cancelOrder(ordersItems:any){
        this.apisProvider.startSpinner();
        this.helper.logMessage("cancle",ordersItems);
        this.apisProvider.loadData('api/order/cancelOrder' ,ordersItems )
        .then( data => {
            if(data["success"]){
                this.apisProvider.stopSpinner();
                 this.loadOrderedDetails();
                this.myOrderHistoryDetailsForDisplay = data["data"];
                this.apisProvider.presentToast("Item Cancelled Successfully...");
                this.helper.logMessage("data",this.myOrderHistoryDetailsForDisplay);
            }else{
                this.apisProvider.stopSpinner();
            }
        }).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
    }

    // loadOrderedHistoryDetails(infiniteScroll?){
    //     if(this.onload){

    //         this.apisProvider.loadData('api/order/loadOrderedHistoryDetails' ,'' )
    //     .then( data => {
    //         if(data["success"]){
               
    //             this.myOrderHistoryDetails = data["data"];
    //             this.helper.logMessage("data history : ", this.myOrderHistoryDetails);
    //             this.maximumPages = this.myOrderHistoryDetails.length;
    //             if(this.myOrderHistoryDetails.length>0){
    //                 while(this.counter<this.page){
    //                     //infiniteScroll.enable( false );
    //                     this.myOrderHistoryDetailsForDisplay.push(this.myOrderHistoryDetails.pop());
    //                     this.counter++;
    //                 }
    //             }
    //             this.helper.logMessage("data history : ", this.myOrderHistoryDetailsForDisplay);
               
    //             this.onload=false;
    //         }
          
            
           
    //     });
    //     }
    //     else{
           
    //         this.helper.logMessage("history Display:",this.myOrderHistoryDetailsForDisplay);
    //         this.helper.logMessage("data history : ", this.myOrderHistoryDetails);
    //         while(this.counter<this.page){
    //             infiniteScroll.enable( false );
    //             if(this.myOrderHistoryDetails.length!=0){
    //                 this.myOrderHistoryDetailsForDisplay.push(this.myOrderHistoryDetails.pop());
    //             }
                
    //             this.counter++;
    //         }
    //     }
        
        
    // }

    // doInfinite( infiniteScroll ) {
    //     setTimeout(() => {
    //         this.page++;
    //         this.loadOrderedHistoryDetails( infiniteScroll );

    //         if ( this.page === this.maximumPages ) {
    //             infiniteScroll.enable( false );
    //         }
    //         infiniteScroll.complete();
    //     }, 500 );
    // }

    loadOrderedHistoryDetails(){
        this.apisProvider.loadData('api/order/loadOrderedHistoryDetails' ,'' )
            .then( data => {
             if(data["success"]){
                this.myOrderHistoryDetailsForDisplay = data["data"];
             }
            }).catch(result =>{
                this.apisProvider.stopSpinner();
                this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
            });
    }
    doRefresh( refresher ) {
       this.loadOrderedDetails();
       this.loadOrderedHistoryDetails();
        refresher.complete();
        
        
    }
    reating(ordersItems:any){
        this.helper.logMessage("data",ordersItems.id);
        let modal = this.modalCtrl.create(ItemRateingPage,{
            'data':ordersItems.id
        });
        modal.onDidDismiss(data => {
            this.loadOrderedDetails();
            this.loadOrderedHistoryDetails();
        });
        modal.present();
    }
}
