import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PhonenumberPage } from '../pages/phonenumber/phonenumber';
import { ItemdetailPage } from '../pages/itemdetail/itemdetail';
import { ShippiningPage } from '../pages/shippining/shippining';
import { PaymentPage } from '../pages/payment/payment';
import { PlacedPage } from '../pages/placed/placed';
import { My_accountPage } from '../pages/my_account/my_account';
import { Myorder_1Page } from '../pages/myorder_1/myorder_1';
import { HelpPage } from '../pages/help/help';
import { CartPage } from '../pages/cart/cart';
import { ReviewPage } from '../pages/review/review';
import { SearchPage } from '../pages/search/search';
import { LocationPage } from '../pages/location/location';
import { Myorder_2Page } from '../pages/myorder_2/myorder_2';
import { ListPage } from '../pages/list/list';
import { SignUpPage} from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApisProvider } from '../providers/apis/apis';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { Helper } from '../providers/helpers/helper';
import { MyStoresPage } from '../pages/my-stores/my-stores';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { AddItemsPage } from '../pages/add-items/add-items';
import { ShowItemsPage } from '../pages/show-items/show-items';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { AddressPage } from '../pages/address/address';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ItemRateingPage } from '../pages/item-rateing/itemrateing';
import { Ionic2RatingModule } from 'ionic2-rating';
import {OurMissionPage} from '../pages/our-mission/our-mission';
import {AboutPage} from '../pages/about/about';
import {DeliveryChargesPage} from '../pages/delivery_charges/delivery_charges';
@NgModule({ 
  declarations: [
    MyApp,
    HomePage,
    PhonenumberPage,
    ItemdetailPage,
    ShippiningPage,
    PaymentPage,
    PlacedPage,
    My_accountPage,
    Myorder_1Page,  
    HelpPage,
    CartPage,
    ReviewPage,
    SearchPage,
    LocationPage,
	Myorder_2Page,
	ListPage,
	AboutPage,OurMissionPage,DeliveryChargesPage,
  SignUpPage,MyStoresPage,AddCategoryPage,AddItemsPage,ShowItemsPage,AddressPage,ItemRateingPage,OurMissionPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PhonenumberPage,
    ItemdetailPage,
    ShippiningPage,
    PaymentPage,
    PlacedPage,
    My_accountPage,
    Myorder_1Page,  
    HelpPage,
    CartPage,
    ReviewPage,
    SearchPage,
    LocationPage,
	Myorder_2Page,
	ListPage,AboutPage,OurMissionPage,DeliveryChargesPage,SignUpPage,MyStoresPage,AddCategoryPage,AddItemsPage,ShowItemsPage,AddressPage,ItemRateingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApisProvider,
    Helper,GooglePlus,Facebook,Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
