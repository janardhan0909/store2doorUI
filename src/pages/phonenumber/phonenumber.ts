import { Component } from '@angular/core';
import { NavController, Events, MenuController,AlertController,NavParams } from 'ionic-angular';

import { SignUpPage } from '../signup/signup'
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ShowItemsPage } from '../show-items/show-items';
import { ShippiningPage } from '../shippining/shippining';
@Component({
  selector: 'page-phonenumber ',
  templateUrl: 'phonenumber.html'
})
export class PhonenumberPage {
    facebookData:any;
    deviceId:any;
    isSkipLogin:boolean=false;
  validation_messages = {
    'usernameOrEmail': [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters.' },
        { type: 'maxlength', message: 'Username cannot be more than 39 characters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
    'password': [
        { type: 'required', message: 'This field is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters.' },
        { type: 'maxlength', message: 'Password cannot be more than 35 characters.' }
      ],
    }
  public onLoginForm: FormGroup;
  constructor( private push: Push,private fb: Facebook,private googlePlus: GooglePlus,private menu: MenuController,public events:Events, public navCtrl: NavController,public apisProvider: ApisProvider,public helper:Helper, private _fb: FormBuilder,public alrtCtrl: AlertController,public navParms:NavParams) {
    this.onLoginForm = this._fb.group( {
      password: ['', Validators.compose( [
          Validators.required,
          Validators.maxLength(39),
          Validators.minLength(5)
      ] )],
      usernameOrEmail: ['', Validators.compose( [
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ] )],
      deviceId:[]
  } );
    this.pushSetUp();
    this.isSkipLogin = this.navParms.get("isSkipLogin");
  }
  signUpPage(){
    this.navCtrl.push(SignUpPage);
    }
    login(){
      this.apisProvider.startSpinner();
      this.onLoginForm.value.deviceId = this.deviceId;
        this.apisProvider.apiMethod( this.onLoginForm.value, 'api/auth/signin' )
            .then( data => {
              this.helper.logMessage("Login Data",data);
              if(!this.helper.isEmpty(data["accessToken"])){
                localStorage.setItem( "accesskey", data["accessToken"] );
                this.events.publish('user:loggedIn', data, Date.now());
                this.apisProvider.stopSpinner();
                if(this.helper.isEmpty(localStorage.getItem("cartData")) && this.helper.isEmpty(localStorage.getItem("buyNowData")) )
                    this.navCtrl.setRoot(HomePage);
                else if(!this.helper.isEmpty(localStorage.getItem("cartData")))
                    this.navCtrl.setRoot(ShowItemsPage);
                else if(!this.helper.isEmpty(localStorage.getItem("buyNowData")))
                    this.navCtrl.setRoot(ShippiningPage);
                    
              }else{
                this.apisProvider.openErrorAlert("Login Failed!","Oops!, Somthing went wrong. Please check your credentials.");   
                this.apisProvider.stopSpinner();
              }
            } ).catch(result =>{
                this.apisProvider.stopSpinner();
                this.apisProvider.openErrorAlert("Login Failed!","Oops!, Somthing went wrong. Please check your credentials."); 
            });
    }
    
    loginWithGoogle() {
        this.apisProvider.startSpinner();
        this.googlePlus.login( {} )
            .then( res => {
                   res.deviceId=this.deviceId;
                this.apisProvider.apiMethod( res, 'api/auth/google' )
                    .then( data => {
                        this.helper.logMessage( "Login Data", data );
                        if ( !this.helper.isEmpty( data["accessToken"] ) ) {
                            localStorage.setItem( "accesskey", data["accessToken"] );
                            this.events.publish( 'user:loggedIn', data, Date.now() );
                            this.apisProvider.stopSpinner();
                            this.navCtrl.setRoot( HomePage );
                        } else {
                            this.apisProvider.openErrorAlert( "Login Failed!", "Oops!, Somthing went wrong. Please check your credentials." );
                            this.apisProvider.stopSpinner();
                        }

                    } ).catch(result =>{
                        this.apisProvider.stopSpinner();
                        this.apisProvider.openErrorAlert( "Login Failed!", "Oops!, Somthing went wrong. Please check your credentials." );
                    });
            } );
    }
    loginWithFB() {
        this.apisProvider.startSpinner();
        this.fb.login( ['email', 'public_profile'] ).then(( response: FacebookLoginResponse ) => {
            this.fb.api( 'me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', [] ).then( profile => {
                this.facebookData = { userID: response.authResponse.userID, email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'],deviceId:this.deviceId }
                this.apisProvider.apiMethod( this.facebookData, 'api/auth/facebook' )
                    .then( data => {
                        this.helper.logMessage( "Login Data", data );
                        if ( !this.helper.isEmpty( data["accessToken"] ) ) {
                            localStorage.setItem( "accesskey", data["accessToken"] );
                            this.events.publish( 'user:loggedIn', data, Date.now() );
                            this.apisProvider.stopSpinner();
                            this.navCtrl.setRoot( HomePage );
                        } else {
                            this.apisProvider.openErrorAlert( "Login Failed!", "Oops!, Somthing went wrong. Please check your credentials." );
                            this.apisProvider.stopSpinner();
                        }
                    } ).catch(result =>{
                        this.apisProvider.stopSpinner();
                        this.apisProvider.openErrorAlert( "Login Failed!", "Oops!, Somthing went wrong. Please check your credentials." );
                    });
            } ).catch(e => this.apisProvider.openErrorAlert("Error", JSON.stringify(e)));
        } ).catch(e => this.apisProvider.openErrorAlert("Error", JSON.stringify(e)));
    }
    pushSetUp(){
        const options: PushOptions = {
          android: {
              senderID:'200119753561'
          },
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
          }
       };
       
       const pushObject: PushObject = this.push.init(options);
       
       pushObject.on('registration').subscribe((registration: any) => {
           this.deviceId=registration.registrationId;
       });
       pushObject.on('notification').subscribe((notification: any) => {});
       
       pushObject.on('error').subscribe(error => {});
      }
    forgotPass() {
        let forgot = this.alrtCtrl.create( {
            title: 'Forgot Password?',
            message: "Please enter your email address",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email',
                    type: 'email'
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
                        if ( this.isValidMailFormat( data.email ) ) {
                            this.apisProvider.startSpinner();
                            this.apisProvider.apiMethod(data.email, 'api/auth/forgotPassword' )
                                .then( data => {
                                    this.apisProvider.stopSpinner();
                                    if ( data["success"] ) {
                                        this.apisProvider.presentToast(data["message"])
                                    } else {
                                        this.apisProvider.presentToast(data["message"])
                                    }
                                } );
                            return true;
                        } else {
                            this.apisProvider.presentToast("Invalid Emial")
                            return false;
                        }
                    }
                }
            ]
        } );
        forgot.present();
    }
    isValidMailFormat( email: any ) {
        let EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (EMAIL_REGEXP.test( email) ) {
            return true;
        }
        return false;
    }
    skipLogin(){
        this.navCtrl.setRoot( HomePage );
    }
}
