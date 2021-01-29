import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController,ToastController } from 'ionic-angular';
import { Helper } from '../helpers/helper';
import { AlertController } from 'ionic-angular';
import { RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
@Injectable()
export class ApisProvider {
    public logedInUserName : string ="";
    public load:any;
    userName:string="vdmavendodu"
    request = (options) => {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })
        if(localStorage.getItem("accesskey")) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem("accesskey"))
        }else{
            headers.append('username',this.userName)
        }
        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);

        return fetch(options.url, options)
        .then(response => 
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
    };
    
    constructor( public toastCtrl:ToastController,private http: HttpClient,private loadingCtrl: LoadingController,public helper:Helper,private alertCtrl: AlertController ) { }
   
    startSpinner(){
         this.load = this.loadingCtrl.create({
           
          });
        this.load.present();
    }
    stopSpinner(){
        this.load.dismiss();
    }
    openErrorAlert(titleMessage,errorMessage) {
        let alert = this.alertCtrl.create({
            title: titleMessage,
            message: errorMessage,
            //subTitle: error,
            buttons: [
          {
            text: "Ok",
            handler: data => {
              
            }
          }]
          });
          alert.present();
      }
    apiUrl = 'http://localhost:5000/store2door/';
    //apiUrl = 'http://store2doottest-env.eba-fknzkmdw.ap-south-1.elasticbeanstalk.com/store2door/';
    apiMethod( data: any, path: any ) {
        return new Promise(( resolve, reject ) => {
            this.http.post( this.apiUrl + path, JSON.stringify( data ) )
                .subscribe( res => {
                    resolve( res );
                }, ( err ) => {
                    reject( err );
                } );
        } );
    }

    loadData(path: any,data ?:any) {
        if(typeof(data)=='number'){
            let response = this.request({
                url: this.apiUrl + path+"?id="+data,
                method: 'POST',
                body: JSON.stringify(data)
            });
            return response;
        }else{
            let response = this.request({
                url: this.apiUrl + path,
                method: 'POST',
                body: JSON.stringify(data)
            });
            return response;
        }
    }
    getCurrentUser() {
        if(!localStorage.getItem("accesskey")) {
           localStorage.clear();
           return Promise.reject("No access token set.");
        } 
        return this.request({
            url: this.apiUrl + "api/user/me",
            method: 'POST'
        });
    }   
    authenticated(){
        if(!this.helper.isEmpty(localStorage.getItem("accesskey")))
          return true;
        return false;
    }
    presentToast(message:any) {
        let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
        toast.onDidDismiss(() => {
        });
        toast.present();
    }
}
