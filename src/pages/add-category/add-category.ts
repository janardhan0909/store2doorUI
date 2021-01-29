import { Component } from '@angular/core';
import { NavController, Events, NavParams, ViewController } from 'ionic-angular';

import { ApisProvider } from '../../providers/apis/apis';
import { Helper } from '../../providers/helpers/helper';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { StoreCategories } from '../models/ModelObjects';
@Component({
  selector: 'page-add-category ',
  templateUrl: 'add-category.html'
})
export class AddCategoryPage{
  selectedStoreCategory: StoreCategories = new StoreCategories(); 
  categoryDeleteFlag:boolean =false;
  categoryImages:string[] = new Array();
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
        { type: 'maxlength', message: 'Password cannot be more than 199 characters long.' }
      ],
      'categoryImages':[
        {type: 'required', message: 'Atleast one image required.'},
        
      ],
    }
  public onCategoryForm: FormGroup;
  constructor(private viewCtrl: ViewController,private params: NavParams,public events:Events, public navCtrl: NavController,public apisProvider: ApisProvider,public helper:Helper, private _fb: FormBuilder ) {
    this.selectedStoreCategory = this.params.get("categoryData");
    this.onCategoryForm = this._fb.group( {
      description: ['', Validators.compose( [
      ] )],
      name: ['', Validators.compose( [
        Validators.maxLength(39),
        Validators.minLength(5),
        Validators.required
      ] )],
      categoryImages:[]
  } );
  var that = this;
  setTimeout(function(){
    that.onCategoryForm.controls["name"].setValue(that.selectedStoreCategory.categoryName);
    that.onCategoryForm.controls["description"].setValue(that.selectedStoreCategory.categoryDescription);
    that.categoryDeleteFlag = (that.selectedStoreCategory.deleteFlag == 'N')?false:true;
    this.categoryImages=that.selectedStoreCategory.categoryImages;
    if(that.selectedStoreCategory.categoryImages.length == 0)
        that.isImage=false;
    else
        that.isImage=true;
   }, 500);

  }
  addCategory(){
    this.selectedStoreCategory.categoryName = this.onCategoryForm.get("name").value;
    this.selectedStoreCategory.categoryDescription = this.onCategoryForm.get("description").value;
    this.selectedStoreCategory.deleteFlag = this.categoryDeleteFlag?'Y':'N';
    if(this.categoryImages.length >0)
        this.selectedStoreCategory.categoryImages=this.selectedStoreCategory.categoryImages.concat(this.categoryImages);
    if(this.selectedStoreCategory.categoryImages.length == 0){
        this.isImage=false;
        return;
    }else
        this.isImage=true;
    if(this.selectedStoreCategory.categoryImages.length>4){
       this.isImageSize=true;
       return;
    }
    this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/stores/addCategory',this.selectedStoreCategory)
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
            this.apisProvider.openErrorAlert("Failed!","Data not saved, please contact admin");
        });
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  onFileChangeLargeImage( event ) {
      this.isImage=true;
      this.categoryImages = this.helper.extractImagesFormEvent(event);
   }
  deleteImage(index){
      this.categoryImages=[];
      this.selectedStoreCategory.categoryImages.splice(index,1);
  }
}
