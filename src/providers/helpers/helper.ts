import { Injectable } from '@angular/core';

@Injectable()
export class Helper{

    userOrderStatus:string = "OrderedPlaced";
    paymentType:string = "COD"
    userFirstOrder="userFirstOrder";
    logMessage(messageMark:string, content : any){
      console.log(messageMark,content);
    }
    isEmpty(value:any){
        if(value == null || value == undefined)
          return true;
        return false;
    }
    encode(data :any){
        return btoa(data);
    }
    decode(data : any){
        return atob(data);
    }
    extractImagesFormEvent( event ) {
        let images : string[] = new Array();
        if ( event.target.files && event.target.files.length > 0 ) {
          for(let i = 0; i < event.target.files.length; i++){
            let file = event.target.files[i];
            let reader = new FileReader();
            reader.readAsDataURL( file );
            reader.onload = () => {
                images.push(reader.result.toString());
              
            };
          }
        }
        return images;
    }
    calculateDeliveryDays(){
        let estimatedDelivery;
        let d = new Date();
        switch ( d.getDay() ) {
            case 0: {
                estimatedDelivery=7;
                break;
            }
            case 1: {
                estimatedDelivery=6;
                break;
            }
            case 2: {
                estimatedDelivery=5;
                break;
            }
            case 3: {
                estimatedDelivery=4;
                break;
            }
            case 4: {
                estimatedDelivery=3;
                break;
            }
            case 5: {
                estimatedDelivery=2;
                break;
            }
            case 6: {
                estimatedDelivery=1;
                break;
            }
        }
        return estimatedDelivery;
    }
}