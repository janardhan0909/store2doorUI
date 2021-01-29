import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { MrGreenStores, StoreCategories, CategoryItems } from '../models/ModelObjects';
import { AddCategoryPage } from '../add-category/add-category';
import { AddItemsPage } from '../add-items/add-items';


@Component({
  selector: 'page-my-stores ',
  templateUrl: 'my-stores.html'
})
export class MyStoresPage {
  addStoreFlag : boolean = false;
  addCategoryFlag : boolean = false;
  addItemFlag : boolean = false;
  stores: Array<any> = [];
  selectedStore : number;
  onStoreForm: FormGroup;
  storeDeleteFlag:boolean = false;
  currentUser : any;
  selectedStoreData : MrGreenStores = new MrGreenStores();
  storeIdForCategory : number;
  categories : StoreCategories[] = new Array();
  items : CategoryItems[] = new Array();
  storeIdForItems : number;
  categoryIdForItems : number;
  storeImages:string[] = new Array();
  isImage:boolean=false;
  isImageSize:boolean=false;
  store:MrGreenStores = new MrGreenStores();
  validation_messages = {
    'name': [
        { type: 'required', message: 'This field is required.' },
        { type: 'minlength', message: 'Name must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Name cannot be more than 35 characters long.' },
        { type: 'pattern', message: 'Name must contain only numbers and letters.' },
      ],
    'location': [
        { type: 'required', message: 'This field is required.' },
        { type: 'minlength', message: 'Location must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Location cannot be more than 35 characters long.' }
      ],
    'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Please enter valid email address.' }
      ],
    'phoneNumber': [
        { type: 'required', message: 'Phone Number is required.' },
        { type: 'pattern', message: 'Please eneter valid mobile number' },
        { type: 'maxlength', message: 'Not More than 10 numbers' }
      ],
      'storeImages':[
        {type: 'required', message: 'Atleast one image required.'},
        
      ],
    }
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public apisProvider: ApisProvider,public helper:Helper, private _fb: FormBuilder ) {
  }
  ionViewCanEnter(){
      this.apisProvider.startSpinner();
      this.apisProvider.getCurrentUser().then( data => {
              this.currentUser = data;
              this.apisProvider.loadData( "api/stores/loadAllStores", data["id"] ).then( data => {
                  this.stores = data;
                  this.helper.logMessage("Stores==>",this.stores);
                  this.addStore();
              } );
              this.apisProvider.stopSpinner();
      } ).catch(result =>{
          this.apisProvider.stopSpinner();
          this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
      });
  }
  addStore(){
     this.store.storeImages=[];
     this.isImageSize=false;
     this.addStoreFlag = true;
     this.addCategoryFlag = false;
     this.addItemFlag = false;
     this.onStoreForm = this._fb.group( {
      name: ['', Validators.compose( [
          Validators.required,
          Validators.maxLength(39),
          Validators.minLength(5),
      ] )],
      email: ['', Validators.compose( [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ] )],
      phoneNumber: ['', Validators.compose( [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$'),
          Validators.maxLength(10),
      ] )],
      location: ['', Validators.compose( [
          Validators.required,
          Validators.maxLength(39),
          Validators.minLength(5)
      ] )],
      storeImages:[],
  } );
  }
  saveStoreData(){
      this.store.deleteFlag = this.storeDeleteFlag?'Y':'N';
      this.store.storeAdminId = this.selectedStoreData.storeAdminId;
      this.store.storeEmail = this.onStoreForm.get("email").value;
      this.store.storeLocation = this.onStoreForm.get("location").value;
      this.store.storeName = this.onStoreForm.get("name").value;
      this.store.storePhoneNumber = this.onStoreForm.get("phoneNumber").value
      this.store.userId = this.currentUser.id;
      this.store.id = this.selectedStoreData.id;
     if(this.storeImages.length >0 )
         this.store.storeImages=this.store.storeImages.concat(this.storeImages);
    if(this.store.storeImages.length == 0){
        this.isImage=false;
        return;
    }else
        this.isImage=true;
    if(this.store.storeImages.length>4){
        this.isImageSize=true;
        return;
    }
   this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/stores/addStore',this.store)
        .then( data => {
          if(data["success"]){
              this.addStoreFlag = false;
              this.storeImages=[];
            this.stores = data["storesList"];
            this.onStoreChange(this.selectedStore);
            this.apisProvider.openErrorAlert("Success!","Wow!, Operation Completed successfully");
            this.apisProvider.stopSpinner();
          }else{
            this.apisProvider.openErrorAlert("Failed!",data["message"]);
            this.apisProvider.stopSpinner();
          }
        } ).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
  }
  populateStoreFormData(){
    this.store.deleteFlag = this.storeDeleteFlag?'Y':'N';
    this.store.storeAdminId = this.selectedStoreData.storeAdminId;
    this.store.storeEmail = this.onStoreForm.get("email").value;
    this.store.storeLocation = this.onStoreForm.get("location").value;
    this.store.storeName = this.onStoreForm.get("name").value;
    this.store.storePhoneNumber = this.onStoreForm.get("phoneNumber").value
    this.store.userId = this.currentUser.id;
    this.store.id = this.selectedStoreData.id;
    return this.store;
  }
  onStoreChange(value : any){
     this.store.storeImages=[];
     this.selectedStore = value;
     if(this.stores.length == 0){
      this.selectedStoreData = new MrGreenStores();
      this.storeDeleteFlag = (false);
      this.onStoreForm.controls["email"].setValue('');
      this.onStoreForm.controls["location"].setValue('');
      this.onStoreForm.controls["name"].setValue('');
      this.onStoreForm.controls["phoneNumber"].setValue('');
     }
       for(var i=0; i<this.stores.length;i++){
        let obj = this.stores[i];
        if(this.selectedStore == obj["id"]){
         this.selectedStoreData = obj;
         this.storeDeleteFlag = (obj["deleteFlag"]=='Y');
         this.onStoreForm.controls["email"].setValue(obj["storeEmail"]);
         this.onStoreForm.controls["location"].setValue(obj["storeLocation"]);
         this.onStoreForm.controls["name"].setValue(obj["storeName"]);
         this.onStoreForm.controls["phoneNumber"].setValue(obj["storePhoneNumber"]);
         this.store.storeImages=obj["storeImages"];
         if(this.store.storeImages.length == 0)
              this.isImage=false;
         else
              this.isImage=true;
         break;
       }else{
        this.selectedStoreData = new MrGreenStores();
        this.storeDeleteFlag = (false);
        this.onStoreForm.controls["email"].setValue('');
        this.onStoreForm.controls["location"].setValue('');
        this.onStoreForm.controls["name"].setValue('');
        this.onStoreForm.controls["phoneNumber"].setValue('');
       if(this.store.storeImages.length == 0)
           this.isImage=false;
       else
           this.isImage=true;
       }
    }
  }
  onCategoryStoreChange(value : any){
    this.storeIdForCategory = value;
    this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/stores/loadAllCategoriesForStore',this.storeIdForCategory)
        .then( data => {
          if(data["success"]){
            this.categories = data["categoriesList"];
            this.helper.logMessage("categoris==>",this.categories);
            this.apisProvider.stopSpinner();
          }else{
            this.apisProvider.openErrorAlert("Failed!","Not able to fetch the details, please contact admin");
            this.apisProvider.stopSpinner();
          }
        } ).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
  }
  onItemStoreChange(value : any){
    this.storeIdForItems = value;
    this.categoryIdForItems = undefined;
    this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/stores/loadAllCategoriesForStore',this.storeIdForItems)
        .then( data => {
          if(data["success"]){
            this.categories = data["categoriesList"];
            this.helper.logMessage("categoris==>",this.categories);
            this.apisProvider.stopSpinner();
          }else{
            this.apisProvider.openErrorAlert("Failed!","Not able to fetch the details, please contact admin");
            this.apisProvider.stopSpinner();
          }
        } ).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
  }
  onItemCategoryChange(value : any){
    this.categoryIdForItems = value;
    this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/stores/loadAllItemsForStore1',{"storeId":this.storeIdForItems,"categoryId":this.categoryIdForItems})
        .then( data => {
          if(data["success"]){
            this.items = data["itemsList"];
            this.helper.logMessage("itemsList==>",this.items);
            this.apisProvider.stopSpinner();
          }else{
            this.apisProvider.openErrorAlert("Failed!","Not able to fetch the details, please contact admin");
            this.apisProvider.stopSpinner();
          }
        } ).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
  }
  addCategory(){
    this.addStoreFlag = false;
    this.addCategoryFlag = true;
    this.addItemFlag = false;
    this.categories.length = 0;
    this.storeIdForCategory = undefined;
  }
  addItem(){
    this.addStoreFlag = false;
    this.addCategoryFlag = false;
    this.addItemFlag = true;
    this.items.length =0;
    this.storeIdForItems = undefined;
  }
  openNewCategoryPopup(){
    let categoryData : StoreCategories = new StoreCategories();
    categoryData.storeId = this.storeIdForCategory;
    categoryData.categoryName = '';
    categoryData.categoryDescription = '';
    categoryData.id = 0;
    categoryData.deleteFlag = 'N';
    let categoryModal = this.modalCtrl.create(
      AddCategoryPage, 
      { "categoryData": categoryData },
    );
    categoryModal.onDidDismiss(data => {
      this.onCategoryStoreChange(this.storeIdForCategory);
    });
    categoryModal.present();
  }
  openCategoryPopup(categoryData:StoreCategories){
    categoryData.storeId = this.storeIdForCategory;
    let categoryModal = this.modalCtrl.create(
      AddCategoryPage, 
      { "categoryData": categoryData },
    );
    categoryModal.onDidDismiss(data => {
      this.onCategoryStoreChange(this.storeIdForCategory);
    });
    categoryModal.present();
  }
  openNewItemPopup(){
    let itemData : CategoryItems = new CategoryItems();
    itemData.storeId = this.storeIdForItems;
    itemData.categoryId = this.categoryIdForItems
    itemData.itemDescription = '';
    itemData.itemName = '';
    itemData.id = 0;
    itemData.deleteFlag = 'N';
    itemData.itemPrice = 0.0
    itemData.itemQuantity = 0;
    itemData.unitofMesure = '';
    let itemModal = this.modalCtrl.create(
      AddItemsPage, 
      { "itemData": itemData },
    );
    itemModal.onDidDismiss(data => {
      this.onItemCategoryChange(this.categoryIdForItems);
    });
    itemModal.present();
  }
  openItemPopup(itemData:CategoryItems){
    itemData.storeId = this.storeIdForItems;
    itemData.categoryId = this.categoryIdForItems;
    let itemModal = this.modalCtrl.create(
      AddItemsPage, 
      { "itemData": itemData },
    );
    itemModal.onDidDismiss(data => {
      this.onItemCategoryChange(this.categoryIdForItems);
    });
    itemModal.present();
  }
  onFileChangeLargeImage( event ) {
      this.isImage=true;
      this.storeImages = this.helper.extractImagesFormEvent(event);
  }
  deleteImage(index){
      this.storeImages=[];
      this.store.storeImages.splice(index,1);
  }
}
