import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import {SignUpRequest} from '../models/ModelObjects';
import {DeliveryAddress} from '../models/ModelObjects';
@Component({
  selector: 'page-my_account ',
  templateUrl: 'my_account.html'
})
export class My_accountPage {
   account: string = "profile";
   currentUser:SignUpRequest = new SignUpRequest();
    updateUser:SignUpRequest = new SignUpRequest();
    addressList:DeliveryAddress[] = new Array();
  constructor(public navCtrl: NavController,public apisProvider: ApisProvider,public helper:Helper,public alertCtrl: AlertController,public navParms:NavParams) {
      this.account = this.navParms.get("activeTab");
      this.populateMenu();
      this.loadAllAddress();

  }

  populateMenu(){
      this.apisProvider.getCurrentUser().then(data =>{
        this.currentUser = data;
      });
    }
  
  loadAllAddress(){
      this.apisProvider.loadData('api/order/loadAddress' ,'' )
      .then( data => {
          this.addressList = data["address"];
          if(this.addressList.length == 0){
              //this.addressPopup();
          }
      }).catch(result =>{
          this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
      });
  }
  changePassword() {
      let forgot = this.alertCtrl.create( {
          title: 'Change Password?',
          message: "Please enter old password and new password.",
          inputs: [
              {
                  name: 'password',
                  placeholder: 'Old Password',
                  type: 'password'
              },
              {
                  name: 'newPassword',
                  placeholder: 'New Password',
                  type: 'password'
              },
              {
                  name: 'confirmPassword',
                  placeholder: 'Confirm Password',
                  type: 'password'
              },
          ],
          buttons: [
              {
                  text: 'Cancel',
                  handler: data => {
                  }
              },
              {
                  text: 'Send',
                  handler: data => {
                      if(this.isValidPassword(data.password) && (this.isValidPassword(data.newPassword) && this.isValidPassword(data.confirmPassword))){
                          if ( this.isValidPasswords( data.newPassword,data.confirmPassword) ) {
                              this.updateUser.id=this.currentUser.id;
                              this.updateUser.password=data.password;
                              this.updateUser.newPassword=data.newPassword
                              this.apisProvider.startSpinner();
                              this.apisProvider.loadData( "api/user/changePassword", this.updateUser).then( data => {
                                  this.apisProvider.stopSpinner();
                                 if(data["success"]){
                                     this.apisProvider.presentToast(data["message"]);
                                 }else{
                                     this.apisProvider.openErrorAlert("Failed",data["message"]);
                                 }
                              } ).catch(result =>{
                                  this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
                              });
                          } else {
                              this.apisProvider.presentToast( 'Passwords does not match' );
                              return false;
                          }
                      }else{
                          this.apisProvider.presentToast( 'Password length should be 5 to 35 characters' );
                          return false;
                      }
                  }
              }
          ]
      } );
      forgot.present();
  }
  isValidPasswords(oldPassword: any,newPassword: any ) {
      if (oldPassword == newPassword) {
          return true;
      }
      return false;
  }
  isValidPassword(Password: any ) {
      let EMAIL_REGEXP = /.{5,35}/;
      if (EMAIL_REGEXP.test( Password) ) {
          return true;
      }
      return false;
  }
}
