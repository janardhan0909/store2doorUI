import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { PhonenumberPage } from '../phonenumber/phonenumber';
import { ApisProvider } from '../../providers/apis/apis';
import {UserCart,ZipCode}from '../models/ModelObjects';
import { Helper } from '../../providers/helpers/helper';
import { ShippiningPage } from '../shippining/shippining';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
@Component({
  selector: 'page-address',
  templateUrl: 'address.html'
})
export class AddressPage {
    zipCode:ZipCode=new ZipCode();
    isInvalidPincode:boolean=false;
        public onAddressForm: FormGroup;
        validation_messages = {
            'name': [
                { type: 'required', message: 'This is field required.' },
              ],
              'phoneNumber': [
                               { type: 'required', message: 'Phone Number is required.' },
                               { type: 'pattern', message: 'Please enter valid mobile number' },
                             ],
                'pin': [
                        { type: 'required', message: 'Pincode is required.' },
                        { type: 'pattern', message: 'Please enter valid pincode' }
                      ]
            }
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public apisProvider: ApisProvider,public helper:Helper, private _fb: FormBuilder) {
    this.onAddressForm = this._fb.group( {
        name: ['', Validators.compose( [
          Validators.required
        ] )],
        address: ['', Validators.compose( [
          Validators.required
        ] )],
        streetAddress: ['', Validators.compose( [
          Validators.required
        ] )],
        pin:['',Validators.compose( [
          Validators.required,
          Validators.pattern('^[0-9]{6}$'),
          ])],

          city:['',Validators.compose( [
          Validators.required])],

          state:['',Validators.compose( [
          Validators.required])],

          contNo:['',Validators.compose( [
            Validators.required,
            Validators.pattern('^(\\+91[\\-\\s]?)?[0]?(91)?[6789]\\d{9}$'),
            ])],
          landMark: ['', Validators.compose( [
             Validators.required
           ])],
    } );
    this.onAddressForm.get('contNo').setValue("+91");
  }
  saveAddress(){
    this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/order/addNewAddress' ,this.onAddressForm.value)
        .then( data => {
            this.onAddressForm.reset;
            if ( data["success"] ) {
                this.viewCtrl.dismiss("saved");
            } else {
                this.apisProvider.openErrorAlert("Error", "Something went wrong please try again!");
                this.viewCtrl.dismiss("notSaved");
            }
            this.apisProvider.stopSpinner();
        } ).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
  }
  dismiss() {
    this.viewCtrl.dismiss("notSaved");
  }
  onPincodeChange(){
      let pincode=this.onAddressForm.get("pin").value;
      this.onAddressForm.get( 'city' ).setValue('');
      this.onAddressForm.get( 'state' ).setValue('');
      if(pincode.length==6){
          this.apisProvider.startSpinner();
          this.apisProvider.loadData('api/order/getAddressByPin' ,pincode)
          .then( data => {
              this.apisProvider.stopSpinner();
              if ( data["success"] ) {
                  if(!this.helper.isEmpty(data["data"])){
                      this.isInvalidPincode=false;
                      this.zipCode=data["data"];
                      this.onAddressForm.get( 'city' ).setValue(this.zipCode.city);
                      this.onAddressForm.get( 'state' ).setValue(this.zipCode.state);
                  }else{
                      this.isInvalidPincode=true;
                  }
              }
          } ).catch(result =>{
              this.apisProvider.stopSpinner();
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          });
      }
  }
}
