import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,ViewController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import { CategoryItems } from '../models/ModelObjects';
import { CartPage } from '../cart/cart';
import{UserCart} from '../models/ModelObjects';
import { ToastController } from 'ionic-angular';
import { ItemdetailPage } from '../itemdetail/itemdetail';
import { SearchPage } from '../search/search';
import { PhonenumberPage } from '../phonenumber/phonenumber';

@Component({
  selector: 'page-show-items ',
  templateUrl: 'show-items.html'
})
export class ShowItemsPage {
  items : CategoryItems[] = new Array();
  storeIdForItems : number;
  categoryIdForItems : number;
  selectedCategoryName : string ="Store2Door";
  userCart:UserCart = new UserCart();
  userCartList:UserCart[] = new Array();
  cartSize:number;
   cartData:any
  constructor( public viewCtrl: ViewController,private params: NavParams, public modalCtrl: ModalController,public navCtrl: NavController,public apisProvider: ApisProvider,public helper:Helper,private toastCtrl: ToastController) {
      if(!this.helper.isEmpty(localStorage.getItem("cartData"))){
         this.cartData=JSON.parse(localStorage.getItem("cartData"));
          this.userCart.itemId =this.cartData["itemId"];
          this.userCart.storeId =this.cartData["storeId"];
          this.userCart.totalPrice =this.cartData["itemPrice"];
          this.userCart.itemQuantity =this.cartData["itemQuantity"];
          this.addToCart1();
      }
  }
  ionViewCanEnter() {
      this.storeIdForItems = Number(this.helper.decode(localStorage.getItem("storeId")));
      this.categoryIdForItems = Number(this.helper.decode(localStorage.getItem("categoryId")));
      this.selectedCategoryName = this.helper.decode(localStorage.getItem("categoryName"));
      this.onItemCategoryChange();
      if(this.apisProvider.authenticated()){
          this.apisProvider.loadData('api/userFlow/loadCart', '').then(data =>{
              if(data["success"]){
                  this.userCartList = data["loadCartData"];
                  this.cartSize = this.userCartList.length;
                  this.helper.logMessage("homeCart", this.cartSize);
              }else{
                  this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
              }
          }).catch(result =>{
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          });
      }
  }
    onItemCategoryChange(){
    this.apisProvider.loadData('api/stores/loadAllItemsForStore',this.categoryIdForItems)
        .then( data => {
          if(data["success"]){
            this.items = data["itemsList"];
            this.helper.logMessage("itemsList==>",this.items);
          }else{
            this.apisProvider.openErrorAlert("Failed!","Not able to fetch the details, please contact admin");
          }
        } );
  }
  cartPage() {
    let modal = this.modalCtrl.create(CartPage);
    modal.onDidDismiss(data => {
        this.cartSize=data;
      });
    modal.present();
  }
  
  addToCart(itemData:any,index:any){
      if(!this.apisProvider.authenticated()){
          this.navCtrl.push(PhonenumberPage,{
              'isSkipLogin':true
          });
          let cartData={
              "itemId":itemData.id,
              "itemPrice":itemData.itemPrice,
              "itemQuantity":itemData.itemQuantity,
              "storeId":itemData.storeId
          }
          localStorage.setItem("cartData", JSON.stringify(cartData));
      }
      else{
          this.userCart.itemId = itemData.id;
          this.userCart.storeId = itemData.storeId;
          this.userCart.totalPrice = itemData.itemPrice;
          this.userCart.itemQuantity = itemData.itemQuantity;
          this.addToCart1();
      }
    }
  addToCart1(){
      
      this.apisProvider.loadData('api/userFlow/addCart', this.userCart).then(data =>{
          this.helper.logMessage("cartStatus", data);
          if(data["success"]){
              this.presentToast();
              this.userCartList = data["cartData"];
              this.cartSize = this.userCartList.length;
              localStorage.removeItem("cartData");
          }else{
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          }
      }).catch(result =>{
          this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
   });
  }
  dismiss() {
      let data = { 'foo': 'bar' };
      this.viewCtrl.dismiss(data);
      this.apisProvider.loadData('api/userFlow/loadCart', '').then(data =>{
          if(data["success"]){
              this.userCartList = data["loadCartData"];
              this.cartSize = this.userCartList.length;
              this.helper.logMessage("homeCart", this.cartSize);
          }else{
              this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
          }
          
      }).catch(result =>{
          this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
      });
    }
  presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Item added successfully',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
      });
      toast.present();
    }
  itemdetailPage(itemId:any) {
      this.navCtrl.push(ItemdetailPage,{
          'item':itemId
      });
    }
    searchPage() {
      let modal = this.modalCtrl.create(SearchPage);
      modal.present();
    }
  
}
