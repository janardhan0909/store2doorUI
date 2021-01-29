import { Component } from '@angular/core';
import { NavController, ModalController,MenuController  } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { ApisProvider } from '../../providers/apis/apis';
import { PhonenumberPage } from '../phonenumber/phonenumber';
import { Helper } from '../../providers/helpers/helper';
import { MrGreenStores, StoreCategories } from '../models/ModelObjects';
import { ShowItemsPage } from '../show-items/show-items';
import {UserCart,Coupons}from '../models/ModelObjects';
import { MyApp } from '../../app/app.component';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  stores : any = new Array();
  selectedStore : number = 0;
  categories : StoreCategories[] = new Array();
  storeImages : string[] = new Array();
  cartItemSize:number;
  userCart:UserCart[] = new Array();
  showItems:boolean=false;
  couponsList:Coupons[]=new Array();
  constructor(private menu: MenuController,public helper:Helper, public navCtrl: NavController, public modalCtrl: ModalController,public apisProvider: ApisProvider) {
      this.menu.enable(true);
  }
  ionViewCanEnter() {
        this.apisProvider.startSpinner();
        this.apisProvider.loadData( "api/stores/loadAllStores").then( data => {
            this.stores = data;
            if(!this.helper.isEmpty(localStorage.getItem("storeId"))){
              this.selectedStore = Number(this.helper.decode(localStorage.getItem("storeId")));
              this.showItems=true;
              this.loadCategories();
              this.populateStoreImages();
            }
        } );
        this.apisProvider.stopSpinner();        
       this.loadCoupons();
       if(!this.apisProvider.authenticated()){
           this.apisProvider.loadData('api/userFlow/loadCart', '').then(data =>{
               if(data["success"]){
                   this.userCart = data["loadCartData"];
                   this.cartItemSize = this.userCart.length;
               }else{
                   this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
               }
               
           }).catch(result =>{
               this.apisProvider.stopSpinner();
               this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
           });
       }
  }
  ionViewWillEnter() { 
      this.menu.enable(true)
  }
  populateStoreImages(){
      for(var i=0 ;i<this.stores.length ;i++){
         if(this.selectedStore == this.stores[i].id){
          this.storeImages = this.stores[i].storeImages;
      }
     }
  }
   slides = [
    {
      title: "20% Off",
      description: "Furits & Veggies",
      smalltext: "Fresh & healthy",
      image: "assets/imgs/slider-1.jpg",
    },
    {
      title: "20% Off",
      description: "Tops & Tunics",
      image: "assets/imgs/slider-2.jpg",
    },
    {
      title: "20% Off",
      description: "Tops & Tunics",
      image: "assets/imgs/slider-3.jpg",
    }
  ];
  
     homeicons = [
    {
      name: "Vegetables & Fruits",
      imag: "assets/imgs/1.png",
    },
    {
      name: "Bakery & Dairy Products",
      imag: "assets/imgs/bakery.png",
    },
    {
      name: "Foodgrains, oil & masaala",
      imag: "assets/imgs/foodgrains.png",
    },
    {
      name: "Bevrages & drinks",
      imag: "assets/imgs/beverages.png",
    },
    {
      name: "Branded foods products",
      imag: "assets/imgs/branded.png",
    },
    {
      name: "Beauty & hygiene",
      imag: "assets/imgs/beauty.png",
    },
    {
      name: "Fish, Meet & Eggs",
      imag: "assets/imgs/non-veg.png",
    },
    {
      name: "Household products",
      imag: "assets/imgs/hosehold.png",
    },
    {
      name: "Grument & world food",
      imag: "assets/imgs/gourmet.png",
    }
  ];
   onStoreSelect(store){
    this.selectedStore = store.id;
      this.showItems=true;
    this.loadCategories();
  }
   onStoreChange(value : any){
      this.selectedStore = value;
      this.loadCategories();
     /* this.apisProvider.startSpinner();
      this.apisProvider.loadData('api/stores/loadAllCategoriesForStore',this.selectedStore)
          .then( data => {
            if(data["success"]){
              this.categories = data["categoriesList"];
              this.helper.logMessage("categoris==>",this.categories);
              this.populateStoreImages();
              this.apisProvider.stopSpinner();
            }else{
              this.apisProvider.openErrorAlert("Failed!","Not able to fetch the details, please contact admin");
              this.apisProvider.stopSpinner();
            }
          } );*/
    }
  loadCategories(){
      this.apisProvider.startSpinner();
      this.apisProvider.loadData('api/stores/loadAllCategoriesForStore',this.selectedStore)
      .then( data => {
        if(data["success"]){
          this.categories = data["categoriesList"];
          this.helper.logMessage("categoris==>",this.categories);
          this.populateStoreImages();
          this.apisProvider.stopSpinner();
        }else{
          this.apisProvider.openErrorAlert("Failed!","Not able to fetch the details, please contact admin");
          this.apisProvider.stopSpinner();
        }
      } );
  }
   categoryPage(catgory : StoreCategories){
    localStorage.setItem("categoryId",this.helper.encode(catgory.id.toString()));
    localStorage.setItem("storeId",this.helper.encode(this.selectedStore.toString()));
    localStorage.setItem("categoryName",this.helper.encode(catgory.categoryName))
    this.navCtrl.push(ShowItemsPage);
    }
    
    searchPage() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }
  
   cartPage() {
    let modal = this.modalCtrl.create(CartPage);
    modal.onDidDismiss(data => {
        this.cartItemSize=data;
      });
    modal.present();
  }
   loadCoupons() {
       this.apisProvider.loadData( 'api/stores/loadCoupons')
           .then( data => {
               if ( data["success"] ) {
                   this.couponsList = data["couponsList"];
               }else{
                   this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
               }
               
           } );
       }
}
