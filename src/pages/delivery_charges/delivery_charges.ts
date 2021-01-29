import { Component } from '@angular/core';
import { NavController, Events, NavParams, ViewController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import {DeliveryCharges,Coupons,LookUpItems} from '../models/ModelObjects';
@Component({
  selector: 'page-delivery_charges',
  templateUrl: 'delivery_charges.html'
})
export class DeliveryChargesPage{
    activeTab: string = "charges";
  validation_messages = {
    'deliveryCharge': [
        { type: 'required', message: 'Delivery Charge is required.' },
        { type: 'maxlength', message: 'Delivery Charge cannot be more than 4 digits.' }
      ],
    'deliveryAmountLimit': [
        { type: 'required', message: 'Delivery Amount Limit is required.' },
        { type: 'maxlength', message: 'Delivery Amount Limit be more than 5 digits.' }
      ],
      'couponCode': [
         { type: 'required', message: 'Delivery Amount Limit is required.' },
         { type: 'maxlength', message: 'Delivery Amount Limit be more than 5 digits.' }
       ],
       'couponOffer': [
         { type: 'required', message: 'Delivery Amount Limit is required.' },
         { type: 'maxlength', message: 'Delivery Amount Limit be more than 5 digits.' }
       ],                     
    }
  deliveryCharges:DeliveryCharges=new DeliveryCharges();
  public onDeliveryChargesForm: FormGroup;
  public onCouponsForm: FormGroup;
  nowdate = new Date();
  disableDate = this.populateDate( this.nowdate );
  couponsList:Coupons[]=new Array();
  couponTypes: LookUpItems[] = new Array();
  constructor(public viewCtrl: ViewController,private params: NavParams,public events:Events, public navCtrl: NavController,public apisProvider: ApisProvider,public helper:Helper, private _fb: FormBuilder ) {
      this.loadDeliveryCharges();
      this.onDeliveryChargesForm = this._fb.group( {
      deliveryCharge: ['', Validators.compose( [
         Validators.maxLength(4),
         Validators.required
      ] )],
      deliveryAmountLimit: ['', Validators.compose( [
        Validators.maxLength(5),
        Validators.required
      ] )],
  } );
    this.onCouponsForm = this._fb.group( {
        couponCode: ['', Validators.compose( [
           Validators.maxLength(20),
           Validators.minLength(5),
           Validators.required
        ] )],
        expiryDate: ['', Validators.compose( [
          Validators.required
        ] )],
        couponOffer:['', Validators.compose( [
          Validators.maxLength(3),
          Validators.required
       ] )],
    } );
    this.loadCouponsTypes();
    this.loadCoupons();
  }
  addDeliveryCharge(){
    this.deliveryCharges.deliveryCharge = this.onDeliveryChargesForm.get("deliveryCharge").value;
    this.deliveryCharges.deliveryAmountLimit = this.onDeliveryChargesForm.get("deliveryAmountLimit").value;
    this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/order/saveDeliveryCharges',this.deliveryCharges)
        .then( data => {
            this.apisProvider.stopSpinner();
              if(data["success"]){
                  this.deliveryCharges=data["data"];
                  this.apisProvider.openErrorAlert("Success!","Delivery Charges Saved Successfully");
              }else{
                this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
              }
        } ).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
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
                  this.onDeliveryChargesForm.controls["deliveryCharge"].setValue(this.deliveryCharges.deliveryCharge);
                  this.onDeliveryChargesForm.controls["deliveryAmountLimit"].setValue(this.deliveryCharges.deliveryAmountLimit);
              }
            }else{
              this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
            }
      } ).catch(result =>{
          this.apisProvider.stopSpinner();
          this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
      });
  }
  populateDate( date: Date ) {
      return date.getFullYear() + '-' + ( '0' + ( date.getMonth() + 1 ) ).slice( -2 ) + '-' + ( '0' + date.getDate() ).slice( -2 );
  }
  saveCoupons(){
     this.apisProvider.startSpinner();
     this.apisProvider.loadData('api/stores/saveCoupons',this.couponsList)
         .then( data => {
             this.apisProvider.stopSpinner();
               if(data["success"]){
                   this.couponsList=data["couponsList"];
                   this.populateCoupns();
                   this.apisProvider.openErrorAlert("Success!","Coupons Saved Successfully");
               }else{
                 this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
               }
         } ).catch(result =>{
             this.apisProvider.stopSpinner();
             this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
         });
  }
  addCoupon(){
      let coupon:Coupons=new Coupons();
      this.couponsList[this.couponsList.length] = coupon;
  }
  loadCouponsTypes() {
      this.apisProvider.loadData( 'api/lookUp/getCategoryItemByName', 'couponsTypes' )
          .then( data => {
              if ( data["success"] ) {
                  this.couponTypes = data["orderStatus"];
              }else{
                  this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
              }
              
          } ).catch(result =>{
              this.apisProvider.stopSpinner();
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          });
      }
  loadCoupons() {
      this.apisProvider.loadData( 'api/stores/loadCoupons', '' )
          .then( data => {
              if ( data["success"] ) {
                  this.couponsList = data["couponsList"];
                  if(this.couponsList.length==0){
                      let coupon1:Coupons=new Coupons();
                      this.couponsList[this.couponsList.length] = coupon1;
                  }else
                      this.populateCoupns();
              }else{
                  this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
              }
              
          } ).catch(result =>{
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          });
      }
  populateCoupns() {
      for ( let i = 0; i < this.couponsList.length; i++ ) {
          this.couponsList[i].expiryDate = this.couponsList[i].expiryDate.split( "T" )[0];
      }
  }
  removecoupon( index: any ) {
      this.couponsList.splice( index, 1 );
  }
}
