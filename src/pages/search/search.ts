import { Component } from '@angular/core';
import { App,NavController, ViewController } from 'ionic-angular';
import { Helper } from '../../providers/helpers/helper';
import { ApisProvider } from '../../providers/apis/apis';
import { CategoryItems } from '../models/ModelObjects';
import {ItemdetailPage} from '../itemdetail/itemdetail';
@Component({
  selector: 'page-search ',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchData:string;
  storeId:string;
  categoryItem:CategoryItems[] = new Array();
  categoryItemForDisplay:CategoryItems[] = new Array();
  itemName:String[] 
  item:any;
  constructor(public appCtrl: App,public navCtrl: NavController, public viewCtrl: ViewController,private helper:Helper,public apisProvider: ApisProvider,) {
    this.helper.logMessage("storeid",this.helper.decode(localStorage.getItem("storeId")));
    this.storeId = this.helper.decode(localStorage.getItem("storeId"));
    if(this.storeId != ""){
      this.loadItemsForStore();
    }
  }
   dismiss() {
    this.viewCtrl.dismiss();
  }

  setFilteredItems(category:any){
this.helper.logMessage("searchItem",category);
if (category.trim() !== 'all')
{
    this.categoryItemForDisplay = this.categoryItem.filter((item) =>
   {
      return item.itemName.toLowerCase().indexOf(category.toLowerCase()) > -1;
   })
}
  }

  loadItemsForStore(){
    this.apisProvider.startSpinner();
    this.apisProvider.loadData('api/stores/search',this.storeId)
        .then( data => {
          if(data["success"]){
              this.helper.logMessage("data",data);
            this.categoryItem = data["data"];
            this.categoryItemForDisplay = this.categoryItem;
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
  itemdetail(item:any) {
      this.navCtrl.push(ItemdetailPage,{
          'item':item
      });
  }
  
}
