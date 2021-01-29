import { Component } from '@angular/core';
import { NavController, Events, NavParams, ViewController } from 'ionic-angular';

import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import {CategoryItems } from '../models/ModelObjects';
@Component({
  selector: 'page-add-items ',
  templateUrl: 'add-items.html'
})
export class AddItemsPage{
  selectedStoreCategoryItem: CategoryItems = new CategoryItems(); 
  itemDeleteFlag:boolean =false;
  itemImages:string[] = new Array();
  isImage:boolean=false;
  isImageSize:boolean=false;
  validation_messages = {
    'name': [
        { type: 'required', message: 'Category Name is required.' },
        { type: 'minlength', message: 'Category Name must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Category Name cannot be more than 49 characters long.' }
      ],
    'description': [
        { type: 'required', message: 'Description is required.' },
        { type: 'minlength', message: 'description must be at least 20 characters long.' },
        { type: 'maxlength', message: 'description cannot be more than 199 characters long.' }
      ],
      'itemImages':[
        {type: 'required', message: 'Atleast one image required.'},
        
      ],
      'unitofMesure':[
        {type: 'required', message: 'This Field is required'},
        {type: 'minlength', message: 'Unit of Mesure must be at least 2 characters long.' },
        {type: 'maxlength', message: 'Unit of Mesure cannot be more than 10 characters long.' }
        
      ],
      'quantity':[
        {type: 'required', message: 'This Field is required'},
        {type: 'minlength', message: 'Quantity should must be at least 1 digit.' },
        {type: 'maxlength', message: 'Quantity cannot be more than 3 digits.' }
     ],
     'displayOrder':[
       {type: 'required', message: 'This Field is required'},
       {type: 'minlength', message: 'Display Order should must be at least 1 digit.' },
       {type: 'maxlength', message: 'Display Order cannot be more than 3 digits.' }
 ]
    }
  public onItemsForm: FormGroup;
  constructor(public viewCtrl: ViewController,private params: NavParams,public events:Events, public navCtrl: NavController,public apisProvider: ApisProvider,public helper:Helper, private _fb: FormBuilder ) {
    this.selectedStoreCategoryItem = this.params.get("itemData");
    this.onItemsForm = this._fb.group( {
      description: ['', Validators.compose( [
      ] )],
      name: ['', Validators.compose( [
        Validators.maxLength(39),
        Validators.minLength(5),
        Validators.required
      ] )],
      price: ['', Validators.compose( [
        Validators.maxLength(5),
        Validators.minLength(1),
        Validators.required
      ] )],
      quantity: ['', Validators.compose( [
        Validators.maxLength(3),
        Validators.minLength(1),
        Validators.required
      ] )],
      unitofMesure:['',Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(2),
        Validators.required
      ])],
      marketPrice: [],
      itemImages:[],
      displayOrder:['', Validators.compose( [
         Validators.maxLength(3),
         Validators.minLength(1),
         Validators.required
       ])]
  } );
  var that = this;
  setTimeout(function(){
    that.onItemsForm.controls["name"].setValue(that.selectedStoreCategoryItem.itemName);
    that.onItemsForm.controls["description"].setValue(that.selectedStoreCategoryItem.itemDescription);
    that.onItemsForm.controls["price"].setValue(that.selectedStoreCategoryItem.itemPrice);
    that.onItemsForm.controls["quantity"].setValue(that.selectedStoreCategoryItem.itemQuantity);
    that.onItemsForm.controls["unitofMesure"].setValue(that.selectedStoreCategoryItem.unitofMesure);
    that.onItemsForm.controls["marketPrice"].setValue(that.selectedStoreCategoryItem.marketPrice);
    that.onItemsForm.controls["displayOrder"].setValue(that.selectedStoreCategoryItem.displayOrder);
    this.itemImages=that.selectedStoreCategoryItem.itemsImages;
    that.itemDeleteFlag = (that.selectedStoreCategoryItem.deleteFlag == 'N')?false:true;
    if(!that.helper.isEmpty(that.selectedStoreCategoryItem.itemsImages)){
       if(that.selectedStoreCategoryItem.itemsImages.length == 0)
           that.isImage=false;
       else
           that.isImage=true;
       }
   }, 500);

  }
  addItem(){
    this.selectedStoreCategoryItem.itemName = this.onItemsForm.get("name").value;
    this.selectedStoreCategoryItem.itemDescription = this.onItemsForm.get("description").value;
    this.selectedStoreCategoryItem.deleteFlag = this.itemDeleteFlag?'Y':'N';
    this.selectedStoreCategoryItem.itemPrice = this.onItemsForm.get("price").value;
    this.selectedStoreCategoryItem.itemQuantity = this.onItemsForm.get("quantity").value;
    this.selectedStoreCategoryItem.unitofMesure = this.onItemsForm.get("unitofMesure").value;
    this.selectedStoreCategoryItem.marketPrice = this.onItemsForm.get("marketPrice").value;
    this.selectedStoreCategoryItem.displayOrder = this.onItemsForm.get("displayOrder").value;
    if(this.itemImages.length >0 ){
        if(this.helper.isEmpty(this.selectedStoreCategoryItem.itemsImages))
            this.selectedStoreCategoryItem.itemsImages=this.itemImages; 
        else
            this.selectedStoreCategoryItem.itemsImages=this.selectedStoreCategoryItem.itemsImages.concat(this.itemImages);
    }
    if(this.selectedStoreCategoryItem.itemsImages.length == 0){
        this.isImage=false;
        return;
    } else
        this.isImage=true;
    
    if(this.selectedStoreCategoryItem.itemsImages.length>4){
        this.isImageSize=true;
        return;
    }
    this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/stores/addItem',this.selectedStoreCategoryItem)
        .then( data => {
          if(data["success"]){
            this.dismiss()
            this.apisProvider.stopSpinner();
          }else{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
          }
        } ).catch(result =>{
            this.apisProvider.stopSpinner();
            this.apisProvider.openErrorAlert("Failed!","Somenting Went Worng, Please Try Again..!");
        });
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  onSelectItemImage( event ) {
    this.isImage=true;
    this.itemImages = this.helper.extractImagesFormEvent(event);
  }
  deleteImage(index){
      this.itemImages=[];
      this.selectedStoreCategoryItem.itemsImages.splice(index,1);
  }
}
