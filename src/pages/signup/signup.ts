import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import { PhonenumberPage } from '../phonenumber/phonenumber';
import { ApisProvider } from '../../providers/apis/apis';

@Component({
  selector: 'page-signup ',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  validation_messages = {
    'username': [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters.' },
        { type: 'maxlength', message: 'Username cannot be more than 39 characters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
    'name': [
        { type: 'required', message: 'This field is required.' },
        { type: 'minlength', message: 'Name must be at least 5 characters.' },
        { type: 'maxlength', message: 'Name cannot be more than 35 characters.' },
        { type: 'pattern', message: 'Name must contain only numbers and letters.' },
      ],
    'password': [
        { type: 'required', message: 'This field is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters.' },
        { type: 'maxlength', message: 'Password cannot be more than 35 characters.' }
      ],
    'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Please enter valid email address.' }
      ],
     'phoneNumber': [
        { type: 'required', message: 'Phone Number is required.' },
        { type: 'pattern', message: 'Please enter valid mobile number' }
      ],
    }
  public onRegisterForm: FormGroup;
  isValidPassword:boolean=false;
  constructor(public navCtrl: NavController,public apisProvider: ApisProvider, private _fb: FormBuilder ) {
    this.onRegisterForm = this._fb.group( {
      name: ['', Validators.compose( [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*$'),
          Validators.maxLength(39),
          Validators.minLength(5),
      ] )],
      email: ['', Validators.compose( [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ] )],
      phoneNumber: ['', Validators.compose( [
          Validators.required,
          Validators.pattern('^(\\+91[\\-\\s]?)?[0]?(91)?[6789]\\d{9}$'),
      ] )],                    
      password: ['', Validators.compose( [
          Validators.required,
          Validators.maxLength(39),
          Validators.minLength(5)
      ] )],
      username: ['', Validators.compose( [
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ] )],
      confirmPassword: ['', Validators.compose( [
        Validators.required,
        Validators.maxLength(39),
        Validators.minLength(5)
     ])]
  } );
    this.onRegisterForm.get( 'phoneNumber' ).setValue("+91");
  }
  loginPage(){
    this.navCtrl.push(PhonenumberPage);
  }
  signUp() {
    this.apisProvider.startSpinner();
    this.apisProvider.apiMethod( this.onRegisterForm.value, 'api/auth/signup' )
        .then( data => {
          if(data["success"]){
            this.navCtrl.push(PhonenumberPage);
            this.apisProvider.stopSpinner();
          }else{
            this.apisProvider.openErrorAlert("Registration Failed!",data["message"]);
            this.apisProvider.stopSpinner();
          }
        } ).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
   }
  passwordChange(){
      this.isValidPassword=true;
     if(this.onRegisterForm.get("password").value==this.onRegisterForm.get("confirmPassword").value){
         this.isValidPassword=false;
     }else
         this.isValidPassword=true;
  }
  passwordChange1(){
      this.onRegisterForm.get( 'confirmPassword' ).setValue("");
  }

}
