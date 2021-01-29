import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController,App,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

  import { HomePage } from '../pages/home/home';
  import { PhonenumberPage } from '../pages/phonenumber/phonenumber';
  import { My_accountPage } from '../pages/my_account/my_account';
  import { Myorder_1Page } from '../pages/myorder_1/myorder_1';  
  import { HelpPage } from '../pages/help/help';
  import { CartPage } from '../pages/cart/cart';
  import { ReviewPage } from '../pages/review/review';
  import { LocationPage } from '../pages/location/location';
import { ApisProvider } from '../providers/apis/apis';
import { Helper } from '../providers/helpers/helper';
import { MyStoresPage } from '../pages/my-stores/my-stores';
import { AddressPage } from '../pages/address/address';
import{Myorder_2Page} from '../pages/myorder_2/myorder_2';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ItemRateingPage } from '../pages/item-rateing/itemrateing';
import {OurMissionPage} from '../pages/our-mission/our-mission';
import {AboutPage} from '../pages/about/about';
import {DeliveryChargesPage} from '../pages/delivery_charges/delivery_charges';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isSuperAdmin : boolean = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  loggedInUserName : string = "Store2Door";
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  isAuthenticated:boolean=false;
  constructor(private push: Push,public  app: App,private menu: MenuController,public alertCtrl: AlertController,public events:Events, public helper:Helper, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public apisProvider: ApisProvider) {
    events.subscribe('user:loggedIn', (user, time) => {
      this.menu.enable(true);
      this.populateMenu();
      this.isAuthenticated=true;
    });
    if(this.apisProvider.authenticated()){
      this.menu.enable(true);
      this.populateMenu();
      this.isAuthenticated=true;
    }else{
      this.menu.enable(false);
      this.isAuthenticated=false;
    }
    this.initializeApp();
    this.pushSetUp();
    // used for an example of ngFor and navigation
  }
  populateMenu(){
    this.apisProvider.getCurrentUser().then(data =>{
      this.isAdmin = data['admin'];
      this.isSuperAdmin = data['superAdmin'];
      this.isUser = data["user"];
      this.loggedInUserName = data["name"];
      this.helper.logMessage("GetUserData==>",data);
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.platform.registerBackButtonAction(() => {
        
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();                
     
        if(activeView.name === "HomePage") {
     
            if (nav.canGoBack()){ //Can we go back?
                nav.pop();
            } else {
                const alert = this.alertCtrl.create({
                    title: 'App termination',
                    message: 'Do you want to close the app?',
                    buttons: [{
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            this.helper.logMessage("data","Application exit prevented!")
                        }
                    },{
                        text: 'Close App',
                        handler: () => {
                            this.platform.exitApp(); // Close this application
                        }
                    }]
                });
                alert.present();
            }
        }else{
            nav.pop({});
        }
    });
  }
  
  myorder_1Page() {
    this.nav.push(Myorder_1Page);
  }
  
   locationPage() {
    this.nav.setRoot(LocationPage);
  }
  
  my_accountPage(activeTab:any) {
    this.nav.push(My_accountPage,{"activeTab":activeTab});
  }
 
   homePage() {
    this.nav.setRoot(HomePage);
  }
  
  reviewPage() {
    this.nav.setRoot(ReviewPage);
  }
  
  cartPage() {
    this.nav.setRoot(CartPage);
  }
  
  helpPage() {
    this.nav.setRoot(HelpPage);
  }
  
  phonenumberPage() {
    localStorage.clear();
    this.menu.enable(false);
    this.menu.enable(false);
    this.isAuthenticated=false;
    this.isSuperAdmin = false;
    this.isAdmin = false;
    this.isUser= false;
    this.nav.setRoot(HomePage);
  }
  myStotesPage(){
    this.nav.push(MyStoresPage);
  }
  myorder_2Page(){
      this.nav.push(Myorder_2Page);
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
           pushObject.on('registration').subscribe((registration: any) => this.helper.logMessage('Device registered', registration));

           pushObject.on('notification').subscribe((notification: any) => this.helper.logMessage('Received a notification', notification));


           pushObject.on('error').subscribe(error => this.helper.logMessage('Error with Push plugin', error));
  }
  ourMissionPage(){
      this.nav.push(OurMissionPage);
  }
  aboutPage(){
      this.nav.push(AboutPage);
  }
  deliveryChargesPage(){
      this.nav.push(DeliveryChargesPage);
  }
  loginPage(){
      this.nav.setRoot(PhonenumberPage);
  }
}
