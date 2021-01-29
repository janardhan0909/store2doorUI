webpackJsonp([0],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Helper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Helper = (function () {
    function Helper() {
        this.userOrderStatus = "OrderedPlaced";
        this.paymentType = "COD";
        this.userFirstOrder = "userFirstOrder";
    }
    Helper.prototype.logMessage = function (messageMark, content) {
        console.log(messageMark, content);
    };
    Helper.prototype.isEmpty = function (value) {
        if (value == null || value == undefined)
            return true;
        return false;
    };
    Helper.prototype.encode = function (data) {
        return btoa(data);
    };
    Helper.prototype.decode = function (data) {
        return atob(data);
    };
    Helper.prototype.extractImagesFormEvent = function (event) {
        var images = new Array();
        if (event.target.files && event.target.files.length > 0) {
            var _loop_1 = function (i) {
                var file = event.target.files[i];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    images.push(reader.result.toString());
                };
            };
            for (var i = 0; i < event.target.files.length; i++) {
                _loop_1(i);
            }
        }
        return images;
    };
    Helper.prototype.calculateDeliveryDays = function () {
        var estimatedDelivery;
        var d = new Date();
        switch (d.getDay()) {
            case 0: {
                estimatedDelivery = 7;
                break;
            }
            case 1: {
                estimatedDelivery = 6;
                break;
            }
            case 2: {
                estimatedDelivery = 5;
                break;
            }
            case 3: {
                estimatedDelivery = 4;
                break;
            }
            case 4: {
                estimatedDelivery = 3;
                break;
            }
            case 5: {
                estimatedDelivery = 2;
                break;
            }
            case 6: {
                estimatedDelivery = 1;
                break;
            }
        }
        return estimatedDelivery;
    };
    Helper = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], Helper);
    return Helper;
}());

//# sourceMappingURL=helper.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shippining_shippining__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ModelObjects__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__show_items_show_items__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__phonenumber_phonenumber__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ItemdetailPage = (function () {
    function ItemdetailPage(navCtrl, helper, toastCtrl, modalCtrl, navParms, apisProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.helper = helper;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.navParms = navParms;
        this.apisProvider = apisProvider;
        this.itemDetails = new __WEBPACK_IMPORTED_MODULE_4__models_ModelObjects__["a" /* CategoryItems */]();
        this.userCartList = new Array();
        this.addCartData = new __WEBPACK_IMPORTED_MODULE_4__models_ModelObjects__["h" /* UserCart */]();
        this.avgRating = 0;
        this.isShowReviews = false;
        this.itemDetails = this.navParms.get("item");
        this.itemName = this.itemDetails.itemName;
        this.actualQuantity = this.itemDetails.itemQuantity;
        this.totalAmountCalculation();
        var i = 0;
        if (!this.helper.isEmpty(this.itemDetails["itemRatingDto"])) {
            for (i = 0; i < this.itemDetails["itemRatingDto"].length; i++) {
                this.avgRating += this.itemDetails["itemRatingDto"][i]["rating"];
            }
            this.avgRating = this.avgRating / i;
        }
        if (this.apisProvider.authenticated()) {
            this.apisProvider.loadData('api/userFlow/loadCart', '').then(function (data) {
                if (data["success"]) {
                    _this.userCartList = data["loadCartData"];
                    _this.cartSize = _this.userCartList.length;
                }
                else {
                    _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                }
            }).catch(function (result) {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            });
        }
    }
    /* ionViewCanEnter() {
     }*/
    /* searchPage() {
       let modal = this.modalCtrl.create(SearchPage);
       modal.present();
     }
     */
    ItemdetailPage.prototype.shippiningPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__shippining_shippining__["a" /* ShippiningPage */]);
    };
    ItemdetailPage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function (data) {
            _this.cartSize = data;
        });
        modal.present();
    };
    ItemdetailPage.prototype.decreaseQuality = function (itemData) {
        this.apisProvider.startSpinner();
        this.itemDetails.itemQuantity = itemData - this.actualQuantity;
        this.totalAmountCalculation();
        this.apisProvider.stopSpinner();
    };
    ItemdetailPage.prototype.increaseQuality = function (itemData) {
        this.apisProvider.startSpinner();
        this.itemDetails.itemQuantity = itemData + this.actualQuantity;
        this.totalAmountCalculation();
        this.apisProvider.stopSpinner();
    };
    ItemdetailPage.prototype.addToCart = function () {
        var _this = this;
        if (!this.apisProvider.authenticated()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__phonenumber_phonenumber__["a" /* PhonenumberPage */], {
                'isSkipLogin': true
            });
            var cartData = {
                "itemId": this.itemDetails.id,
                "itemPrice": this.itemDetails.itemPrice,
                "itemQuantity": this.itemDetails.itemQuantity,
                "storeId": this.itemDetails.storeId
            };
            localStorage.setItem("cartData", JSON.stringify(cartData));
        }
        else {
            this.addCartData.itemId = this.itemDetails.id;
            this.addCartData.storeId = this.itemDetails.storeId;
            this.addCartData.totalPrice = this.itemDetails.itemPrice;
            this.addCartData.itemQuantity = this.itemDetails.itemQuantity;
            this.apisProvider.startSpinner();
            this.apisProvider.loadData('api/userFlow/addCart', this.addCartData).then(function (data) {
                _this.helper.logMessage("cartStatus", data);
                if (data["success"]) {
                    _this.apisProvider.stopSpinner();
                    _this.presentToast();
                    _this.userCartList = data["cartData"];
                    _this.cartSize = _this.userCartList.length;
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__show_items_show_items__["a" /* ShowItemsPage */]);
                }
                else {
                    _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                    _this.apisProvider.stopSpinner();
                }
            }).catch(function (result) {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            });
        }
    };
    ItemdetailPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Item added successfully',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    ItemdetailPage.prototype.totalAmountCalculation = function () {
        this.totalVal = 0;
        this.totalVal = this.totalVal + (this.itemDetails.itemPrice * this.itemDetails.itemQuantity);
    };
    ItemdetailPage.prototype.buyNow = function (itemData, index) {
        if (!this.apisProvider.authenticated()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__phonenumber_phonenumber__["a" /* PhonenumberPage */], {
                'isSkipLogin': true
            });
            var buyNowData = {
                "itemId": this.itemDetails.id,
                "itemPrice": this.itemDetails.itemPrice,
                "itemQuantity": this.itemDetails.itemQuantity,
                "storeId": this.itemDetails.storeId
            };
            localStorage.setItem("buyNowData", JSON.stringify(buyNowData));
        }
        else {
            this.addCartData.itemId = this.itemDetails.id;
            this.addCartData.storeId = this.itemDetails.storeId;
            this.addCartData.totalPrice = this.itemDetails.itemPrice;
            this.addCartData.itemQuantity = this.itemDetails.itemQuantity;
            this.buyNow1();
        }
    };
    ItemdetailPage.prototype.buyNow1 = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/userFlow/addCart', this.addCartData).then(function (data) {
            _this.helper.logMessage("cartStatus", data);
            if (data["success"]) {
                _this.apisProvider.stopSpinner();
                _this.userCartList = data["cartData"];
                _this.cartSize = _this.userCartList.length;
                localStorage.removeItem("buyNowData");
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__shippining_shippining__["a" /* ShippiningPage */], {
                    'orderData': _this.userCartList
                });
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ItemdetailPage.prototype.showReviews = function () {
        this.isShowReviews = !this.isShowReviews;
    };
    ItemdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-itemdetail ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\itemdetail\itemdetail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n   <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title><div style="font-size: 1.1rem !important;">{{itemName}}</div>\n\n            <div class="icon-box" *ngIf="this.apisProvider.authenticated()">\n\n                <img src="assets/imgs/ic_my_cart.png" (click)="cartPage()">\n\n                <ion-badge>{{cartSize}}</ion-badge>\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n   <!--  <div class="img-section shadow-bottom" text-center>\n\n        <img src="data:image/png;base64,{{itemDetails.itemsImages}}">\n\n        <div class="tab-btn-box">\n\n            <div class="tab-btn">\n\n                <img src="data:image/png;base64,{{itemDetails.itemsImages}}">\n\n            </div>\n\n            <div class="tab-btn">\n\n                <img src="data:image/png;base64,{{itemDetails.itemsImages}}">\n\n            </div>\n\n        </div>\n\n        <div class="d-flex" style="align-items: stretch;">\n\n            <span>{{itemDetails.itemName}}</span>\n\n        </div>\n\n    </div> -->\n\n    <div>\n\n	    <ion-slides pager >\n\n	        <ion-slide *ngFor="let image of itemDetails.itemsImages">\n\n	            <img style=" width: 100%;height: 200px;"src="data:image/png;base64,{{image}}"/>\n\n	        </ion-slide>\n\n	    </ion-slides>\n\n	</div>\n\n	<!-- <div class="about-section1 shadow-bottom bg-white">\n\n        <h4 ion-text style="font-size: 1.5rem;">{{itemName}}  \n\n            <ion-badge style="float: right; margin-right: 10px;" color="secondary" class="text-11x">\n\n             {{ avgRating | number:\'1.1\' }}\n\n   			<ion-icon  name="star"></ion-icon>\n\n          </ion-badge>\n\n         </h4>\n\n    </div> -->\n\n    <div class="about-section shadow-bottom bg-white">\n\n        <h3>About Product</h3>\n\n        <p>\n\n            {{itemDetails.itemDescription}}\n\n\n\n        </p>\n\n    </div>\n\n    <div class="price-section shadow-bottom bg-white">\n\n        <div class="d-flex">\n\n        <p class="d-flex" *ngIf="itemDetails.marketPrice !=0" style="text-decoration-line: line-through;"><i class="fa fa-rupee"></i>{{itemDetails.marketPrice}}</p>\n\n            <p class="d-flex">\n\n                {{itemDetails.itemPrice | currency:"₹":0 }} <span>per {{itemDetails.unitofMesure}}\n\n                </span>\n\n            </p>\n\n            <div class="d-flex btn-grup">\n\n                <div class="btn text-white bg-thime green-shadow " *ngIf="itemDetails.itemQuantity > 1" (click)="decreaseQuality(itemDetails.itemQuantity)">\n\n                    -\n\n                </div>\n\n                <span>{{itemDetails.itemQuantity}} {{itemDetails.unitofMesure}}</span>\n\n                <div class="btn text-white bg-thime green-shadow " (click)="increaseQuality(itemDetails.itemQuantity)">\n\n                    +\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    <div class="price-section shadow-bottom bg-white">\n\n        <div class="d-flex">\n\n            <p class="d-flex">\n\n                Total Price : <span><b>{{totalVal | currency:"₹":0}}</b>\n\n                </span>\n\n            </p>\n\n           \n\n        </div>\n\n    </div>\n\n    <!-- <div class="price-section shadow-bottom bg-white">\n\n        <div class="d-flex">\n\n            <p class="d-flex">\n\n               <span>Delivery in {{estimatedDelivery}} days</span>\n\n            </p>\n\n        </div>\n\n    </div> -->\n\n    <h4 ion-text class="fw500">Ratings & Reviews  \n\n            <ion-badge style="float: right; margin-right: 10px;" color="secondary" class="text-11x">\n\n   		<ion-icon  name="star"></ion-icon>\n\n              {{ avgRating | number:\'1.1\' }}\n\n          </ion-badge>\n\n         </h4>\n\n          <ion-list class="list-full-border">\n\n      <ion-item *ngFor="let review of itemDetails.itemRatingDto" margin-bottom text-wrap>\n\n   \n\n          <h2 class="fw700">\n\n            <ion-badge color="secondary" class="text-1x">\n\n   <ion-icon name="star"></ion-icon>\n\n              {{ review.rating | number:\'1.1\' }}\n\n          </ion-badge>\n\n          <!-- {{ review.comments }} --></h2>\n\n   \n\n        <p ion-text>\n\n          {{ review.comments }}\n\n        </p>\n\n         <span ion-text class="author text-11x">By {{ review.userName}}</span> \n\n      </ion-item>\n\n    </ion-list>\n\n    <!-- <br><br>\n\n    <button ion-button icon-start block  (click)="buyNow(item,in)" >Buy Now</button>\n\n    &nbsp; &nbsp; &nbsp;<br><br>\n\n   &nbsp; <button ion-button full class="bg-thime btn-fisx-bottom btn-text" (click)="addToCart()" style="margin: 0;">ADD TO CART</button> -->\n\n</ion-content>\n\n<ion-footer class="bg-thime">\n\n  <ion-row>\n\n    <ion-col col-5>\n\n      <h3 style="color:white;text-align:center; font-size:15px;" (click)="buyNow(item,in)"><span>BUY NOW</span></h3>\n\n    </ion-col>\n\n    <ion-col col-2>\n\n    <div class="verticalLine"></div>\n\n    </ion-col>\n\n    <ion-col col-5>\n\n      <h3 style="color:white;font-size: 15px;" (click)="addToCart()"><span>ADD TO CART</span></h3>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-footer>'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\itemdetail\itemdetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_apis_apis__["a" /* ApisProvider */]])
    ], ItemdetailPage);
    return ItemdetailPage;
}());

//# sourceMappingURL=itemdetail.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApisProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApisProvider = (function () {
    function ApisProvider(toastCtrl, http, loadingCtrl, helper, alertCtrl) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.helper = helper;
        this.alertCtrl = alertCtrl;
        this.logedInUserName = "";
        this.userName = "vdmavendodu";
        this.request = function (options) {
            var headers = new Headers({
                'Content-Type': 'application/json',
            });
            if (localStorage.getItem("accesskey")) {
                headers.append('Authorization', 'Bearer ' + localStorage.getItem("accesskey"));
            }
            else {
                headers.append('username', _this.userName);
            }
            var defaults = { headers: headers };
            options = Object.assign({}, defaults, options);
            return fetch(options.url, options)
                .then(function (response) {
                return response.json().then(function (json) {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                });
            });
        };
        this.apiUrl = 'http://localhost:5000/store2door/';
    }
    ApisProvider.prototype.startSpinner = function () {
        this.load = this.loadingCtrl.create({});
        this.load.present();
    };
    ApisProvider.prototype.stopSpinner = function () {
        this.load.dismiss();
    };
    ApisProvider.prototype.openErrorAlert = function (titleMessage, errorMessage) {
        var alert = this.alertCtrl.create({
            title: titleMessage,
            message: errorMessage,
            //subTitle: error,
            buttons: [
                {
                    text: "Ok",
                    handler: function (data) {
                    }
                }
            ]
        });
        alert.present();
    };
    //apiUrl = 'http://store2doottest-env.eba-fknzkmdw.ap-south-1.elasticbeanstalk.com/store2door/';
    ApisProvider.prototype.apiMethod = function (data, path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + path, JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ApisProvider.prototype.loadData = function (path, data) {
        if (typeof (data) == 'number') {
            var response = this.request({
                url: this.apiUrl + path + "?id=" + data,
                method: 'POST',
                body: JSON.stringify(data)
            });
            return response;
        }
        else {
            var response = this.request({
                url: this.apiUrl + path,
                method: 'POST',
                body: JSON.stringify(data)
            });
            return response;
        }
    };
    ApisProvider.prototype.getCurrentUser = function () {
        if (!localStorage.getItem("accesskey")) {
            localStorage.clear();
            return Promise.reject("No access token set.");
        }
        return this.request({
            url: this.apiUrl + "api/user/me",
            method: 'POST'
        });
    };
    ApisProvider.prototype.authenticated = function () {
        if (!this.helper.isEmpty(localStorage.getItem("accesskey")))
            return true;
        return false;
    };
    ApisProvider.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    ApisProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], ApisProvider);
    return ApisProvider;
}());

//# sourceMappingURL=apis.js.map

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 217;

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SignUpRequest; });
/* unused harmony export LoginRequest */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MrGreenStores; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return StoreCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return UserCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DeliveryAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return UserOrderDetails; });
/* unused harmony export LookUpItems */
/* unused harmony export UserOrderItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return ZipCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DeliveryCharges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Coupons; });
var SignUpRequest = (function () {
    function SignUpRequest() {
    }
    return SignUpRequest;
}());

var LoginRequest = (function () {
    function LoginRequest() {
    }
    return LoginRequest;
}());

var MrGreenStores = (function () {
    function MrGreenStores() {
    }
    return MrGreenStores;
}());

var StoreCategories = (function () {
    function StoreCategories() {
        this.categoryImages = new Array();
    }
    return StoreCategories;
}());

var CategoryItems = (function () {
    function CategoryItems() {
    }
    return CategoryItems;
}());

var UserCart = (function () {
    function UserCart() {
    }
    return UserCart;
}());

var DeliveryAddress = (function () {
    function DeliveryAddress() {
    }
    return DeliveryAddress;
}());

var UserOrderDetails = (function () {
    function UserOrderDetails() {
    }
    return UserOrderDetails;
}());

var LookUpItems = (function () {
    function LookUpItems() {
    }
    return LookUpItems;
}());

var UserOrderItem = (function () {
    function UserOrderItem() {
    }
    return UserOrderItem;
}());

var ZipCode = (function () {
    function ZipCode() {
    }
    return ZipCode;
}());

var DeliveryCharges = (function () {
    function DeliveryCharges() {
    }
    return DeliveryCharges;
}());

var Coupons = (function () {
    function Coupons() {
    }
    return Coupons;
}());

//# sourceMappingURL=ModelObjects.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__phonenumber_phonenumber__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shippining_shippining__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CartPage = (function () {
    function CartPage(appCtrl, navCtrl, viewCtrl, apisProvider, helper) {
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this.userCart = new Array();
    }
    CartPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        if (!this.apisProvider.authenticated())
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__phonenumber_phonenumber__["a" /* PhonenumberPage */]);
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/userFlow/loadCart', '').then(function (data) {
            if (data["success"]) {
                _this.userCart = data["loadCartData"];
                _this.totalVal = 0;
                _this.totalAmountCalculation();
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    CartPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.userCart.length);
    };
    CartPage.prototype.deleteItemFromCart = function (itemData) {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/userFlow/deleteItemFromCart', itemData).then(function (data) {
            if (data["success"]) {
                _this.apisProvider.stopSpinner();
                _this.userCart = data["loadCartData"];
                _this.cartSize = _this.userCart.length;
                _this.totalAmountCalculation();
                //location.reload();
            }
            else {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    CartPage.prototype.decreaseQuality = function (itemData) {
        var _this = this;
        this.apisProvider.startSpinner();
        itemData.itemQuantity = itemData.itemQuantity - 1;
        this.apisProvider.loadData('api/userFlow/addCart', itemData).then(function (data) {
            _this.helper.logMessage("cartStatus", data);
            if (data["success"]) {
                _this.apisProvider.stopSpinner();
                _this.userCart = data["cartData"];
                _this.totalAmountCalculation();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    CartPage.prototype.increaseQuality = function (itemData, index) {
        var _this = this;
        this.apisProvider.startSpinner();
        itemData.itemQuantity = itemData.itemQuantity + 1;
        this.apisProvider.loadData('api/userFlow/addCart', itemData).then(function (data) {
            _this.helper.logMessage("cartStatus", data);
            if (data["success"]) {
                _this.apisProvider.stopSpinner();
                _this.userCart = data["cartData"];
                _this.totalAmountCalculation();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    CartPage.prototype.shippiningPage = function (orderedData) {
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__shippining_shippining__["a" /* ShippiningPage */], {
            'orderData': this.userCart
        });
        /* this.navCtrl.push(ShippiningPage,{
             'orderData':this.userCart
         });*/
    };
    CartPage.prototype.totalAmountCalculation = function () {
        var _this = this;
        this.totalVal = 0;
        this.userCart.forEach(function (val, i) {
            _this.totalVal = _this.totalVal + (val.totalPrice * val.itemQuantity);
        });
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-cart ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\cart\cart.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Cart\n\n            <span float-right> \n\n                  <ion-icon name="md-close" class="close-icon" (click)="dismiss()"></ion-icon>          \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <div class="your-cart bg-thime">\n\n        <ion-card *ngFor="let cart of userCart;">\n\n            <ion-card-content>\n\n                <ion-row>\n\n                    <ion-col col-3>\n\n                        <div class="img-box">\n\n                            <img src="data:image/png;base64,{{cart.base64Image}}" style="height: 100px;">\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-9>\n\n                        <h4>{{cart.categoryItemName}}\n\n                            <ion-icon  name="ios-trash-outline" class="icon text-light right" (click)="deleteItemFromCart(cart)"></ion-icon>\n\n                        </h4>\n\n                        <div class="price shadow-bottom bg-white">\n\n                            <div class="d-flex">\n\n                                <p class="text-sky">\n\n                                    {{cart.totalPrice | currency:"₹":0}} \n\n                                </p>\n\n                                <div class="d-flex btn-grup">\n\n                                    <div class="btn text-white bg-thime green-shadow " *ngIf="cart.itemQuantity > 1" (click)="decreaseQuality(cart)">\n\n                                        -\n\n                                    </div>\n\n                                    <span>{{cart.itemQuantity}} {{cart.unitofMesure}}</span>\n\n                                    <div class="btn text-white bg-thime green-shadow "(click)="increaseQuality(cart)">\n\n                                        +\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-card-content>\n\n        </ion-card>\n\n\n\n               <ion-row class="checkout" *ngIf="totalVal != 0">\n\n            <ion-col col-6>\n\n                <h6 class="text-white">\n\n                    Total <span>                \n\n                    {{totalVal | currency:"₹":0}}</span>\n\n                </h6>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <button ion-button full class="bg-white btn-round btn-text  text-sky btn-shadow"(click)="shippiningPage(cart)">Proceed to Checkout</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\cart\cart.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_helpers_helper__["a" /* Helper */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__phonenumber_phonenumber__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_apis_apis__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignUpPage = (function () {
    function SignUpPage(navCtrl, apisProvider, _fb) {
        this.navCtrl = navCtrl;
        this.apisProvider = apisProvider;
        this._fb = _fb;
        this.validation_messages = {
            'username': [
                { type: 'required', message: 'Username is required.' },
                { type: 'minlength', message: 'Username must be at least 5 characters.' },
                { type: 'maxlength', message: 'Username cannot be more than 39 characters.' },
                { type: 'validUsername', message: 'Your username has already been taken.' }
            ],
            'name': [
                { type: 'required', message: 'This field is required.' },
                { type: 'minlength', message: 'Name must be at least 5 characters.' },
                { type: 'maxlength', message: 'Name cannot be more than 35 characters.' },
                { type: 'pattern', message: 'Name must contain only numbers and letters.' },
            ],
            'password': [
                { type: 'required', message: 'This field is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters.' },
                { type: 'maxlength', message: 'Password cannot be more than 35 characters.' }
            ],
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter valid email address.' }
            ],
            'phoneNumber': [
                { type: 'required', message: 'Phone Number is required.' },
                { type: 'pattern', message: 'Please enter valid mobile number' }
            ],
        };
        this.isValidPassword = false;
        this.onRegisterForm = this._fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z ]*$'),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(39),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(5),
                ])],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])],
            phoneNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^(\\+91[\\-\\s]?)?[0]?(91)?[6789]\\d{9}$'),
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(39),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(5)
                ])],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(25),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required
                ])],
            confirmPassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(39),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(5)
                ])]
        });
        this.onRegisterForm.get('phoneNumber').setValue("+91");
    }
    SignUpPage.prototype.loginPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__phonenumber_phonenumber__["a" /* PhonenumberPage */]);
    };
    SignUpPage.prototype.signUp = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.apiMethod(this.onRegisterForm.value, 'api/auth/signup')
            .then(function (data) {
            if (data["success"]) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__phonenumber_phonenumber__["a" /* PhonenumberPage */]);
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.openErrorAlert("Registration Failed!", data["message"]);
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    SignUpPage.prototype.passwordChange = function () {
        this.isValidPassword = true;
        if (this.onRegisterForm.get("password").value == this.onRegisterForm.get("confirmPassword").value) {
            this.isValidPassword = false;
        }
        else
            this.isValidPassword = true;
    };
    SignUpPage.prototype.passwordChange1 = function () {
        this.onRegisterForm.get('confirmPassword').setValue("");
    };
    SignUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signup ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\signup\signup.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>\n\n                <span float-right (click)="loginPage()">Login</span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <img src="assets/imgs/logo.png" class="center-img"/>\n\n    <div [formGroup]="onRegisterForm" class="form" padding-left padding-right>\n\n        <ion-list>\n\n                <ion-item>\n\n                    <ion-input placeholder="Full Name" formControlName="name" type="text" text-left value=""></ion-input>\n\n                </ion-item>\n\n                <ng-container *ngFor="let validation of validation_messages.name" >\n\n                        <div class="error-message" *ngIf="onRegisterForm.get(\'name\').hasError(validation.type) && onRegisterForm.get(\'name\').touched">\n\n                    {{ validation.message }}\n\n                        </div>\n\n                </ng-container>\n\n                <ion-item>\n\n                    <ion-input placeholder="Email" type="text" formControlName="email" text-left value=""></ion-input>\n\n                </ion-item>\n\n                <ng-container *ngFor="let validation of validation_messages.email" >\n\n                        <div class="error-message" *ngIf="onRegisterForm.get(\'email\').touched && onRegisterForm.get(\'email\').hasError(validation.type)">\n\n                    {{ validation.message }}\n\n                        </div>\n\n                </ng-container>\n\n                <ion-item>\n\n                    <ion-input placeholder="Phone Number" type="text" formControlName="phoneNumber" text-left></ion-input>\n\n                </ion-item>\n\n                <ng-container *ngFor="let validation of validation_messages.phoneNumber" >\n\n                        <div class="error-message" *ngIf="onRegisterForm.get(\'phoneNumber\').hasError(validation.type) && onRegisterForm.get(\'phoneNumber\').touched">\n\n                    {{ validation.message }}\n\n                        </div>\n\n                </ng-container>\n\n                <ion-item>\n\n                    <ion-input placeholder="User Name" formControlName="username" type="text" text-left value=""></ion-input>\n\n                </ion-item>\n\n                <ng-container *ngFor="let validation of validation_messages.username" >\n\n                            <div class="error-message" *ngIf="onRegisterForm.get(\'username\').hasError(validation.type) && onRegisterForm.get(\'username\').touched">\n\n                        {{ validation.message }}\n\n                            </div>\n\n                </ng-container>\n\n                <ion-item>\n\n                    <ion-input placeholder="Password" type="password" formControlName="password" text-left value="" (ionChange)="passwordChange1()"></ion-input>\n\n                </ion-item>\n\n                <ng-container *ngFor="let validation of validation_messages.password" >\n\n                        <div class="error-message" *ngIf="onRegisterForm.get(\'password\').hasError(validation.type) && onRegisterForm.get(\'password\').touched">\n\n                    {{ validation.message }}\n\n                        </div>\n\n                </ng-container>\n\n                 <ion-item>\n\n                    <ion-input placeholder="Confirm Password" type="password" formControlName="confirmPassword" text-left value="" (ionChange)="passwordChange()"></ion-input>\n\n                </ion-item>\n\n                <div class="error-message" *ngIf="isValidPassword">\n\n                       Passwords does not match\n\n                </div>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="signUp()" [disabled]="!onRegisterForm.valid || isValidPassword">Continue</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\signup\signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__placed_placed__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PaymentPage = (function () {
    function PaymentPage(navCtrl, navParms, helper, apisProvider) {
        this.navCtrl = navCtrl;
        this.navParms = navParms;
        this.helper = helper;
        this.apisProvider = apisProvider;
        this.totalAmountToPay = 0;
        this.orderdedDetails = new Array();
        this.userOrderData = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["i" /* UserOrderDetails */]();
        this.paymentMethod = "";
        this.isPaymentSuccess = false;
        this.totalAmountToPay = this.navParms.get("tatalAmount");
        this.orderdedDetails = this.navParms.get("orderDetails");
        this.deleveryAddress = this.navParms.get("develiryAddress");
    }
    PaymentPage.prototype.placedPage = function () {
        if (this.paymentMethod == 'razorPay') {
            var options = {
                description: 'Credits towards Order',
                image: 'assets/icon/logo.jpg',
                currency: 'INR',
                key: 'rzp_test_FQTIPHr2bSNb46',
                amount: this.totalAmountToPay * 100,
                name: 'MrGreen',
                /*prefill: {
                  email: 'pranav@razorpay.com',
                  contact: '8879524924',
                  name: 'Pranav Gupta'
                 },*/
                theme: {
                    color: '#39c526'
                },
                modal: {
                    ondismiss: function () {
                        alert('dismissed');
                    }
                }
            };
            var successCallback = function (payment_id) {
                this.saveOrder("RazorPay");
            }.bind(this);
            var cancelCallback = function (error) {
                alert(error.description + ' (Error ' + error.code + ')');
            };
            RazorpayCheckout.open(options, successCallback, cancelCallback);
        }
        else {
            this.saveOrder("COD");
        }
    };
    PaymentPage.prototype.saveOrder = function (paymentMethod) {
        var _this = this;
        this.userOrderData.paymentType = paymentMethod;
        this.userOrderData.totalPrice = this.totalAmountToPay;
        this.userOrderData.orderAddressId = this.deleveryAddress.id;
        this.userOrderData.orderItemsData = this.orderdedDetails;
        this.userOrderData.orderStatus = this.helper.userOrderStatus;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/saveOrders', this.userOrderData).then(function (data) {
            localStorage.removeItem("categoryId");
            localStorage.removeItem("storeId");
            localStorage.removeItem("categoryName");
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__placed_placed__["a" /* PlacedPage */]);
            _this.apisProvider.stopSpinner();
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Error while loading");
        });
    };
    PaymentPage.prototype.onPaymentChange = function (payment) {
        this.paymentMethod = payment;
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-payment ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\payment\payment.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n   <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Pay now</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content radio-group class="bg-light">\n\n    <ion-row text-center class="status">\n\n        <ion-col class="complate">\n\n            <ion-icon name="ios-checkmark-circle"></ion-icon><span>Sign in</span></ion-col>\n\n        <ion-col class="processing">\n\n            <ion-icon name="ios-checkmark-circle"></ion-icon><span>Shipping</span></ion-col>\n\n        <ion-col class="panding">\n\n            <ion-icon name="md-radio-button-off"></ion-icon><span>Payment</span></ion-col>\n\n    </ion-row>\n\n	<ion-card>\n\n        <p class="heading">Total Amount to Pay: {{totalAmountToPay| currency:"₹":0}}</p>\n\n     </ion-card>\n\n    <ion-card>\n\n        <p class="heading">PAYMENT METHOD</p>\n\n     </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-content>\n\n            <ion-item>\n\n                <ion-label>Cash on Delivery</ion-label>\n\n               <ion-radio value="card" (ionSelect)="onPaymentChange(\'cod\')"></ion-radio>\n\n            </ion-item>\n\n        </ion-card-content>\n\n    </ion-card>\n\n   	<!--<ion-card>\n\n        <ion-card-content>\n\n            <ion-item>\n\n                <ion-label>Via Razorpay</ion-label>\n\n                <ion-radio value="net_banking" (ionSelect)="onPaymentChange(\'razorPay\')"></ion-radio>\n\n            </ion-item>\n\n        </ion-card-content>\n\n    </ion-card>-->\n\n    <div class="spacebar"></div>\n\n    <div class="btn-padding btn-fisx-bottom">\n\n        <button *ngIf="!paymentMethod==\'\'" ion-button full class="bg-green btn-round green-shadow btn-text" (click)="placedPage()">CONTINUE\n\n        </button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\payment\payment.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlacedPage = (function () {
    function PlacedPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PlacedPage.prototype.homePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    PlacedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-placed ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\placed\placed.html"*/'<ion-header>\n\n    \n\n        <!-- <button ion-button menuToggle>\n\n    <img src="assets/imgs/ic_menu.png">\n\n    </button> -->\n\n        <ion-title>Order Placed !</ion-title>\n\n    \n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="img-box">\n\n        <img src="assets/imgs/order-placed.jpg">\n\n    </div>\n\n    <h3 class="text-sky" text-center>Your order placed !!</h3>\n\n    <h4 class="" text-center>Your order has been placed successfully.</h4>\n\n    <div class="btn-padding btn-fisx-bottom ">\n\n        <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="homePage()">CONTINUE SHOPPING</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\placed\placed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], PlacedPage);
    return PlacedPage;
}());

//# sourceMappingURL=placed.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_ModelObjects__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddressPage = (function () {
    function AddressPage(navCtrl, viewCtrl, apisProvider, helper, _fb) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this._fb = _fb;
        this.zipCode = new __WEBPACK_IMPORTED_MODULE_3__models_ModelObjects__["j" /* ZipCode */]();
        this.isInvalidPincode = false;
        this.validation_messages = {
            'name': [
                { type: 'required', message: 'This is field required.' },
            ],
            'phoneNumber': [
                { type: 'required', message: 'Phone Number is required.' },
                { type: 'pattern', message: 'Please enter valid mobile number' },
            ],
            'pin': [
                { type: 'required', message: 'Pincode is required.' },
                { type: 'pattern', message: 'Please enter valid pincode' }
            ]
        };
        this.onAddressForm = this._fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            address: ['', __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            streetAddress: ['', __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            pin: ['', __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].pattern('^[0-9]{6}$'),
                ])],
            city: ['', __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            state: ['', __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            contNo: ['', __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].pattern('^(\\+91[\\-\\s]?)?[0]?(91)?[6789]\\d{9}$'),
                ])],
            landMark: ['', __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["f" /* Validators */].required
                ])],
        });
        this.onAddressForm.get('contNo').setValue("+91");
    }
    AddressPage.prototype.saveAddress = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/addNewAddress', this.onAddressForm.value)
            .then(function (data) {
            _this.onAddressForm.reset;
            if (data["success"]) {
                _this.viewCtrl.dismiss("saved");
            }
            else {
                _this.apisProvider.openErrorAlert("Error", "Something went wrong please try again!");
                _this.viewCtrl.dismiss("notSaved");
            }
            _this.apisProvider.stopSpinner();
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    AddressPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss("notSaved");
    };
    AddressPage.prototype.onPincodeChange = function () {
        var _this = this;
        var pincode = this.onAddressForm.get("pin").value;
        this.onAddressForm.get('city').setValue('');
        this.onAddressForm.get('state').setValue('');
        if (pincode.length == 6) {
            this.apisProvider.startSpinner();
            this.apisProvider.loadData('api/order/getAddressByPin', pincode)
                .then(function (data) {
                _this.apisProvider.stopSpinner();
                if (data["success"]) {
                    if (!_this.helper.isEmpty(data["data"])) {
                        _this.isInvalidPincode = false;
                        _this.zipCode = data["data"];
                        _this.onAddressForm.get('city').setValue(_this.zipCode.city);
                        _this.onAddressForm.get('state').setValue(_this.zipCode.state);
                    }
                    else {
                        _this.isInvalidPincode = true;
                    }
                }
            }).catch(function (result) {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            });
        }
    };
    AddressPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-address',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\address\address.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Address\n\n            <span float-right> \n\n                  <ion-icon name="md-close" class="close-icon" (click)="dismiss()"></ion-icon>          \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div [formGroup]="onAddressForm" class="form" padding-left padding-right>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>Name:</ion-label>\n\n                <ion-input  formControlName="name" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.name" >\n\n                <div class="error-message" *ngIf="onAddressForm.get(\'name\').hasError(validation.type) && (onAddressForm.get(\'name\').dirty || onAddressForm.get(\'name\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label>Address:</ion-label>\n\n                <ion-input  formControlName="address" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.name" >\n\n                <div class="error-message" *ngIf="onAddressForm.get(\'address\').hasError(validation.type) && (onAddressForm.get(\'address\').dirty || onAddressForm.get(\'address\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label>StreetAddress:</ion-label>\n\n                <ion-input  formControlName="streetAddress" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.name" >\n\n                <div class="error-message" *ngIf="onAddressForm.get(\'streetAddress\').hasError(validation.type) && (onAddressForm.get(\'streetAddress\').dirty || onAddressForm.get(\'streetAddress\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label>Pincode:</ion-label>\n\n                <ion-input  formControlName="pin" type="number" text-left value="" (ionChange)="onPincodeChange()"></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.pin" >\n\n                        <div class="error-message" *ngIf="onAddressForm.get(\'pin\').hasError(validation.type) && (onAddressForm.get(\'pin\').dirty || onAddressForm.get(\'pin\').touched)">\n\n                    {{ validation.message }}\n\n                        </div>\n\n                </ng-container>\n\n                <div class="error-message" *ngIf="isInvalidPincode">\n\n                    	Items not Deliverable to this Pin code.\n\n                 </div>\n\n            <ion-item>\n\n                <ion-label>City:</ion-label>\n\n                <ion-input  formControlName="city" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.name" >\n\n                <div class="error-message" *ngIf="onAddressForm.get(\'city\').hasError(validation.type) && (onAddressForm.get(\'city\').dirty || onAddressForm.get(\'city\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label>State:</ion-label>\n\n                <ion-input  formControlName="state" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.name" >\n\n                <div class="error-message" *ngIf="onAddressForm.get(\'state\').hasError(validation.type) && (onAddressForm.get(\'state\').dirty || onAddressForm.get(\'state\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n             <ion-item>\n\n                <ion-label>LandMark:</ion-label>\n\n                <ion-input  formControlName="landMark" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.name" >\n\n                <div class="error-message" *ngIf="onAddressForm.get(\'streetAddress\').hasError(validation.type) && (onAddressForm.get(\'streetAddress\').dirty || onAddressForm.get(\'streetAddress\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label>ContactNo:</ion-label>\n\n                <ion-input  formControlName="contNo" type="text" text-left></ion-input>\n\n            </ion-item>\n\n             <ng-container *ngFor="let validation of validation_messages.phoneNumber" >\n\n                        <div class="error-message" *ngIf="onAddressForm.get(\'contNo\').hasError(validation.type) && (onAddressForm.get(\'contNo\').dirty || onAddressForm.get(\'contNo\').touched)">\n\n                    {{ validation.message }}\n\n                        </div>\n\n                </ng-container>\n\n        </ion-list>\n\n        </div>\n\n    <button ion-button full class="bg-thime btn-round btn-text" (click)="saveAddress()" [disabled]="!onAddressForm.valid">Add</button>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\address\address.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_forms__["a" /* FormBuilder */]])
    ], AddressPage);
    return AddressPage;
}());

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return My_accountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ModelObjects__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var My_accountPage = (function () {
    function My_accountPage(navCtrl, apisProvider, helper, alertCtrl, navParms) {
        this.navCtrl = navCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this.alertCtrl = alertCtrl;
        this.navParms = navParms;
        this.account = "profile";
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_4__models_ModelObjects__["f" /* SignUpRequest */]();
        this.updateUser = new __WEBPACK_IMPORTED_MODULE_4__models_ModelObjects__["f" /* SignUpRequest */]();
        this.addressList = new Array();
        this.account = this.navParms.get("activeTab");
        this.populateMenu();
        this.loadAllAddress();
    }
    My_accountPage.prototype.populateMenu = function () {
        var _this = this;
        this.apisProvider.getCurrentUser().then(function (data) {
            _this.currentUser = data;
        });
    };
    My_accountPage.prototype.loadAllAddress = function () {
        var _this = this;
        this.apisProvider.loadData('api/order/loadAddress', '')
            .then(function (data) {
            _this.addressList = data["address"];
            if (_this.addressList.length == 0) {
                //this.addressPopup();
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    My_accountPage.prototype.changePassword = function () {
        var _this = this;
        var forgot = this.alertCtrl.create({
            title: 'Change Password?',
            message: "Please enter old password and new password.",
            inputs: [
                {
                    name: 'password',
                    placeholder: 'Old Password',
                    type: 'password'
                },
                {
                    name: 'newPassword',
                    placeholder: 'New Password',
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    type: 'password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        if (_this.isValidPassword(data.password) && (_this.isValidPassword(data.newPassword) && _this.isValidPassword(data.confirmPassword))) {
                            if (_this.isValidPasswords(data.newPassword, data.confirmPassword)) {
                                _this.updateUser.id = _this.currentUser.id;
                                _this.updateUser.password = data.password;
                                _this.updateUser.newPassword = data.newPassword;
                                _this.apisProvider.startSpinner();
                                _this.apisProvider.loadData("api/user/changePassword", _this.updateUser).then(function (data) {
                                    _this.apisProvider.stopSpinner();
                                    if (data["success"]) {
                                        _this.apisProvider.presentToast(data["message"]);
                                    }
                                    else {
                                        _this.apisProvider.openErrorAlert("Failed", data["message"]);
                                    }
                                }).catch(function (result) {
                                    _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                                });
                            }
                            else {
                                _this.apisProvider.presentToast('Passwords does not match');
                                return false;
                            }
                        }
                        else {
                            _this.apisProvider.presentToast('Password length should be 5 to 35 characters');
                            return false;
                        }
                    }
                }
            ]
        });
        forgot.present();
    };
    My_accountPage.prototype.isValidPasswords = function (oldPassword, newPassword) {
        if (oldPassword == newPassword) {
            return true;
        }
        return false;
    };
    My_accountPage.prototype.isValidPassword = function (Password) {
        var EMAIL_REGEXP = /.{5,35}/;
        if (EMAIL_REGEXP.test(Password)) {
            return true;
        }
        return false;
    };
    My_accountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-my_account ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\my_account\my_account.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n     <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>My Acount\n\n            <span float-right> \n\n                <!--  <ion-icon padding-right name="ios-search-outline" class="icon"></ion-icon>\n\n              <ion-icon name="ios-cart-outline" class="icon"></ion-icon>  -->             \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-list padding-left>\n\n        <ion-item padding-left padding-right>\n\n            <ion-avatar item-start>\n\n                <img src="assets/imgs/logo.png">\n\n            </ion-avatar>\n\n            <h2 class="">{{currentUser.name}}\n\n                <!-- <small class=""> Edit profile</small> -->\n\n            </h2>\n\n            <p class="text-dark">+91 {{currentUser.mobileNumber}}\n\n            </p><br>\n\n        </ion-item>\n\n    </ion-list>\n\n    <ion-toolbar no-border-top class="tab-bar">\n\n        <ion-segment [(ngModel)]="account">\n\n            <ion-segment-button value="profile">\n\n                Profile\n\n            </ion-segment-button>\n\n            <ion-segment-button value="card">\n\n                My Cards\n\n            </ion-segment-button> \n\n          <ion-segment-button value="address">\n\n                My Addresses\n\n            </ion-segment-button> \n\n        </ion-segment>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div [ngSwitch]="account">\n\n        <div *ngSwitchCase="\'profile\'" class="profile-section">\n\n            <ion-list>\n\n                <ion-item>\n\n                    <ion-label floating>Name</ion-label>\n\n                    <ion-input type="text" value="{{currentUser.name}}" readonly="true"></ion-input>\n\n                </ion-item>\n\n                <ion-item>\n\n                    <ion-label floating>Email</ion-label>\n\n                    <ion-input type="email" value="{{currentUser.email}}" readonly="true"></ion-input>\n\n                </ion-item>\n\n                <ion-item>\n\n                    <ion-label floating>Phone Number</ion-label>\n\n                    <ion-input type="text" value="+91 {{currentUser.mobileNumber}}" readonly="true"></ion-input>\n\n                </ion-item>\n\n                <!-- <ion-item>\n\n  					<ion-label>Gender</ion-label>\n\n  					<ion-select [(ngModel)]="gender">\n\n    					<ion-option value="f">Female</ion-option>\n\n   					 	<ion-option value="m">Male</ion-option>\n\n 				 	</ion-select>\n\n				</ion-item> -->\n\n                 <!-- <ion-item>\n\n                  <ion-label>Address</ion-label>\n\n                    <ion-textarea type="text" text-left value="" rows="4" cols="50"></ion-textarea>\n\n                </ion-item>  -->\n\n                 <ion-item>\n\n                 <button style="background: #2670c5;color: white;padding: 5px;padding-bottom: 12px;" (click)="changePassword()"><font size="1.5"><b>Change Password..?</b></font></button>\n\n                 </ion-item>\n\n            </ion-list>\n\n        </div>\n\n        \n\n        <div *ngSwitchCase="\'card\'" class="card-section bg-light">\n\n            <ion-card>\n\n                <ion-card-header>\n\n                    ---No Cards Found---\n\n                </ion-card-header>\n\n            </ion-card>\n\n            <!--<ion-card>\n\n               <ion-card-content>\n\n                   <div class="card-row">XXXX XXXX XXXX XXXX<img src="assets/imgs/visa.png"></div>\n\n               </ion-card-content>\n\n           </ion-card>\n\n           <ion-card>\n\n               <ion-card-content>\n\n                   <div class="card-row">XXXX XXXX XXXX XXXX<img src="assets/imgs/master-card.png"></div>\n\n               </ion-card-content>\n\n           </ion-card>\n\n           <ion-card>\n\n               <div class="form" padding-left padding-right>\n\n                   <p padding-bottom margin-bottom>\n\n                       <ion-icon name="ios-add-circle-outline"></ion-icon>ADD NEW CARD <span>Save</span> </p>\n\n                    <ion-list>\n\n                        <ion-item>\n\n                            <ion-label>Card Type</ion-label>\n\n                            <ion-input type="text" text-right value="Visa Express"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item>\n\n                            <ion-label>Card Number</ion-label>\n\n                            <ion-input type="text" text-right value="1234-1234-1234-1234"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item>\n\n                            <ion-label>Name on Card</ion-label>\n\n                            <ion-input type="text" text-right value="Jhon Smith"></ion-input>\n\n                        </ion-item>\n\n                        <div class="date-cvc-row">\n\n                            <div class="date">\n\n                                <ion-item>\n\n                                    <ion-label>Expiry Date</ion-label>\n\n                                    <ion-input type="text" text-right value="10/23"></ion-input>\n\n                                </ion-item>\n\n                            </div>\n\n                            <div class="cvc">\n\n                                <ion-item>\n\n                                    <ion-label>CVV</ion-label>\n\n                                    <ion-input type="text" text-right value="234"></ion-input>\n\n                                </ion-item>\n\n                            </div>\n\n                        </div>\n\n                        <ion-item class="border-none">\n\n                            <ion-label text-right> Save my card details</ion-label>\n\n                            <ion-toggle checked="false"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </div>\n\n            </ion-card>-->\n\n        </div>\n\n\n\n        <div *ngSwitchCase="\'address\'" class="address-section bg-light">\n\n            <ion-card>\n\n                <ion-card-content *ngFor="let address of addressList">\n\n                    <div class="addres-detail">\n\n                        <h3>\n\n                            <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{address.name}}</h3>\n\n                        <p>{{address.address}},{{address.streetAddress}}<br>Land Mark: {{address.landMark}}<br>{{address.pin}}.<br>{{address.state}}<br>{{address.city}}</p>\n\n                    <p>{{address.contNo}}</p>\n\n\n\n                    </div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n            <!-- <ion-card>\n\n                <div class="form" padding-left padding-right>\n\n                    <p padding-bottom margin-bottom>\n\n                        <ion-icon name="ios-add-circle-outline"></ion-icon>ADD NEW CARD <span>Save</span></p>\n\n                    <ion-list>\n\n                        <ion-item>\n\n                            <ion-label>Pincode</ion-label>\n\n                            <ion-input type="text" text-right value="110092"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item>\n\n                            <ion-label>Address</ion-label>\n\n                            <ion-input type="text" text-right value="DE234 Mapleridge Drive Plano,"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item>\n\n                            <ion-label>Phone Number</ion-label>\n\n                            <ion-input type="text" text-right value="+91 908 765 4321"></ion-input>\n\n                        </ion-item>\n\n                        <div class="date-cvc-row">\n\n                            <div class="city">\n\n                                <ion-item>\n\n                                    <ion-label>City</ion-label>\n\n                                    <ion-input type="text" text-right value="Delhi"></ion-input>\n\n                                </ion-item>\n\n                            </div>\n\n                            <div class="State">\n\n                                <ion-item>\n\n                                    <ion-label>State</ion-label>\n\n                                    <ion-input type="text" text-right value="Delhi"></ion-input>\n\n                                </ion-item>\n\n                            </div>\n\n                        </div>\n\n                        <ion-item class="border-none">\n\n                            <ion-label text-right>Make this my default address</ion-label>\n\n                            <ion-toggle checked="true"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </div>\n\n            </ion-card> -->\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\my_account\my_account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], My_accountPage);
    return My_accountPage;
}());

//# sourceMappingURL=my_account.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Myorder_1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_item_rateing_itemrateing__ = __webpack_require__(362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var Myorder_1Page = (function () {
    function Myorder_1Page(navCtrl, modalCtrl, helper, apisProvider) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.helper = helper;
        this.apisProvider = apisProvider;
        this.account = "profile";
        this.myOrderDetails = new Array();
        this.myOrderHistoryDetails = new Array();
        this.myOrderHistoryDetailsForDisplay = new Array();
        this.pagingEnabled = true;
        this.page = 2;
        this.maximumPages = 5;
        this.defaultCardOnLoad = 2;
        this.onload = true;
        this.counter = 0;
        this.isAddReview = false;
        this.loadOrderedDetails();
        this.loadOrderedHistoryDetails();
        this.estimatedDeliveryDate = new Date();
        this.estimatedDeliveryDate.setHours(this.estimatedDeliveryDate.getHours() + 1);
    }
    Myorder_1Page.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    Myorder_1Page.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    Myorder_1Page.prototype.loadOrderedDetails = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/loadOrderedDetails', '')
            .then(function (data) {
            _this.apisProvider.stopSpinner();
            if (data["success"]) {
                _this.myOrderDetails = data["data"];
                _this.helper.logMessage("data", _this.myOrderDetails);
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    Myorder_1Page.prototype.cancelOrder = function (ordersItems) {
        var _this = this;
        this.apisProvider.startSpinner();
        this.helper.logMessage("cancle", ordersItems);
        this.apisProvider.loadData('api/order/cancelOrder', ordersItems)
            .then(function (data) {
            if (data["success"]) {
                _this.apisProvider.stopSpinner();
                _this.loadOrderedDetails();
                _this.myOrderHistoryDetailsForDisplay = data["data"];
                _this.apisProvider.presentToast("Item Cancelled Successfully...");
                _this.helper.logMessage("data", _this.myOrderHistoryDetailsForDisplay);
            }
            else {
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    // loadOrderedHistoryDetails(infiniteScroll?){
    //     if(this.onload){
    //         this.apisProvider.loadData('api/order/loadOrderedHistoryDetails' ,'' )
    //     .then( data => {
    //         if(data["success"]){
    //             this.myOrderHistoryDetails = data["data"];
    //             this.helper.logMessage("data history : ", this.myOrderHistoryDetails);
    //             this.maximumPages = this.myOrderHistoryDetails.length;
    //             if(this.myOrderHistoryDetails.length>0){
    //                 while(this.counter<this.page){
    //                     //infiniteScroll.enable( false );
    //                     this.myOrderHistoryDetailsForDisplay.push(this.myOrderHistoryDetails.pop());
    //                     this.counter++;
    //                 }
    //             }
    //             this.helper.logMessage("data history : ", this.myOrderHistoryDetailsForDisplay);
    //             this.onload=false;
    //         }
    //     });
    //     }
    //     else{
    //         this.helper.logMessage("history Display:",this.myOrderHistoryDetailsForDisplay);
    //         this.helper.logMessage("data history : ", this.myOrderHistoryDetails);
    //         while(this.counter<this.page){
    //             infiniteScroll.enable( false );
    //             if(this.myOrderHistoryDetails.length!=0){
    //                 this.myOrderHistoryDetailsForDisplay.push(this.myOrderHistoryDetails.pop());
    //             }
    //             this.counter++;
    //         }
    //     }
    // }
    // doInfinite( infiniteScroll ) {
    //     setTimeout(() => {
    //         this.page++;
    //         this.loadOrderedHistoryDetails( infiniteScroll );
    //         if ( this.page === this.maximumPages ) {
    //             infiniteScroll.enable( false );
    //         }
    //         infiniteScroll.complete();
    //     }, 500 );
    // }
    Myorder_1Page.prototype.loadOrderedHistoryDetails = function () {
        var _this = this;
        this.apisProvider.loadData('api/order/loadOrderedHistoryDetails', '')
            .then(function (data) {
            if (data["success"]) {
                _this.myOrderHistoryDetailsForDisplay = data["data"];
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    Myorder_1Page.prototype.doRefresh = function (refresher) {
        this.loadOrderedDetails();
        this.loadOrderedHistoryDetails();
        refresher.complete();
    };
    Myorder_1Page.prototype.reating = function (ordersItems) {
        var _this = this;
        this.helper.logMessage("data", ordersItems.id);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_item_rateing_itemrateing__["a" /* ItemRateingPage */], {
            'data': ordersItems.id
        });
        modal.onDidDismiss(function (data) {
            _this.loadOrderedDetails();
            _this.loadOrderedHistoryDetails();
        });
        modal.present();
    };
    Myorder_1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-myorder_1 ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\myorder_1\myorder_1.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n   <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>My Order\n\n            <div class="icon-box">\n\n                <!-- <img src="assets/imgs/search.png" (click)="searchPage()"> -->\n\n                <!-- <img src="assets/imgs/ic_my_cart.png" (click)="cartPage()"> -->\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar no-border-top class="tab-bar">\n\n        <ion-segment [(ngModel)]="account">\n\n            <ion-segment-button value="profile">\n\n                Pending\n\n            </ion-segment-button>\n\n            <ion-segment-button value="card">\n\n                Delivered Orders\n\n            </ion-segment-button>\n\n            <ion-segment-button value="cancelOrder">\n\n                Cancel Orders\n\n            </ion-segment-button>\n\n        </ion-segment>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light" >\n\n     <ion-refresher (ionRefresh)="doRefresh($event)">\n\n                <ion-refresher-content\n\n                  pullingIcon="arrow-dropdown"\n\n                  pullingText="Pull to refresh"\n\n                  refreshingSpinner="circles"\n\n                  refreshingText="Refreshing...">\n\n                </ion-refresher-content>\n\n              </ion-refresher>\n\n    <div [ngSwitch]="account">\n\n     <div *ngSwitchCase="\'profile\'" class="profile-section">\n\n      		<ion-card *ngIf="myOrderDetails.length==0" padding>\n\n     			<h3 style="text-align:center;">No Pending Items</h3>\n\n     		</ion-card>\n\n     	<div *ngFor="let orders of myOrderDetails">\n\n    		<div *ngFor="let ordersItems of orders.orderItemsData">\n\n            <ion-card class="border-bottom-none border" style="position: relative;" >\n\n                <ion-card-header>\n\n                    <p class="left-side">\n\n                        <span class="text-light">Ordered ID:</span> {{orders.id}}\n\n                        <br>\n\n                        <span class="text-light">Placed on</span> {{orders.orderedTime | date:\'short\'}}\n\n                        <br>\n\n                       <!--  <span class="text-light">Total Amount Paid:</span> {{orders.totalPrice}} -->\n\n                    </p>\n\n                    <div *ngIf="ordersItems.itemStatus != \'Out For Delivery\'">\n\n                   <button class="right-side" style="background: #f23e3e;color: white;padding: 5px;margin-top: 10px;" (click)="cancelOrder(ordersItems)">\n\n                        <font size="1"><b>Cancel Order</b></font>\n\n                    </button>\n\n                    </div>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                <div >\n\n                    <ion-row >\n\n                        <ion-col col-7>\n\n                            <h4>{{ordersItems.categoryItemName}}\n\n                            </h4>\n\n                            <small><span class="text-light">Quantity:</span>{{ordersItems.itemQuantity}} {{ordersItems.unitofMesure}}</small>\n\n                            <p>\n\n                               {{ordersItems.totalPrice| currency:"₹":0 }}\n\n                                <small class="text-light">via {{orders.paymentType}}</small>\n\n                            </p>\n\n                            <small><span class="text-light">Tracking Status on</span><br> {{orders.orderedTime | date:\'short\'}}</small>\n\n                            <small><span>Expected delivery  by <strong>{{estimatedDeliveryDate | date: \'d MMMM, EEEE, h:mm a\'}}</strong></span></small>\n\n                        </ion-col>\n\n                        <ion-col col-5>\n\n                            <div class="img-box">\n\n                                <img src="data:image/png;base64,{{ordersItems.base64Image}}" style="height: 100px;">\n\n                            </div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    </div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n<br>\n\n            <div class="order-info border-top-none border">\n\n                <div class="order-container">\n\n                    <div class="status active">\n\n                        <p padding-left padding-right>Order<br>Placed</p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">{{orders.orderedTime | date:\'short\'}}</p>\n\n                    </div>\n\n                    <div class="status" [ngClass]="{\'active\': ordersItems.itemStatus == \'Item Shipped\' || ordersItems.itemStatus == \'Out For Delivery\' || ordersItems.itemStatus == \'Item Delivered\' }">\n\n                        <p>\n\n                            Item<br>Shipped\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555"><span *ngIf="ordersItems.itemStatus == \'Item Shipped\' || ordersItems.itemStatus == \'Out For Delivery\' || ordersItems.itemStatus == \'Item Delivered\'">{{ordersItems.lastUpdateTime | date:\'short\'}}</span></p>\n\n                    </div>\n\n                    <div class="status" [ngClass]="{\'active\': ordersItems.itemStatus == \'Out For Delivery\' || ordersItems.itemStatus == \'Item Delivered\' }">\n\n                        <p>\n\n                            Out for<br>Delivery\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p><span *ngIf=" ordersItems.itemStatus == \'Out For Delivery\' || ordersItems.itemStatus == \'Item Delivered\'">{{ordersItems.lastUpdateTime | date:\'short\'}}</span></p>\n\n                    </div>\n\n                    <div class="status" [ngClass]="{\'active\': ordersItems.itemStatus == \'Item Delivered\' }">\n\n                        <p>\n\n                            Item<br>Delivered\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555"><span *ngIf="ordersItems.itemStatus == \'Item Delivered\'">{{ordersItems.lastUpdateTime | date:\'short\'}}</span></p>\n\n                    </div>\n\n                    \n\n                </div>\n\n            </div>\n\n            </div>\n\n        </div>\n\n        <!-- <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n                <ion-infinite-scroll-content *ngIf="pagingEnabled"></ion-infinite-scroll-content>\n\n            </ion-infinite-scroll> -->\n\n        </div>\n\n       \n\n        <div *ngSwitchCase="\'card\'" class="card-section bg-light">\n\n        		<ion-card *ngIf="myOrderHistoryDetailsForDisplay.length==0" padding>\n\n     				<h3 style="text-align:center;">No Delivered Items</h3>\n\n     			</ion-card>\n\n                <div *ngFor="let orders of myOrderHistoryDetailsForDisplay">\n\n                    <div *ngFor="let ordersItems of orders.deliveredItems;let in = index;">\n\n                        <ion-card class="border-bottom-none border" style="position: relative;">\n\n                            <ion-card-header>\n\n                                <p class="left-side">\n\n                                    <span class="text-light">Ordered ID:</span> {{orders.id}}\n\n                                    <br>\n\n                                    <span class="text-light">Placed on</span> {{orders.orderedTime | date:\'short\'}}\n\n                                    <br>\n\n                                    <!--  <span class="text-light">Total Amount Paid:</span> {{orders.totalPrice}} -->\n\n                                </p>\n\n                                <p class="right-side text-sky">\n\n                                    {{ordersItems.itemStatus}}\n\n                                </p>\n\n                            </ion-card-header>\n\n                            <ion-card-content>\n\n                                <div>\n\n                                    <ion-row>\n\n                                        <ion-col col-7>\n\n                                            <h4>{{ordersItems.categoryItemName}}\n\n                                            </h4>\n\n                                            <small><span class="text-light">Quantity:</span>{{ordersItems.itemQuantity}} {{ordersItems.unitofMesure}}</small>\n\n                                            <p>\n\n                                                {{ordersItems.totalPrice| currency:"₹":0 }}\n\n                                                <small class="text-light">via {{orders.paymentType}}</small>\n\n                                            </p>\n\n                                            <small><span class="text-light">Tracking Status on</span> {{orders.orderedTime | date:\'short\'}}</small>\n\n                                            <!-- <button ion-button full class="bg-green btn-round  btn-text">Reached Hub,New Delhi</button> -->\n\n                                        </ion-col>\n\n                                        <ion-col col-5>\n\n                                            <div class="img-box">\n\n                                                <img src="data:image/png;base64,{{ordersItems.base64Image}}" style="height: 100px;">\n\n                                            </div>\n\n                                        </ion-col>\n\n                                       <hr>\n\n                                       <ion-col col-7>\n\n                                        <div *ngIf="ordersItems.itemStatus == \'Item Delivered\' && ordersItems.rating == 0">\n\n                                       \n\n                                        <button ion-button full class="bg-thime btn-round  btn-text" (click)="reating(ordersItems)">Rate Now<ion-icon name="ios-arrow-forward"></ion-icon></button>\n\n                                        </div>\n\n                                       </ion-col>\n\n                                       \n\n                                    </ion-row>\n\n                                </div>\n\n                            </ion-card-content>\n\n                        </ion-card>\n\n    \n\n                        <br>\n\n                        <!-- <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n                            <ion-infinite-scroll-content *ngIf="pagingEnabled"></ion-infinite-scroll-content>\n\n                        </ion-infinite-scroll> -->\n\n                    </div>\n\n                    \n\n                </div>\n\n                \n\n            </div>\n\n            <div *ngSwitchCase="\'cancelOrder\'" class="card-section bg-light">\n\n                <div *ngFor="let orders of myOrderHistoryDetailsForDisplay">\n\n                    <div *ngFor="let ordersItems of orders.cancelledItems;let in = index;">\n\n                        <ion-card class="border-bottom-none border" style="position: relative;">\n\n                            <ion-card-header>\n\n                                <p class="left-side">\n\n                                    <span class="text-light">Ordered ID:</span> {{orders.id}}\n\n                                    <br>\n\n                                    <span class="text-light">Placed on</span> {{orders.orderedTime | date:\'short\'}}\n\n                                    <br>\n\n                                    <!--  <span class="text-light">Total Amount Paid:</span> {{orders.totalPrice}} -->\n\n                                </p>\n\n                                <p class="right-side text-sky">\n\n                                    {{ordersItems.itemStatus}}\n\n                                </p>\n\n                            </ion-card-header>\n\n                            <ion-card-content>\n\n                                <div>\n\n                                    <ion-row>\n\n                                        <ion-col col-7>\n\n                                            <h4>{{ordersItems.categoryItemName}}\n\n                                            </h4>\n\n                                            <small><span class="text-light">Quantity:</span>{{ordersItems.itemQuantity}} {{ordersItems.unitofMesure}}</small>\n\n                                            <p>\n\n                                                {{ordersItems.totalPrice| currency:"₹":0 }}\n\n                                                <small class="text-light">via {{orders.paymentType}}</small>\n\n                                            </p>\n\n                                            <small><span class="text-light">Tracking Status on</span> {{orders.orderedTime | date:\'short\'}}</small>\n\n                                            <!-- <button ion-button full class="bg-green btn-round  btn-text">Reached Hub,New Delhi</button> -->\n\n                                        </ion-col>\n\n                                        <ion-col col-5>\n\n                                            <div class="img-box">\n\n                                                <img src="data:image/png;base64,{{ordersItems.base64Image}}" style="height: 100px;">\n\n                                            </div>\n\n                                        </ion-col>\n\n                                       <hr>\n\n                                       <ion-col col-7>\n\n                                        <div *ngIf="ordersItems.itemStatus == \'Item Delivered\' && ordersItems.rating == 0">\n\n                                       \n\n                                        <button ion-button full class="bg-thime btn-round  btn-text" (click)="reating(ordersItems)">Rate Now<ion-icon name="ios-arrow-forward"></ion-icon></button>\n\n                                        </div>\n\n                                       </ion-col>\n\n                                       \n\n                                    </ion-row>\n\n                                </div>\n\n                            </ion-card-content>\n\n                        </ion-card>\n\n    \n\n                        <br>\n\n                        <!-- <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n                            <ion-infinite-scroll-content *ngIf="pagingEnabled"></ion-infinite-scroll-content>\n\n                        </ion-infinite-scroll> -->\n\n                    </div>\n\n                    \n\n                </div>\n\n                \n\n            </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\myorder_1\myorder_1.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_4__providers_apis_apis__["a" /* ApisProvider */]])
    ], Myorder_1Page);
    return Myorder_1Page;
}());

//# sourceMappingURL=myorder_1.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemRateingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ItemRateingPage = (function () {
    function ItemRateingPage(navParms, navCtrl, viewCtrl, apisProvider, helper, _fb) {
        this.navParms = navParms;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this._fb = _fb;
        this.userItemsData = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["h" /* UserCart */]();
        this.userItemsData.id = this.navParms.get("data");
    }
    ItemRateingPage.prototype.onModelChange = function ($event) {
        this.isAddReview = true;
    };
    ItemRateingPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss("notSaved");
    };
    ItemRateingPage.prototype.saveReviews = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.userItemsData.rating = this.rate;
        this.userItemsData.reviewComments = this.comments;
        this.helper.logMessage("data", this.userItemsData);
        this.apisProvider.loadData('api/order/saveRating', this.userItemsData)
            .then(function (data) {
            if (data["success"]) {
                _this.apisProvider.presentToast("Thanks For Giving The Rating");
                _this.dismiss();
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
        this.apisProvider.stopSpinner();
    };
    ItemRateingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-itemrateing',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\item-rateing\itemrateing.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Rate\n\n            <span float-right> \n\n                  <ion-icon name="md-close" class="close-icon" (click)="dismiss()"></ion-icon>          \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n        \n\n    <ion-col col-9> \n\n        <ion-item>\n\n        <b>Please rate the item!</b>\n\n        <p>\n\n        <small class="text-light">Your rating will imapct the store\'s overall rating <br>and will help others make better choices.</small>\n\n        </p>\n\n         <rating [(ngModel)]="rate"\n\n         readOnly="false" max="5" \n\n         emptyStarIconName="star-outline"\n\n         halfStarIconName="star-half"\n\n         starIconName="star" \n\n         nullable="false"\n\n         (ngModelChange)="onModelChange($event)">\n\n         </rating>\n\n         </ion-item>\n\n         \n\n       <div *ngIf="isAddReview">\n\n            <ion-col col-8>\n\n            <ion-item>\n\n                <ion-input type="text" class="review" [(ngModel)]="comments" placeholder="comments" maxlength=200></ion-input>\n\n               </ion-item>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n            <button ion-button calss="btn1" color="primary" (click)="saveReviews()">Submit</button>\n\n            </ion-col>\n\n         </div>  \n\n        </ion-col> \n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\item-rateing\itemrateing.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["a" /* FormBuilder */]])
    ], ItemRateingPage);
    return ItemRateingPage;
}());

//# sourceMappingURL=itemrateing.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HelpPage = (function () {
    function HelpPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
    }
    HelpPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    HelpPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-help ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\help\help.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n     <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Help Center\n\n            <span float-right>               \n\n              <ion-icon name="ios-cart-outline" class="icon" (click)="cartPage()"></ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-searchbar (ionInput)="getItems($event)" (click)="searchPage()"></ion-searchbar>\n\n    <ion-list>\n\n        <ion-item *ngFor="let item of items">\n\n            {{ item }}\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <h6 padding-left>Top FAQ</h6>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Order tracking and Delivery\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Refund\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Cancellation of orders\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Seller Support\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Payments\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\help\help.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReviewPage = (function () {
    function ReviewPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-review ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\review\review.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n     <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Add Review</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-card>\n\n        <ion-card-header style="padding-bottom: 0;">\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>Unique For Men Black Formal Slim Fit Shirt</h4>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n\n\n        <ion-card-content>\n\n            <div class="form">\n\n                <ion-list>\n\n                    <ion-item class="write-reveiw">\n\n                        <ion-textarea type="text" placeholder="Write your Review"></ion-textarea>\n\n                    </ion-item>\n\n                    <ion-item>\n\n                        <ion-input type="text" placeholder="Heading four your review"></ion-input>\n\n                    </ion-item>\n\n                </ion-list>\n\n            </div>\n\n            <button ion-button full class="bg-green btn-round btn-text">SUBMIT NOW</button>\n\n        </ion-card-content>\n\n    </ion-card>\n\n    <h5>Previous orders</h5>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/bag.jpg">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>Skybags Leo 26 ltrs Red Casual Backpack</h4>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n    </ion-card>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/wach.jpg">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>Skmei Analog-Digital Multicolor Dil Men\'s Watch</h4>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\review\review.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { RequestPage } from '../request/request';
var LocationPage = (function () {
    function LocationPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    LocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-location',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\location\location.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n     <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Select Locaton</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <img src="assets/imgs/map.jpg" class="map">\n\n    <div class="search-bar">\n\n        <ion-searchbar (ionInput)="getItems($event)" placeholder="Search Locaton"></ion-searchbar>\n\n        <ion-icon name="md-locate" class="location_icon"></ion-icon>\n\n    </div>\n\n    <div class="btn-fix-bottom">\n\n        <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="homePage()">Continue</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\location\location.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], LocationPage);
    return LocationPage;
}());

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyStoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_category_add_category__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__add_items_add_items__ = __webpack_require__(368);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyStoresPage = (function () {
    function MyStoresPage(modalCtrl, navCtrl, apisProvider, helper, _fb) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this._fb = _fb;
        this.addStoreFlag = false;
        this.addCategoryFlag = false;
        this.addItemFlag = false;
        this.stores = [];
        this.storeDeleteFlag = false;
        this.selectedStoreData = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["e" /* MrGreenStores */]();
        this.categories = new Array();
        this.items = new Array();
        this.storeImages = new Array();
        this.isImage = false;
        this.isImageSize = false;
        this.store = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["e" /* MrGreenStores */]();
        this.validation_messages = {
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
            'storeImages': [
                { type: 'required', message: 'Atleast one image required.' },
            ],
        };
    }
    MyStoresPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.getCurrentUser().then(function (data) {
            _this.currentUser = data;
            _this.apisProvider.loadData("api/stores/loadAllStores", data["id"]).then(function (data) {
                _this.stores = data;
                _this.helper.logMessage("Stores==>", _this.stores);
                _this.addStore();
            });
            _this.apisProvider.stopSpinner();
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    MyStoresPage.prototype.addStore = function () {
        this.store.storeImages = [];
        this.isImageSize = false;
        this.addStoreFlag = true;
        this.addCategoryFlag = false;
        this.addItemFlag = false;
        this.onStoreForm = this._fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(39),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(5),
                ])],
            email: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])],
            phoneNumber: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].pattern('^(0|[1-9][0-9]*)$'),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(10),
                ])],
            location: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(39),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(5)
                ])],
            storeImages: [],
        });
    };
    MyStoresPage.prototype.saveStoreData = function () {
        var _this = this;
        this.store.deleteFlag = this.storeDeleteFlag ? 'Y' : 'N';
        this.store.storeAdminId = this.selectedStoreData.storeAdminId;
        this.store.storeEmail = this.onStoreForm.get("email").value;
        this.store.storeLocation = this.onStoreForm.get("location").value;
        this.store.storeName = this.onStoreForm.get("name").value;
        this.store.storePhoneNumber = this.onStoreForm.get("phoneNumber").value;
        this.store.userId = this.currentUser.id;
        this.store.id = this.selectedStoreData.id;
        if (this.storeImages.length > 0)
            this.store.storeImages = this.store.storeImages.concat(this.storeImages);
        if (this.store.storeImages.length == 0) {
            this.isImage = false;
            return;
        }
        else
            this.isImage = true;
        if (this.store.storeImages.length > 4) {
            this.isImageSize = true;
            return;
        }
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/addStore', this.store)
            .then(function (data) {
            if (data["success"]) {
                _this.addStoreFlag = false;
                _this.storeImages = [];
                _this.stores = data["storesList"];
                _this.onStoreChange(_this.selectedStore);
                _this.apisProvider.openErrorAlert("Success!", "Wow!, Operation Completed successfully");
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", data["message"]);
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    MyStoresPage.prototype.populateStoreFormData = function () {
        this.store.deleteFlag = this.storeDeleteFlag ? 'Y' : 'N';
        this.store.storeAdminId = this.selectedStoreData.storeAdminId;
        this.store.storeEmail = this.onStoreForm.get("email").value;
        this.store.storeLocation = this.onStoreForm.get("location").value;
        this.store.storeName = this.onStoreForm.get("name").value;
        this.store.storePhoneNumber = this.onStoreForm.get("phoneNumber").value;
        this.store.userId = this.currentUser.id;
        this.store.id = this.selectedStoreData.id;
        return this.store;
    };
    MyStoresPage.prototype.onStoreChange = function (value) {
        this.store.storeImages = [];
        this.selectedStore = value;
        if (this.stores.length == 0) {
            this.selectedStoreData = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["e" /* MrGreenStores */]();
            this.storeDeleteFlag = (false);
            this.onStoreForm.controls["email"].setValue('');
            this.onStoreForm.controls["location"].setValue('');
            this.onStoreForm.controls["name"].setValue('');
            this.onStoreForm.controls["phoneNumber"].setValue('');
        }
        for (var i = 0; i < this.stores.length; i++) {
            var obj = this.stores[i];
            if (this.selectedStore == obj["id"]) {
                this.selectedStoreData = obj;
                this.storeDeleteFlag = (obj["deleteFlag"] == 'Y');
                this.onStoreForm.controls["email"].setValue(obj["storeEmail"]);
                this.onStoreForm.controls["location"].setValue(obj["storeLocation"]);
                this.onStoreForm.controls["name"].setValue(obj["storeName"]);
                this.onStoreForm.controls["phoneNumber"].setValue(obj["storePhoneNumber"]);
                this.store.storeImages = obj["storeImages"];
                if (this.store.storeImages.length == 0)
                    this.isImage = false;
                else
                    this.isImage = true;
                break;
            }
            else {
                this.selectedStoreData = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["e" /* MrGreenStores */]();
                this.storeDeleteFlag = (false);
                this.onStoreForm.controls["email"].setValue('');
                this.onStoreForm.controls["location"].setValue('');
                this.onStoreForm.controls["name"].setValue('');
                this.onStoreForm.controls["phoneNumber"].setValue('');
                if (this.store.storeImages.length == 0)
                    this.isImage = false;
                else
                    this.isImage = true;
            }
        }
    };
    MyStoresPage.prototype.onCategoryStoreChange = function (value) {
        var _this = this;
        this.storeIdForCategory = value;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/loadAllCategoriesForStore', this.storeIdForCategory)
            .then(function (data) {
            if (data["success"]) {
                _this.categories = data["categoriesList"];
                _this.helper.logMessage("categoris==>", _this.categories);
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Not able to fetch the details, please contact admin");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    MyStoresPage.prototype.onItemStoreChange = function (value) {
        var _this = this;
        this.storeIdForItems = value;
        this.categoryIdForItems = undefined;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/loadAllCategoriesForStore', this.storeIdForItems)
            .then(function (data) {
            if (data["success"]) {
                _this.categories = data["categoriesList"];
                _this.helper.logMessage("categoris==>", _this.categories);
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Not able to fetch the details, please contact admin");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    MyStoresPage.prototype.onItemCategoryChange = function (value) {
        var _this = this;
        this.categoryIdForItems = value;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/loadAllItemsForStore1', { "storeId": this.storeIdForItems, "categoryId": this.categoryIdForItems })
            .then(function (data) {
            if (data["success"]) {
                _this.items = data["itemsList"];
                _this.helper.logMessage("itemsList==>", _this.items);
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Not able to fetch the details, please contact admin");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    MyStoresPage.prototype.addCategory = function () {
        this.addStoreFlag = false;
        this.addCategoryFlag = true;
        this.addItemFlag = false;
        this.categories.length = 0;
        this.storeIdForCategory = undefined;
    };
    MyStoresPage.prototype.addItem = function () {
        this.addStoreFlag = false;
        this.addCategoryFlag = false;
        this.addItemFlag = true;
        this.items.length = 0;
        this.storeIdForItems = undefined;
    };
    MyStoresPage.prototype.openNewCategoryPopup = function () {
        var _this = this;
        var categoryData = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["g" /* StoreCategories */]();
        categoryData.storeId = this.storeIdForCategory;
        categoryData.categoryName = '';
        categoryData.categoryDescription = '';
        categoryData.id = 0;
        categoryData.deleteFlag = 'N';
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__add_category_add_category__["a" /* AddCategoryPage */], { "categoryData": categoryData });
        categoryModal.onDidDismiss(function (data) {
            _this.onCategoryStoreChange(_this.storeIdForCategory);
        });
        categoryModal.present();
    };
    MyStoresPage.prototype.openCategoryPopup = function (categoryData) {
        var _this = this;
        categoryData.storeId = this.storeIdForCategory;
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__add_category_add_category__["a" /* AddCategoryPage */], { "categoryData": categoryData });
        categoryModal.onDidDismiss(function (data) {
            _this.onCategoryStoreChange(_this.storeIdForCategory);
        });
        categoryModal.present();
    };
    MyStoresPage.prototype.openNewItemPopup = function () {
        var _this = this;
        var itemData = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["a" /* CategoryItems */]();
        itemData.storeId = this.storeIdForItems;
        itemData.categoryId = this.categoryIdForItems;
        itemData.itemDescription = '';
        itemData.itemName = '';
        itemData.id = 0;
        itemData.deleteFlag = 'N';
        itemData.itemPrice = 0.0;
        itemData.itemQuantity = 0;
        itemData.unitofMesure = '';
        var itemModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__add_items_add_items__["a" /* AddItemsPage */], { "itemData": itemData });
        itemModal.onDidDismiss(function (data) {
            _this.onItemCategoryChange(_this.categoryIdForItems);
        });
        itemModal.present();
    };
    MyStoresPage.prototype.openItemPopup = function (itemData) {
        var _this = this;
        itemData.storeId = this.storeIdForItems;
        itemData.categoryId = this.categoryIdForItems;
        var itemModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__add_items_add_items__["a" /* AddItemsPage */], { "itemData": itemData });
        itemModal.onDidDismiss(function (data) {
            _this.onItemCategoryChange(_this.categoryIdForItems);
        });
        itemModal.present();
    };
    MyStoresPage.prototype.onFileChangeLargeImage = function (event) {
        this.isImage = true;
        this.storeImages = this.helper.extractImagesFormEvent(event);
    };
    MyStoresPage.prototype.deleteImage = function (index) {
        this.storeImages = [];
        this.store.storeImages.splice(index, 1);
    };
    MyStoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-my-stores ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\my-stores\my-stores.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>\n\n            My Stores\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n        <div>\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <button ion-button icon-start block color="secondary" style="font-size: 10px; height:30px; border-radius: 5px; "  (click)="addStore()">\n\n                                <ion-icon ios="ios-home" md="md-home"></ion-icon> Stores\n\n                        </button>\n\n                    </ion-col >\n\n                    <ion-col col-5>\n\n                        <button ion-button icon-start block color="secondary" style="font-size: 10px; height:30px; border-radius: 5px;" (click)="addCategory()">\n\n                                <ion-icon ios="ios-basket" md="md-basket"></ion-icon> Categories\n\n                        </button>\n\n                    </ion-col >\n\n                    <ion-col col-3>\n\n                        <button ion-button icon-start block color="secondary" style="font-size: 10px; height:30px; border-radius: 5px;" (click)="addItem()">\n\n                                <ion-icon ios="ios-cart" md="md-cart"></ion-icon> Items\n\n                        </button>\n\n                    </ion-col>\n\n                </ion-row>\n\n        </div><br>\n\n        <ion-item *ngIf="addStoreFlag">\n\n                <ion-label>Select Store</ion-label>\n\n                <ion-select #C (ionChange)="onStoreChange(C.value)" >\n\n                    <ion-option [value]="0">--Select--</ion-option>\n\n                    <ion-option *ngFor="let store of stores" [value]="store.id">{{store.storeName}}</ion-option>\n\n                </ion-select>\n\n        </ion-item>\n\n        <div [formGroup]="onStoreForm" *ngIf="addStoreFlag" class="form" padding-left padding-right>\n\n            <ion-list>\n\n                    <ion-item>\n\n                        <ion-input placeholder="Store Name" formControlName="name" type="text" text-left value=""></ion-input>\n\n                    </ion-item>\n\n                    <ng-container *ngFor="let validation of validation_messages.name" >\n\n                            <div class="error-message" *ngIf="onStoreForm.get(\'name\').hasError(validation.type) && (onStoreForm.get(\'name\').dirty || onStoreForm.get(\'name\').touched)">\n\n                        {{ validation.message }}\n\n                            </div>\n\n                    </ng-container>\n\n                    <ion-item>\n\n                        <ion-input placeholder="Store Contact Email" type="email" formControlName="email" text-left value=""></ion-input>\n\n                    </ion-item>\n\n                    <ng-container *ngFor="let validation of validation_messages.email" >\n\n                            <div class="error-message" *ngIf="onStoreForm.get(\'email\').hasError(validation.type) && (onStoreForm.get(\'email\').dirty || onStoreForm.get(\'email\').touched)">\n\n                        {{ validation.message }}\n\n                            </div>\n\n                    </ng-container>\n\n                    <ion-item>\n\n                        <ion-input placeholder="Store Phone Number" type="text" formControlName="phoneNumber" text-left value=""></ion-input>\n\n                    </ion-item>\n\n                    <ng-container *ngFor="let validation of validation_messages.phoneNumber" >\n\n                            <div class="error-message" *ngIf="onStoreForm.get(\'phoneNumber\').hasError(validation.type) && (onStoreForm.get(\'phoneNumber\').dirty || onStoreForm.get(\'phoneNumber\').touched)">\n\n                        {{ validation.message }}\n\n                            </div>\n\n                    </ng-container>\n\n                    <ion-item>\n\n                        <ion-input placeholder="Store Location" formControlName="location" type="text" text-left value=""></ion-input>\n\n                    </ion-item>\n\n                    <ng-container *ngFor="let validation of validation_messages.location" >\n\n                                <div class="error-message" *ngIf="onStoreForm.get(\'location\').hasError(validation.type) && (onStoreForm.get(\'location\').dirty || onStoreForm.get(\'location\').touched)">\n\n                            {{ validation.message }}\n\n                                </div>\n\n                    </ng-container>\n\n                    <ion-item>\n\n                        <ion-label color="primary" stacked>Select image</ion-label>\n\n                        <ion-input type="file" formControlName="storeImages" accept="image/*"  (change)="onFileChangeLargeImage($event)" multiple ></ion-input>\n\n                   </ion-item>\n\n                    <div *ngIf="!isImage" class="error-message" >\n\n		                Atleast one image required.\n\n		             </div>\n\n                    	<ion-row *ngIf="store!=undefined">\n\n                    		 <ion-col col-3 *ngFor="let storeImage of store.storeImages;let idx = index">\n\n                    		 	<div class="container">\n\n								  <img src="data:image/png;base64,{{storeImage}}" alt="Snow" height="37px" width="64px">\n\n								  <button style="background: #ef0f0f;color: white;" (click)="deleteImage(idx)" class="btn">Remove</button>\n\n								</div>\n\n                    		 </ion-col>\n\n                    	</ion-row>\n\n                    	<div *ngIf="isImageSize" class="error-message" >\n\n			                The Maximum images should be 4 only.\n\n			             </div>\n\n            </ion-list>\n\n        </div>\n\n        <ion-list *ngIf="addStoreFlag">\n\n         <ion-item>\n\n            <ion-label>Delete Flag</ion-label>\n\n            <ion-checkbox [(ngModel)]="storeDeleteFlag"></ion-checkbox>\n\n        </ion-item>\n\n        </ion-list>\n\n        <button *ngIf="addStoreFlag" ion-button full class="bg-thime btn-round btn-text" (click)="saveStoreData()" [disabled]="!onStoreForm.valid || !isImage">Continue</button>\n\n        <ion-item *ngIf="addCategoryFlag">\n\n                <ion-label>Select Store</ion-label>\n\n                <ion-select #C (ionChange)="onCategoryStoreChange(C.value)" >\n\n                    <ion-option *ngFor="let store of stores" [value]="store.id">{{store.storeName}}</ion-option>\n\n                </ion-select>\n\n        </ion-item>\n\n        <button *ngIf="addCategoryFlag && !helper.isEmpty(storeIdForCategory)" ion-button icon-start block color="secondary" style="font-size: 10px; height:30px; border-radius: 10px; "  (click)="openNewCategoryPopup()">\n\n                <ion-icon ios="ios-add" md="md-add"></ion-icon> Add New Category\n\n        </button>\n\n        <ion-content *ngIf="addCategoryFlag && categories.length >0">\n\n                <div class="bg-white">\n\n                        <ion-row>\n\n                            <ion-col col-4 (click)="openCategoryPopup(category)" *ngFor="let category of categories">\n\n                                <div class="item-box">\n\n                                    <img class="img-circle" src="data:image/png;base64,{{category.categoryImages[0]}}">\n\n                                    <p [innerHTML]="category.categoryName"></p>\n\n                                </div>\n\n                            </ion-col>\n\n                        </ion-row>\n\n                    </div>\n\n            <!--<ion-card *ngFor="let category of categories">\n\n                    <ion-card-header>\n\n                        {{category.categoryName}}\n\n                        <ion-icon name="ios-arrow-forward-outline" (click)="openCategoryPopup(category)" float-right></ion-icon>\n\n                    </ion-card-header>\n\n                    <ion-card-content class="text-light">\n\n                       {{category.categoryDescription}}\n\n                    </ion-card-content>\n\n                </ion-card> -->\n\n        </ion-content>\n\n        <ion-content *ngIf="addCategoryFlag && categories.length == 0 && !helper.isEmpty(storeIdForCategory)">\n\n                <ion-card>\n\n                        <ion-card-header>\n\n                            ---No Categories Found---\n\n                        </ion-card-header>\n\n                    </ion-card>\n\n        </ion-content>\n\n        <ion-item *ngIf="addItemFlag">\n\n                <ion-label>Select Store</ion-label>\n\n                <ion-select #C (ionChange)="onItemStoreChange(C.value)" >\n\n                    <ion-option *ngFor="let store of stores" [value]="store.id">{{store.storeName}}</ion-option>\n\n                </ion-select>\n\n        </ion-item>\n\n        <ion-item *ngIf="addItemFlag && !helper.isEmpty(storeIdForItems)">\n\n                <ion-label>Select Category</ion-label>\n\n                <ion-select #C (ionChange)="onItemCategoryChange(C.value)" >\n\n                    <ion-option *ngFor="let category of categories" [value]="category.id">{{category.categoryName}}</ion-option>\n\n                </ion-select>\n\n        </ion-item>\n\n        <button *ngIf="addItemFlag && !helper.isEmpty(storeIdForItems) && !helper.isEmpty(categoryIdForItems)" ion-button icon-start block color="secondary" style="font-size: 10px; height:30px; border-radius: 10px; "  (click)="openNewItemPopup()">\n\n                <ion-icon ios="ios-add" md="md-add"></ion-icon> Add New Item\n\n        </button>\n\n        <ion-content *ngIf="addItemFlag && items.length >0">\n\n          <ion-row>\n\n            <ion-col col-6 *ngFor="let item of items">\n\n                <ion-card (click)="openItemPopup(item)">\n\n                        <ion-card-header style="white-space: inherit;">\n\n                            <h5 style="font-size: 1.2rem;" [innerHTML]="item.itemName"></h5>\n\n                            <!-- <small class="text-light" [innerHTML]="item.itemDescription"></small> -->\n\n                            <div >\n\n                                <img class="img-circle" src="data:image/png;base64,{{item.itemsImages[0]}}">\n\n                            </div>\n\n                        </ion-card-header>\n\n                        <ion-card-content>\n\n                            <p><span [innerHTML]="item.itemPrice"></span><i class="fa fa-rupee"></i> <small>per {{item.itemQuantity}} kg</small>\n\n                            </p>\n\n                        </ion-card-content>\n\n                </ion-card>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-content>\n\n        <ion-content *ngIf="addItemFlag && items.length == 0 && !helper.isEmpty(categoryIdForItems) && !helper.isEmpty(storeIdForItems)">\n\n                <ion-card>\n\n                        <ion-card-header>\n\n                            ---No Items Found---\n\n                        </ion-card-header>\n\n                    </ion-card>\n\n        </ion-content>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\my-stores\my-stores.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["a" /* FormBuilder */]])
    ], MyStoresPage);
    return MyStoresPage;
}());

//# sourceMappingURL=my-stores.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddCategoryPage = (function () {
    function AddCategoryPage(viewCtrl, params, events, navCtrl, apisProvider, helper, _fb) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.events = events;
        this.navCtrl = navCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this._fb = _fb;
        this.selectedStoreCategory = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["g" /* StoreCategories */]();
        this.categoryDeleteFlag = false;
        this.categoryImages = new Array();
        this.isImage = false;
        this.isImageSize = false;
        this.validation_messages = {
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
            'categoryImages': [
                { type: 'required', message: 'Atleast one image required.' },
            ],
        };
        this.selectedStoreCategory = this.params.get("categoryData");
        this.onCategoryForm = this._fb.group({
            description: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([])],
            name: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(39),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            categoryImages: []
        });
        var that = this;
        setTimeout(function () {
            that.onCategoryForm.controls["name"].setValue(that.selectedStoreCategory.categoryName);
            that.onCategoryForm.controls["description"].setValue(that.selectedStoreCategory.categoryDescription);
            that.categoryDeleteFlag = (that.selectedStoreCategory.deleteFlag == 'N') ? false : true;
            this.categoryImages = that.selectedStoreCategory.categoryImages;
            if (that.selectedStoreCategory.categoryImages.length == 0)
                that.isImage = false;
            else
                that.isImage = true;
        }, 500);
    }
    AddCategoryPage.prototype.addCategory = function () {
        var _this = this;
        this.selectedStoreCategory.categoryName = this.onCategoryForm.get("name").value;
        this.selectedStoreCategory.categoryDescription = this.onCategoryForm.get("description").value;
        this.selectedStoreCategory.deleteFlag = this.categoryDeleteFlag ? 'Y' : 'N';
        if (this.categoryImages.length > 0)
            this.selectedStoreCategory.categoryImages = this.selectedStoreCategory.categoryImages.concat(this.categoryImages);
        if (this.selectedStoreCategory.categoryImages.length == 0) {
            this.isImage = false;
            return;
        }
        else
            this.isImage = true;
        if (this.selectedStoreCategory.categoryImages.length > 4) {
            this.isImageSize = true;
            return;
        }
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/addCategory', this.selectedStoreCategory)
            .then(function (data) {
            if (data["success"]) {
                _this.dismiss();
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
        });
    };
    AddCategoryPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    AddCategoryPage.prototype.onFileChangeLargeImage = function (event) {
        this.isImage = true;
        this.categoryImages = this.helper.extractImagesFormEvent(event);
    };
    AddCategoryPage.prototype.deleteImage = function (index) {
        this.categoryImages = [];
        this.selectedStoreCategory.categoryImages.splice(index, 1);
    };
    AddCategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-add-category ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\add-category\add-category.html"*/'<ion-header>\n\n        <ion-navbar>\n\n            <button ion-button style="display: block !important;" color="secondary" \n\n               (click)="dismiss()"><ion-icon ios="ios-close" md="md-close"></ion-icon>\n\n            </button>\n\n        </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <div [formGroup]="onCategoryForm" class="form" padding-left padding-right>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-input placeholder="Category Name" formControlName="name" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.name" >\n\n                    <div class="error-message" *ngIf="onCategoryForm.get(\'name\').hasError(validation.type) && (onCategoryForm.get(\'name\').dirty || onCategoryForm.get(\'name\').touched)">\n\n                {{ validation.message }}\n\n                    </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-textarea placeholder="Description (optional)" text-left value="" rows="4" cols="50" formControlName="description"></ion-textarea>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-input type="file" formControlName="categoryImages" accept="image/*"  (change)="onFileChangeLargeImage($event)" multiple></ion-input>\n\n           </ion-item>\n\n            <div *ngIf="!isImage" class="error-message" >\n\n                Atleast one image required.\n\n             </div>\n\n        </ion-list>\n\n        <ion-row>\n\n           <ion-col col-3 *ngFor="let categoryImage of selectedStoreCategory.categoryImages;let idx = index">\n\n               <div class="container">\n\n				  <img src="data:image/png;base64,{{categoryImage}}" alt="Snow" height="37px" width="64px">\n\n				  <button style="background: #ef0f0f;color: white;" (click)="deleteImage(idx)" class="btn">Remove</button>\n\n				</div>\n\n           </ion-col>\n\n        </ion-row>\n\n         <div *ngIf="isImageSize" class="error-message" >\n\n             The Maximum images should be 4 only.\n\n         </div>\n\n        </div>\n\n    <ion-list>\n\n            <ion-item>\n\n               <ion-label>Delete Flag</ion-label>\n\n               <ion-checkbox [(ngModel)]="categoryDeleteFlag"></ion-checkbox>\n\n           </ion-item>\n\n    </ion-list>\n\n    <button ion-button full class="bg-thime btn-round btn-text" (click)="addCategory()" [disabled]="!onCategoryForm.valid ||!isImage">Add</button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\add-category\add-category.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["a" /* FormBuilder */]])
    ], AddCategoryPage);
    return AddCategoryPage;
}());

//# sourceMappingURL=add-category.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddItemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddItemsPage = (function () {
    function AddItemsPage(viewCtrl, params, events, navCtrl, apisProvider, helper, _fb) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.events = events;
        this.navCtrl = navCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this._fb = _fb;
        this.selectedStoreCategoryItem = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["a" /* CategoryItems */]();
        this.itemDeleteFlag = false;
        this.itemImages = new Array();
        this.isImage = false;
        this.isImageSize = false;
        this.validation_messages = {
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
            'itemImages': [
                { type: 'required', message: 'Atleast one image required.' },
            ],
            'unitofMesure': [
                { type: 'required', message: 'This Field is required' },
                { type: 'minlength', message: 'Unit of Mesure must be at least 2 characters long.' },
                { type: 'maxlength', message: 'Unit of Mesure cannot be more than 10 characters long.' }
            ],
            'quantity': [
                { type: 'required', message: 'This Field is required' },
                { type: 'minlength', message: 'Quantity should must be at least 1 digit.' },
                { type: 'maxlength', message: 'Quantity cannot be more than 3 digits.' }
            ],
            'displayOrder': [
                { type: 'required', message: 'This Field is required' },
                { type: 'minlength', message: 'Display Order should must be at least 1 digit.' },
                { type: 'maxlength', message: 'Display Order cannot be more than 3 digits.' }
            ]
        };
        this.selectedStoreCategoryItem = this.params.get("itemData");
        this.onItemsForm = this._fb.group({
            description: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([])],
            name: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(39),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            price: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(5),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(1),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            quantity: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(3),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(1),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            unitofMesure: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            marketPrice: [],
            itemImages: [],
            displayOrder: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(3),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(1),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])]
        });
        var that = this;
        setTimeout(function () {
            that.onItemsForm.controls["name"].setValue(that.selectedStoreCategoryItem.itemName);
            that.onItemsForm.controls["description"].setValue(that.selectedStoreCategoryItem.itemDescription);
            that.onItemsForm.controls["price"].setValue(that.selectedStoreCategoryItem.itemPrice);
            that.onItemsForm.controls["quantity"].setValue(that.selectedStoreCategoryItem.itemQuantity);
            that.onItemsForm.controls["unitofMesure"].setValue(that.selectedStoreCategoryItem.unitofMesure);
            that.onItemsForm.controls["marketPrice"].setValue(that.selectedStoreCategoryItem.marketPrice);
            that.onItemsForm.controls["displayOrder"].setValue(that.selectedStoreCategoryItem.displayOrder);
            this.itemImages = that.selectedStoreCategoryItem.itemsImages;
            that.itemDeleteFlag = (that.selectedStoreCategoryItem.deleteFlag == 'N') ? false : true;
            if (!that.helper.isEmpty(that.selectedStoreCategoryItem.itemsImages)) {
                if (that.selectedStoreCategoryItem.itemsImages.length == 0)
                    that.isImage = false;
                else
                    that.isImage = true;
            }
        }, 500);
    }
    AddItemsPage.prototype.addItem = function () {
        var _this = this;
        this.selectedStoreCategoryItem.itemName = this.onItemsForm.get("name").value;
        this.selectedStoreCategoryItem.itemDescription = this.onItemsForm.get("description").value;
        this.selectedStoreCategoryItem.deleteFlag = this.itemDeleteFlag ? 'Y' : 'N';
        this.selectedStoreCategoryItem.itemPrice = this.onItemsForm.get("price").value;
        this.selectedStoreCategoryItem.itemQuantity = this.onItemsForm.get("quantity").value;
        this.selectedStoreCategoryItem.unitofMesure = this.onItemsForm.get("unitofMesure").value;
        this.selectedStoreCategoryItem.marketPrice = this.onItemsForm.get("marketPrice").value;
        this.selectedStoreCategoryItem.displayOrder = this.onItemsForm.get("displayOrder").value;
        if (this.itemImages.length > 0) {
            if (this.helper.isEmpty(this.selectedStoreCategoryItem.itemsImages))
                this.selectedStoreCategoryItem.itemsImages = this.itemImages;
            else
                this.selectedStoreCategoryItem.itemsImages = this.selectedStoreCategoryItem.itemsImages.concat(this.itemImages);
        }
        if (this.selectedStoreCategoryItem.itemsImages.length == 0) {
            this.isImage = false;
            return;
        }
        else
            this.isImage = true;
        if (this.selectedStoreCategoryItem.itemsImages.length > 4) {
            this.isImageSize = true;
            return;
        }
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/addItem', this.selectedStoreCategoryItem)
            .then(function (data) {
            if (data["success"]) {
                _this.dismiss();
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    AddItemsPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    AddItemsPage.prototype.onSelectItemImage = function (event) {
        this.isImage = true;
        this.itemImages = this.helper.extractImagesFormEvent(event);
    };
    AddItemsPage.prototype.deleteImage = function (index) {
        this.itemImages = [];
        this.selectedStoreCategoryItem.itemsImages.splice(index, 1);
    };
    AddItemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-add-items ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\add-items\add-items.html"*/'<ion-header>\n\n        <ion-navbar>\n\n            <button ion-button style="display: block !important;" color="secondary" \n\n               (click)="dismiss()"><ion-icon ios="ios-close" md="md-close"></ion-icon>\n\n            </button>\n\n        </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <div [formGroup]="onItemsForm" class="form" padding-left padding-right>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-input placeholder="Item Name" formControlName="name" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.name" >\n\n                    <div class="error-message" *ngIf="onItemsForm.get(\'name\').hasError(validation.type) && (onItemsForm.get(\'name\').dirty || onItemsForm.get(\'name\').touched)">\n\n                {{ validation.message }}\n\n                    </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-textarea placeholder="Description (optional)" formControlName="description" text-left value="" rows="4" cols="50"></ion-textarea>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.password" >\n\n                    <div class="error-message" *ngIf="onItemsForm.get(\'description\').hasError(validation.type) && (onItemsForm.get(\'description\').dirty || onItemsForm.get(\'description\').touched)">\n\n                {{ validation.message }}\n\n                    </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label>Store Price </ion-label>\n\n                <ion-input placeholder="" formControlName="price" type="number" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.password" >\n\n                <div class="error-message" *ngIf="onItemsForm.get(\'price\').hasError(validation.type) && (onItemsForm.get(\'price\').dirty || onItemsForm.get(\'price\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                    <ion-label>Quantity</ion-label>\n\n                    <ion-input placeholder="" formControlName="quantity" type="number" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.quantity" >\n\n                <div class="error-message" *ngIf="onItemsForm.get(\'quantity\').hasError(validation.type) && (onItemsForm.get(\'quantity\').dirty || onItemsForm.get(\'quantity\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label>Unit Of Mesurment</ion-label>\n\n                <ion-input placeholder="" formControlName="unitofMesure" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.unitofMesure" >\n\n                <div class="error-message" *ngIf="onItemsForm.get(\'unitofMesure\').hasError(validation.type) && (onItemsForm.get(\'unitofMesure\').dirty || onItemsForm.get(\'unitofMesure\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label>Market Price </ion-label>\n\n                <ion-input placeholder="" formControlName="marketPrice" type="number" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                    <ion-label>Display Order</ion-label>\n\n                    <ion-input placeholder="" formControlName="displayOrder" type="number" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.displayOrder" >\n\n                <div class="error-message" *ngIf="onItemsForm.get(\'displayOrder\').hasError(validation.type) && (onItemsForm.get(\'displayOrder\').dirty || onItemsForm.get(\'displayOrder\').touched)">\n\n                    {{ validation.message }}\n\n                </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-label color="primary" stacked>Select image</ion-label>\n\n                <ion-input type="file" formControlName="itemImages" accept="image/*" (change)="onSelectItemImage($event)" multiple ></ion-input>\n\n           </ion-item>\n\n             <div *ngIf="!isImage" class="error-message" >\n\n                Atleast one image required.\n\n             </div>\n\n            <ion-row>\n\n              <ion-col col-3 *ngFor="let item of selectedStoreCategoryItem.itemsImages;let idx = index">\n\n              	<div class="container">\n\n				  <img src="data:image/png;base64,{{item}}" alt="Snow" height="37px" width="64px">\n\n				  <button style="background: #ef0f0f;color: white;" (click)="deleteImage(idx)" class="btn">Remove</button>\n\n				</div>\n\n              </ion-col>\n\n            </ion-row>\n\n             <div *ngIf="isImageSize" class="error-message" >\n\n                The Maximum images should be 4 only.\n\n             </div>\n\n        </ion-list>\n\n        </div>\n\n    <ion-list>\n\n            <ion-item>\n\n               <ion-label>Delete Flag</ion-label>\n\n               <ion-checkbox [(ngModel)]="itemDeleteFlag"></ion-checkbox>\n\n           </ion-item>\n\n    </ion-list>\n\n    <button ion-button full class="bg-thime btn-round btn-text" (click)="addItem()" [disabled]="!onItemsForm.valid || !isImage">Add</button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\add-items\add-items.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["a" /* FormBuilder */]])
    ], AddItemsPage);
    return AddItemsPage;
}());

//# sourceMappingURL=add-items.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Myorder_2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_models_ModelObjects__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Myorder_2Page = (function () {
    function Myorder_2Page(navCtrl, modalCtrl, toastCtrl, helper, apisProvider) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.helper = helper;
        this.apisProvider = apisProvider;
        this.account = "pending";
        this.myOrderDetails = new Array();
        this.orderStatus = new Array();
        this.itemdata = new __WEBPACK_IMPORTED_MODULE_6__pages_models_ModelObjects__["h" /* UserCart */]();
        this.loadOrderedDetails();
        this.loadOrderSatus();
    }
    Myorder_2Page.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    Myorder_2Page.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    Myorder_2Page.prototype.loadOrderedDetails = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/loadAllOrders', 'ADMIN')
            .then(function (data) {
            if (data["success"]) {
                _this.myOrderDetails = data["data"];
                _this.helper.logMessage("data", _this.myOrderDetails);
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
            _this.apisProvider.stopSpinner();
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    Myorder_2Page.prototype.statusChanged = function (items) {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/changeOrderStatus', items)
            .then(function (data) {
            if (data["success"]) {
                _this.presentToast();
                _this.helper.logMessage("data", data["data"]);
                _this.myOrderDetails = data["data"];
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
            _this.apisProvider.stopSpinner();
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    Myorder_2Page.prototype.loadOrderSatus = function () {
        var _this = this;
        this.apisProvider.loadData('api/lookUp/getCategoryItemByName', 'OrderStatus')
            .then(function (data) {
            if (data["success"]) {
                _this.orderStatus = data["orderStatus"];
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    Myorder_2Page.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Order Status Changed Successfully',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    Myorder_2Page.prototype.orderDetails = function () {
    };
    Myorder_2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-myorder_2 ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\myorder_2\myorder_2.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n   <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>My Order\n\n            <div class="icon-box">\n\n                <!-- <img src="assets/imgs/search.png" (click)="searchPage()">\n\n                <img src="assets/imgs/ic_my_cart.png" (click)="cartPage()"> -->\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar no-border-top class="tab-bar">\n\n        <ion-segment [(ngModel)]="account">\n\n            <ion-segment-button value="pending">\n\n                Pending Orders\n\n            </ion-segment-button>\n\n            <ion-segment-button value="packed">\n\n                Shipped Order\n\n            </ion-segment-button>\n\n            <ion-segment-button value="delivery">\n\n                Out For Delivery\n\n            </ion-segment-button>\n\n        </ion-segment>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light" >\n\n    <div [ngSwitch]="account" >\n\n        <div *ngFor="let orders of myOrderDetails">\n\n    <div *ngFor="let ordersItems of orders.orderPlacedItems">\n\n        <div *ngSwitchCase="\'pending\'" class="profile-section">\n\n            <ion-card class="border-bottom-none border" style="position: relative;" (click)="orderDetails()" >\n\n                <ion-card-header>\n\n                    <p>\n\n                        <span class="text-light">Ordered ID:</span> {{orders.id}}\n\n                        <br>\n\n                        <span class="text-light">Placed on</span> {{orders.orderedTime | date:\'EEEE, MMMM d, yyyy h:mm a\'}}\n\n                        <br>\n\n                        <span class="text-light">Store:</span> {{ordersItems.mrGreenStoreName}}\n\n                    </p>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                <div >\n\n                    <ion-row >\n\n                        <ion-col col-7>\n\n                            <h4>{{ordersItems.categoryItemName}}\n\n                            </h4>\n\n                            <small><span class="text-light">Quantity:</span>{{ordersItems.itemQuantity}} {{ordersItems.unitofMesure}}</small>\n\n                            <p>\n\n                               Total Payed Amount:{{ordersItems.totalPrice| currency:"₹":0 }}\n\n                                \n\n                            </p>\n\n                            <small><span class="text-light">Tracking Status on</span><br> {{orders.orderedTime | date:\'EEEE, MMMM d, yyyy\'}}</small>\n\n                            <!-- <button ion-button full class="bg-green btn-round  btn-text">Reached Hub,New Delhi</button> -->\n\n                        </ion-col>\n\n                        <ion-col col-5>\n\n                            <div class="img-box">\n\n                                <img src="data:image/png;base64,{{ordersItems.base64Image}}" style="height: 100px;">\n\n                                <br>\n\n                                <small class="text-light">via {{orders.paymentType}}</small>\n\n                            </div>\n\n                           \n\n                        </ion-col>\n\n                        <ion-col>\n\n                            <b>Delivery Address:</b>\n\n                                <p>{{ordersItems.deliveryAddress.name}},<br>{{ordersItems.deliveryAddress.streetAddress}},<br>{{ordersItems.deliveryAddress.address}},{{ordersItems.deliveryAddress.pin}}<br>LandMark: {{ordersItems.deliveryAddress.landMark}}<br>{{ordersItems.deliveryAddress.city}},<br>{{ordersItems.deliveryAddress.state}}</p>\n\n                                </ion-col>\n\n                    </ion-row>\n\n                    </div>\n\n                </ion-card-content>\n\n                <ion-card-header>\n\n                        <!-- <p class="left-side text-size">\n\n                                <b>Change Status Of Order </b>\n\n                        </p> -->\n\n                         <p class="right-side text-sky">\n\n                                <ion-item>\n\n                                        <ion-label>Select Order Status</ion-label>\n\n                                        <ion-select [(ngModel)]="ordersItems.itemStatus" (ngModelChange)="statusChanged(ordersItems)">\n\n                                          <ion-option *ngFor="let status of orderStatus" [value]="status.key">{{status.value}}</ion-option>\n\n                                          \n\n                                        </ion-select>\n\n                                      </ion-item>\n\n                        </p> \n\n                    </ion-card-header>\n\n            </ion-card>\n\n<br>\n\n           \n\n        </div>\n\n        </div>\n\n       <!--  <ion-content *ngIf="orders.length == 0 && helper.isEmpty(orders)">\n\n                <ion-card>\n\n                        <ion-card-header>\n\n                            ---No Categories Found---\n\n                        </ion-card-header>\n\n                    </ion-card>\n\n        </ion-content> -->\n\n        </div>\n\n\n\n        <div *ngFor="let orders of myOrderDetails">\n\n                <div *ngFor="let ordersItems of orders.shippedItmes">\n\n                    <div *ngSwitchCase="\'packed\'" class="profile-section">\n\n                        <ion-card class="border-bottom-none border" style="position: relative;" (click)="orderDetails()"  >\n\n                            <ion-card-header>\n\n                                <p class="left-side">\n\n                                    <span class="text-light">Ordered ID:</span> {{orders.id}}\n\n                                    <br>\n\n                                    <span class="text-light">Placed on</span> {{orders.orderedTime | date:\'short\'}}\n\n                                    <br>\n\n                                   <!--  <span class="text-light">Total Amount Paid:</span> {{orders.totalPrice}} -->\n\n                                </p>\n\n                                 <p class="right-side text-sky">\n\n                                   <b>{{ordersItems.mrGreenStoreName}}</b>\n\n                                </p> \n\n                            </ion-card-header>\n\n                            <ion-card-content>\n\n                            <div >\n\n                                <ion-row >\n\n                                    <ion-col col-7>\n\n                                        <h4>{{ordersItems.categoryItemName}}\n\n                                        </h4>\n\n                                        <small><span class="text-light">Quantity:</span>{{ordersItems.itemQuantity}}</small>\n\n                                        <p>\n\n                                           Total Payed Item Amount:{{ordersItems.totalPrice| currency:"₹":0 }}\n\n                                            \n\n                                        </p>\n\n                                        <small><span class="text-light">Tracking Status on</span><br> {{orders.orderedTime | date:\'short\'}}</small>\n\n                                        <!-- <button ion-button full class="bg-green btn-round  btn-text">Reached Hub,New Delhi</button> -->\n\n                                    </ion-col>\n\n                                    <ion-col col-5>\n\n                                        <div class="img-box">\n\n                                            <img src="data:image/png;base64,{{ordersItems.base64Image}}" style="height: 100px;">\n\n                                            <br>\n\n                                            <small class="text-light">via {{orders.paymentType}}</small>\n\n                                        </div>\n\n                                    </ion-col>\n\n                                    <ion-col col-7>\n\n                                        <b>Delivery Address:</b>\n\n                                            <p>{{ordersItems.deliveryAddress.name}},<br>{{ordersItems.deliveryAddress.streetAddress}},<br>{{ordersItems.deliveryAddress.address}},{{ordersItems.deliveryAddress.pin}}<br>{{ordersItems.deliveryAddress.city}},<br>{{ordersItems.deliveryAddress.state}}</p>\n\n                                            </ion-col>\n\n                                </ion-row>\n\n                                </div>\n\n                            </ion-card-content>\n\n                            <ion-card-header>\n\n                                    <!-- <p class="left-side text-size">\n\n                                            <b>Change Status Of Order </b>\n\n                                    </p> -->\n\n                                     <p class="right-side text-sky">\n\n                                            <ion-item>\n\n                                                    <ion-label>Select Order Status</ion-label>\n\n                                                    <ion-select [(ngModel)]="ordersItems.itemStatus" (ngModelChange)="statusChanged(ordersItems)">\n\n                                                      <ion-option *ngFor="let status of orderStatus" [value]="status.key">{{status.value}}</ion-option>\n\n                                                      \n\n                                                    </ion-select>\n\n                                                  </ion-item>\n\n                                    </p> \n\n                                </ion-card-header>\n\n                                \n\n                        </ion-card>\n\n            <br>\n\n                       \n\n                    </div>\n\n                  <!--   <div *ngIf="ordersItems.length != 0;else data_there" >Data is not there</div>\n\n                    <ng-template #data_there>Data is not there</ng-template> -->\n\n                    </div>\n\n                    \n\n                    </div>\n\n              \n\n                    <div *ngFor="let orders of myOrderDetails">\n\n                            <div *ngFor="let ordersItems of orders.outForDelieryItems">\n\n                                <div *ngSwitchCase="\'delivery\'" class="profile-section">\n\n                                    <ion-card class="border-bottom-none border" style="position: relative;" (click)="orderDetails()">\n\n                                        <ion-card-header>\n\n                                            <p class="left-side">\n\n                                                <span class="text-light">Ordered ID:</span> {{orders.id}}\n\n                                                <br>\n\n                                                <span class="text-light">Placed on</span> {{orders.orderedTime | date:\'short\'}}\n\n                                                <br>\n\n                                               <!--  <span class="text-light">Total Amount Paid:</span> {{orders.totalPrice}} -->\n\n                                            </p>\n\n                                             <p class="right-side text-sky">\n\n                                               <b>{{ordersItems.mrGreenStoreName}}</b>\n\n                                            </p> \n\n                                        </ion-card-header>\n\n                                        <ion-card-content>\n\n                                        <div >\n\n                                            <ion-row >\n\n                                                <ion-col col-7>\n\n                                                    <h4>{{ordersItems.categoryItemName}}\n\n                                                    </h4>\n\n                                                    <small><span class="text-light">Quantity:</span>{{ordersItems.itemQuantity}}</small>\n\n                                                    <p>\n\n                                                       Total Payed Item Amount:{{ordersItems.totalPrice| currency:"₹":0 }}\n\n                                                        \n\n                                                    </p>\n\n                                                    <small><span class="text-light">Tracking Status on</span><br> {{orders.orderedTime | date:\'short\'}}</small>\n\n                                                    <!-- <button ion-button full class="bg-green btn-round  btn-text">Reached Hub,New Delhi</button> -->\n\n                                                </ion-col>\n\n                                                <ion-col col-5>\n\n                                                    <div class="img-box">\n\n                                                        <img src="data:image/png;base64,{{ordersItems.base64Image}}" style="height: 100px;">\n\n                                                        <br>\n\n                                                        <small class="text-light">via {{orders.paymentType}}</small>\n\n                                                    </div>\n\n                                                </ion-col>\n\n                                                <ion-col col-7>\n\n                                                    <b>Delivery Address:</b>\n\n                                                        <p>{{ordersItems.deliveryAddress.name}},<br>{{ordersItems.deliveryAddress.streetAddress}},<br>{{ordersItems.deliveryAddress.address}},{{ordersItems.deliveryAddress.pin}}<br>{{ordersItems.deliveryAddress.city}},<br>{{ordersItems.deliveryAddress.state}}</p>\n\n                                                        </ion-col>\n\n                                            </ion-row>\n\n                                            </div>\n\n                                        </ion-card-content>\n\n                                        <ion-card-header>\n\n                                                <!-- <p class="left-side text-size">\n\n                                                        <b>Change Status Of Order </b>\n\n                                                </p> -->\n\n                                                 <p class="right-side text-sky">\n\n                                                        <ion-item>\n\n                                                                <ion-label>Select Order Status</ion-label>\n\n                                                                <ion-select [(ngModel)]="ordersItems.itemStatus" (ngModelChange)="statusChanged(ordersItems)">\n\n                                                                  <ion-option *ngFor="let status of orderStatus" [value]="status.key">{{status.value}}</ion-option>\n\n                                                                  \n\n                                                                </ion-select>\n\n                                                              </ion-item>\n\n                                                </p> \n\n                                            </ion-card-header>\n\n                                    </ion-card>\n\n                        <br>\n\n                                   \n\n                                </div>\n\n                                <!-- <div *ngIf="ordersItems.length != 0;else data_there" >Data is not there</div>\n\n                    <ng-template #data_there>Data is not there</ng-template> -->\n\n                                </div>\n\n                               \n\n                                </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\myorder_2\myorder_2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_4__providers_apis_apis__["a" /* ApisProvider */]])
    ], Myorder_2Page);
    return Myorder_2Page;
}());

//# sourceMappingURL=myorder_2.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OurMissionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OurMissionPage = (function () {
    function OurMissionPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
    }
    OurMissionPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    OurMissionPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    OurMissionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-our-mission',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\our-mission\our-mission.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n     <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Our Mission\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <h6 style="font-family: \'Roboto Slab\', serif;" text-center><strong>Store2Door: Mission</strong><br>\n\n    	 <span style="font-size: 11px;">(Save the next generation)</span>\n\n    </h6>\n\n    <ion-card style="font-family: \'Roboto\', sans-serif;">\n\n        <ion-card-content class="text-light">\n\n	        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;At Mr.Green Store, we take great pride in our mission to create a healthy environment, thereby producing healthy and contented products.\n\n	        <br><br><u>Store2Door Chicken (Free range country chicken):</u><br><br>\n\n	        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our chickens are regularly rotated to a fresh paddock of grass. Grass-fed animals produce naturally leaner meats with the added benefits of beta-carotene, Omega-3 fatty acids and CLA. The anti-oxidant Vitamin E, which is derived from fresh pasture, is a bonus for our customers.\n\n	        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All of our animals are handled humanely from the day they are born. They are never fed animal by-products, given growth hormones or antibiotics. In addition, the pastures have not been chemically fertilized or treated with pesticides and herbicides.\n\n	        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The result is a beautiful, healthy environment where all the animals are able to flourish, naturally.\n\n	        <br><br><u>Mr.Green Oils (Marachekku oils):</u>\n\n	        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100% Natural Edible oils: Groundnut Oil, Coconut Oil & Gingelly Oil\n\n	        <br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wood pressed oil finds a mention in Tamil Sangam literature as a healing agent for wounds. That is proof of the healing powers of the wood. It absorbs heat and maintains atmospheric temperature in oil extraction. The cold-pressed oil this way is packed with Nutrients and health benefits, something which our Ancestors enjoyed.\n\n	        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We are a family friendly environment where you are welcome to visit the shop and see the oil manufacturing. Please confirm when calling so that a staff member or a family-member will be available to assist you at the place.\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\our-mission\our-mission.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], OurMissionPage);
    return OurMissionPage;
}());

//# sourceMappingURL=our-mission.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AboutPage = (function () {
    function AboutPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
    }
    AboutPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    AboutPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-about ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\about\about.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>About Us\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <h6 style="font-family: \'Roboto Slab\', serif;" text-center><strong>About Store2Door</strong><br>\n\n    </h6>\n\n    <ion-card style="font-family: \'Roboto\', sans-serif;">\n\n        <ion-card-header>\n\n            Please call 8179649434 / 7483762621 for <br> for any queries.\n\n        </ion-card-header>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeliveryChargesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DeliveryChargesPage = (function () {
    function DeliveryChargesPage(viewCtrl, params, events, navCtrl, apisProvider, helper, _fb) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.events = events;
        this.navCtrl = navCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this._fb = _fb;
        this.activeTab = "charges";
        this.validation_messages = {
            'deliveryCharge': [
                { type: 'required', message: 'Delivery Charge is required.' },
                { type: 'maxlength', message: 'Delivery Charge cannot be more than 4 digits.' }
            ],
            'deliveryAmountLimit': [
                { type: 'required', message: 'Delivery Amount Limit is required.' },
                { type: 'maxlength', message: 'Delivery Amount Limit be more than 5 digits.' }
            ],
            'couponCode': [
                { type: 'required', message: 'Delivery Amount Limit is required.' },
                { type: 'maxlength', message: 'Delivery Amount Limit be more than 5 digits.' }
            ],
            'couponOffer': [
                { type: 'required', message: 'Delivery Amount Limit is required.' },
                { type: 'maxlength', message: 'Delivery Amount Limit be more than 5 digits.' }
            ],
        };
        this.deliveryCharges = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["d" /* DeliveryCharges */]();
        this.nowdate = new Date();
        this.disableDate = this.populateDate(this.nowdate);
        this.couponsList = new Array();
        this.couponTypes = new Array();
        this.loadDeliveryCharges();
        this.onDeliveryChargesForm = this._fb.group({
            deliveryCharge: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(4),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            deliveryAmountLimit: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(5),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
        });
        this.onCouponsForm = this._fb.group({
            couponCode: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(20),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            expiryDate: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            couponOffer: ['', __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].maxLength(3),
                    __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["f" /* Validators */].required
                ])],
        });
        this.loadCouponsTypes();
        this.loadCoupons();
    }
    DeliveryChargesPage.prototype.addDeliveryCharge = function () {
        var _this = this;
        this.deliveryCharges.deliveryCharge = this.onDeliveryChargesForm.get("deliveryCharge").value;
        this.deliveryCharges.deliveryAmountLimit = this.onDeliveryChargesForm.get("deliveryAmountLimit").value;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/saveDeliveryCharges', this.deliveryCharges)
            .then(function (data) {
            _this.apisProvider.stopSpinner();
            if (data["success"]) {
                _this.deliveryCharges = data["data"];
                _this.apisProvider.openErrorAlert("Success!", "Delivery Charges Saved Successfully");
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
        });
    };
    DeliveryChargesPage.prototype.loadDeliveryCharges = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/getDeliveryCharges')
            .then(function (data) {
            _this.apisProvider.stopSpinner();
            if (data["success"]) {
                if (!_this.helper.isEmpty(data.data)) {
                    _this.deliveryCharges = data.data;
                    _this.onDeliveryChargesForm.controls["deliveryCharge"].setValue(_this.deliveryCharges.deliveryCharge);
                    _this.onDeliveryChargesForm.controls["deliveryAmountLimit"].setValue(_this.deliveryCharges.deliveryAmountLimit);
                }
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
        });
    };
    DeliveryChargesPage.prototype.populateDate = function (date) {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };
    DeliveryChargesPage.prototype.saveCoupons = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/saveCoupons', this.couponsList)
            .then(function (data) {
            _this.apisProvider.stopSpinner();
            if (data["success"]) {
                _this.couponsList = data["couponsList"];
                _this.populateCoupns();
                _this.apisProvider.openErrorAlert("Success!", "Coupons Saved Successfully");
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
        });
    };
    DeliveryChargesPage.prototype.addCoupon = function () {
        var coupon = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["b" /* Coupons */]();
        this.couponsList[this.couponsList.length] = coupon;
    };
    DeliveryChargesPage.prototype.loadCouponsTypes = function () {
        var _this = this;
        this.apisProvider.loadData('api/lookUp/getCategoryItemByName', 'couponsTypes')
            .then(function (data) {
            if (data["success"]) {
                _this.couponTypes = data["orderStatus"];
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    DeliveryChargesPage.prototype.loadCoupons = function () {
        var _this = this;
        this.apisProvider.loadData('api/stores/loadCoupons', '')
            .then(function (data) {
            if (data["success"]) {
                _this.couponsList = data["couponsList"];
                if (_this.couponsList.length == 0) {
                    var coupon1 = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["b" /* Coupons */]();
                    _this.couponsList[_this.couponsList.length] = coupon1;
                }
                else
                    _this.populateCoupns();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    DeliveryChargesPage.prototype.populateCoupns = function () {
        for (var i = 0; i < this.couponsList.length; i++) {
            this.couponsList[i].expiryDate = this.couponsList[i].expiryDate.split("T")[0];
        }
    };
    DeliveryChargesPage.prototype.removecoupon = function (index) {
        this.couponsList.splice(index, 1);
    };
    DeliveryChargesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-delivery_charges',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\delivery_charges\delivery_charges.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>\n\n            Delivery Charges\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar no-border-top class="tab-bar">\n\n        <ion-segment [(ngModel)]="activeTab">\n\n            <ion-segment-button value="charges">\n\n                Delivery Charges\n\n            </ion-segment-button>\n\n            <ion-segment-button value="coupons">\n\n               coupons\n\n            </ion-segment-button>\n\n        </ion-segment>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content padding>\n\n	<div [ngSwitch]="activeTab">\n\n     	<div *ngSwitchCase="\'charges\'" class="profile-section">\n\n    		<div [formGroup]="onDeliveryChargesForm" class="form" padding-left padding-right>\n\n	        	<ion-list>\n\n	        		<label>Delivery Amount Limit:</label>\n\n		            <ion-item>\n\n		                <ion-input placeholder="Delivery Amount Limit" formControlName="deliveryAmountLimit" type="number" text-left></ion-input>\n\n		            </ion-item>\n\n		             <ng-container *ngFor="let validation of validation_messages.deliveryAmountLimit" >\n\n		                <div class="error-message" *ngIf="onDeliveryChargesForm.get(\'deliveryAmountLimit\').hasError(validation.type) && (onDeliveryChargesForm.get(\'deliveryAmountLimit\').dirty || onDeliveryChargesForm.get(\'deliveryAmountLimit\').touched)">\n\n		                	{{ validation.message }}\n\n		               </div>\n\n		            </ng-container>\n\n	        		<label>Delivery Charge:</label>\n\n		            <ion-item>\n\n		                <ion-input placeholder="Delivery Charge" formControlName="deliveryCharge" type="number" text-left></ion-input>\n\n		            </ion-item>\n\n		            <ng-container *ngFor="let validation of validation_messages.deliveryCharge" >\n\n		                    <div class="error-message" *ngIf="onDeliveryChargesForm.get(\'deliveryCharge\').hasError(validation.type) && (onDeliveryChargesForm.get(\'deliveryCharge\').dirty || onDeliveryChargesForm.get(\'deliveryCharge\').touched)">\n\n		                {{ validation.message }}\n\n		                    </div>\n\n		            </ng-container>\n\n	        	</ion-list>\n\n        	</div>\n\n        	<button ion-button full class="bg-thime btn-round btn-text" (click)="addDeliveryCharge()" [disabled]="!onDeliveryChargesForm.valid">Update</button>\n\n        </div>\n\n        <div *ngSwitchCase="\'coupons\'" class="profile-section">\n\n    		   <form #couponsForm="ngForm">\n\n	    		  <div  *ngFor=\'let coupon of couponsList; let idx = index\' class="form" padding-left padding-right>\n\n		        	<span>Coupon-{{idx+1}}:\n\n		        		<ion-icon (click)="removecoupon(idx)" style="color:#ef0f0f;float:right" name="trash"></ion-icon>\n\n		        	</span>\n\n		        	<ion-list>\n\n		        	<br>\n\n		        	<label>Coupon Code:</label>\n\n			            <ion-item>\n\n			                <ion-input name="couponCode{{idx}}" #couponCode="ngModel" placeholder="Coupon Code" [(ngModel)]="coupon.couponCode" type="text" text-left required minlength="5"></ion-input>\n\n			            </ion-item>\n\n			            <div *ngIf="couponCode.invalid && (couponCode.dirty || couponCode.touched)" class="error-message">\n\n							<div *ngIf="couponCode.errors.required">Coupon Code is required.</div>\n\n	  						<div *ngIf="couponCode.errors.minlength">Coupon Code must be at least 4 characters long.</div>\n\n	  					</div>\n\n	  					<br>\n\n	  					<label>Coupon Offer:</label>\n\n			            <ion-item>\n\n			                <ion-input name="couponOffer{{idx}}" #couponOffer="ngModel" placeholder="Coupon Offer" [(ngModel)]="coupon.couponOffer" type="number" text-left required></ion-input>\n\n			            </ion-item>\n\n			            <div *ngIf="couponOffer.invalid && (couponOffer.dirty || couponOffer.touched)" class="error-message">\n\n							<div *ngIf="couponOffer.errors.required">Coupon Offer is required.</div>\n\n	  					</div>\n\n	  					<label>Maximum Limit:</label>\n\n			            <ion-item>\n\n			                <ion-input name="maximumLimit{{idx}}" #maximumLimit="ngModel" placeholder="Maximum Limit" [(ngModel)]="coupon.maximumLimit" type="number" text-left required></ion-input>\n\n			            </ion-item>\n\n			            <div *ngIf="maximumLimit.invalid && (maximumLimit.dirty || maximumLimit.touched)" class="error-message">\n\n							<div *ngIf="maximumLimit.errors.required">Maximum limit Amount is required.</div>\n\n	  					</div>\n\n	  					<label>Expiry Date:</label>\n\n			            <ion-item>\n\n			                <ion-datetime name="expiryDate{{idx}}" #expiryDate="ngModel" placeholder="Expiry Date" [(ngModel)]="coupon.expiryDate" displayFormat="YYYY-MM-DD" [min]="disableDate" [max]="2050" required></ion-datetime>\n\n			            </ion-item>\n\n			            <div *ngIf="expiryDate.invalid && (expiryDate.dirty || expiryDate.touched)" class="error-message">\n\n							<div *ngIf="expiryDate.errors.required">Expiry Date is required.</div>\n\n	  					</div>\n\n	  					<label>Coupon Type:</label>\n\n	  					<ion-item>\n\n			                <ion-select name="couponType{{idx}}" #couponType="ngModel" placeholder="Coupon Type" [(ngModel)]="coupon.couponType" required>\n\n                                <ion-option *ngFor="let coupon of couponTypes" [value]="coupon.key">{{coupon.value}}</ion-option>\n\n                            </ion-select>\n\n			            </ion-item>\n\n			             <div *ngIf="couponType.invalid && (couponType.dirty || couponType.touched)" class="error-message">\n\n							<div *ngIf="couponType.errors.required">Coupon type is required.</div>\n\n	  					</div>\n\n		        	</ion-list>\n\n		        	<hr>\n\n	        	</div>\n\n        	</form>\n\n        	 <div *ngIf="!couponsForm.valid" class="error-message">\n\n				Please fill all the required fields.\n\n	  		</div>\n\n        	<button style="float: right;height: 10px;" padding ion-button class="bg-thime btn-round btn-text" (click)="addCoupon()">Add Coupon</button><br>\n\n        	<br><button *ngIf="couponsList.length!=0" ion-button full class="bg-thime btn-round btn-text" (click)="saveCoupons()" [disabled]="!couponsForm.valid">Save Coupons</button>\n\n        </div>\n\n     </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\delivery_charges\delivery_charges.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_forms__["a" /* FormBuilder */]])
    ], DeliveryChargesPage);
    return DeliveryChargesPage;
}());

//# sourceMappingURL=delivery_charges.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(379);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_phonenumber_phonenumber__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_itemdetail_itemdetail__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_shippining_shippining__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_payment_payment__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_placed_placed__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_myorder_1_myorder_1__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_help_help__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_cart_cart__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_review_review__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_search_search__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_location_location__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_myorder_2_myorder_2__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_list_list__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__node_modules_angular_common_http__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_my_stores_my_stores__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_add_category_add_category__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_add_items_add_items__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_show_items_show_items__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_google_plus__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_facebook__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_address_address__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_push__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_item_rateing_itemrateing__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_ionic2_rating__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_our_mission_our_mission__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_about_about__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_delivery_charges_delivery_charges__ = __webpack_require__(372);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_phonenumber_phonenumber__["a" /* PhonenumberPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_itemdetail_itemdetail__["a" /* ItemdetailPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_shippining_shippining__["a" /* ShippiningPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_placed_placed__["a" /* PlacedPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* My_accountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_myorder_1_myorder_1__["a" /* Myorder_1Page */],
                __WEBPACK_IMPORTED_MODULE_12__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_location_location__["a" /* LocationPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */],
                __WEBPACK_IMPORTED_MODULE_18__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_about_about__["a" /* AboutPage */], __WEBPACK_IMPORTED_MODULE_35__pages_our_mission_our_mission__["a" /* OurMissionPage */], __WEBPACK_IMPORTED_MODULE_37__pages_delivery_charges_delivery_charges__["a" /* DeliveryChargesPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__["a" /* SignUpPage */], __WEBPACK_IMPORTED_MODULE_25__pages_my_stores_my_stores__["a" /* MyStoresPage */], __WEBPACK_IMPORTED_MODULE_26__pages_add_category_add_category__["a" /* AddCategoryPage */], __WEBPACK_IMPORTED_MODULE_27__pages_add_items_add_items__["a" /* AddItemsPage */], __WEBPACK_IMPORTED_MODULE_28__pages_show_items_show_items__["a" /* ShowItemsPage */], __WEBPACK_IMPORTED_MODULE_31__pages_address_address__["a" /* AddressPage */], __WEBPACK_IMPORTED_MODULE_33__pages_item_rateing_itemrateing__["a" /* ItemRateingPage */], __WEBPACK_IMPORTED_MODULE_35__pages_our_mission_our_mission__["a" /* OurMissionPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_23__node_modules_angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_34_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_phonenumber_phonenumber__["a" /* PhonenumberPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_itemdetail_itemdetail__["a" /* ItemdetailPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_shippining_shippining__["a" /* ShippiningPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_placed_placed__["a" /* PlacedPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* My_accountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_myorder_1_myorder_1__["a" /* Myorder_1Page */],
                __WEBPACK_IMPORTED_MODULE_12__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_location_location__["a" /* LocationPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */],
                __WEBPACK_IMPORTED_MODULE_18__pages_list_list__["a" /* ListPage */], __WEBPACK_IMPORTED_MODULE_36__pages_about_about__["a" /* AboutPage */], __WEBPACK_IMPORTED_MODULE_35__pages_our_mission_our_mission__["a" /* OurMissionPage */], __WEBPACK_IMPORTED_MODULE_37__pages_delivery_charges_delivery_charges__["a" /* DeliveryChargesPage */], __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__["a" /* SignUpPage */], __WEBPACK_IMPORTED_MODULE_25__pages_my_stores_my_stores__["a" /* MyStoresPage */], __WEBPACK_IMPORTED_MODULE_26__pages_add_category_add_category__["a" /* AddCategoryPage */], __WEBPACK_IMPORTED_MODULE_27__pages_add_items_add_items__["a" /* AddItemsPage */], __WEBPACK_IMPORTED_MODULE_28__pages_show_items_show_items__["a" /* ShowItemsPage */], __WEBPACK_IMPORTED_MODULE_31__pages_address_address__["a" /* AddressPage */], __WEBPACK_IMPORTED_MODULE_33__pages_item_rateing_itemrateing__["a" /* ItemRateingPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_22__providers_apis_apis__["a" /* ApisProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_29__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_30__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_32__ionic_native_push__["a" /* Push */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_phonenumber_phonenumber__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_my_account_my_account__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_myorder_1_myorder_1__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_help_help__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_cart_cart__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_review_review__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_location_location__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_my_stores_my_stores__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_myorder_2_myorder_2__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_push__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_our_mission_our_mission__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_about_about__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_delivery_charges_delivery_charges__ = __webpack_require__(372);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var MyApp = (function () {
    function MyApp(push, app, menu, alertCtrl, events, helper, platform, statusBar, splashScreen, apisProvider) {
        var _this = this;
        this.push = push;
        this.app = app;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.helper = helper;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.apisProvider = apisProvider;
        this.isSuperAdmin = false;
        this.isAdmin = false;
        this.isUser = false;
        this.loggedInUserName = "Store2Door";
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.isAuthenticated = false;
        events.subscribe('user:loggedIn', function (user, time) {
            _this.menu.enable(true);
            _this.populateMenu();
            _this.isAuthenticated = true;
        });
        if (this.apisProvider.authenticated()) {
            this.menu.enable(true);
            this.populateMenu();
            this.isAuthenticated = true;
        }
        else {
            this.menu.enable(false);
            this.isAuthenticated = false;
        }
        this.initializeApp();
        this.pushSetUp();
        // used for an example of ngFor and navigation
    }
    MyApp.prototype.populateMenu = function () {
        var _this = this;
        this.apisProvider.getCurrentUser().then(function (data) {
            _this.isAdmin = data['admin'];
            _this.isSuperAdmin = data['superAdmin'];
            _this.isUser = data["user"];
            _this.loggedInUserName = data["name"];
            _this.helper.logMessage("GetUserData==>", data);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        this.platform.registerBackButtonAction(function () {
            var nav = _this.app.getActiveNavs()[0];
            var activeView = nav.getActive();
            if (activeView.name === "HomePage") {
                if (nav.canGoBack()) {
                    nav.pop();
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'App termination',
                        message: 'Do you want to close the app?',
                        buttons: [{
                                text: 'Cancel',
                                role: 'cancel',
                                handler: function () {
                                    _this.helper.logMessage("data", "Application exit prevented!");
                                }
                            }, {
                                text: 'Close App',
                                handler: function () {
                                    _this.platform.exitApp(); // Close this application
                                }
                            }]
                    });
                    alert_1.present();
                }
            }
            else {
                nav.pop({});
            }
        });
    };
    MyApp.prototype.myorder_1Page = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_myorder_1_myorder_1__["a" /* Myorder_1Page */]);
    };
    MyApp.prototype.locationPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_location_location__["a" /* LocationPage */]);
    };
    MyApp.prototype.my_accountPage = function (activeTab) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__pages_my_account_my_account__["a" /* My_accountPage */], { "activeTab": activeTab });
    };
    MyApp.prototype.homePage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.reviewPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_review_review__["a" /* ReviewPage */]);
    };
    MyApp.prototype.cartPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_cart_cart__["a" /* CartPage */]);
    };
    MyApp.prototype.helpPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_help_help__["a" /* HelpPage */]);
    };
    MyApp.prototype.phonenumberPage = function () {
        localStorage.clear();
        this.menu.enable(false);
        this.menu.enable(false);
        this.isAuthenticated = false;
        this.isSuperAdmin = false;
        this.isAdmin = false;
        this.isUser = false;
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.myStotesPage = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_14__pages_my_stores_my_stores__["a" /* MyStoresPage */]);
    };
    MyApp.prototype.myorder_2Page = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_15__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    MyApp.prototype.pushSetUp = function () {
        var _this = this;
        var options = {
            android: {
                senderID: '200119753561'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('registration').subscribe(function (registration) { return _this.helper.logMessage('Device registered', registration); });
        pushObject.on('notification').subscribe(function (notification) { return _this.helper.logMessage('Received a notification', notification); });
        pushObject.on('error').subscribe(function (error) { return _this.helper.logMessage('Error with Push plugin', error); });
    };
    MyApp.prototype.ourMissionPage = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_17__pages_our_mission_our_mission__["a" /* OurMissionPage */]);
    };
    MyApp.prototype.aboutPage = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_18__pages_about_about__["a" /* AboutPage */]);
    };
    MyApp.prototype.deliveryChargesPage = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_19__pages_delivery_charges_delivery_charges__["a" /* DeliveryChargesPage */]);
    };
    MyApp.prototype.loginPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_phonenumber_phonenumber__["a" /* PhonenumberPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\git\store-2-door-ui\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-list>\n\n                <ion-item>\n\n                    <ion-avatar item-start>\n\n                        <img src="assets/imgs/logo.png">\n\n                    </ion-avatar>\n\n                    <h2>{{loggedInUserName}}\n\n                        <!-- ion-icon name="ios-arrow-forward"></ion-icon> -->\n\n                    </h2>\n\n                </ion-item>\n\n                <div class="menu-title" style="padding: 0;">\n\n                    <button ion-item menuClose (click)="locationPage()">\n\n                    <img src=" assets/imgs/ic_my_addresses.png" style="margin-right: 1rem;">\n\n                        <span><small>Your Location</small>\n\n                        Bangalore, Karnataka</span>\n\n                </button>\n\n                </div>\n\n            </ion-list>\n\n        </ion-toolbar>\n\n        <div  class="menu-tabs" padding text-center>\n\n            <ion-row *ngIf="isAuthenticated">\n\n                <ion-col col-4 menuClose (click)="myorder_1Page()">\n\n                    <img src="assets/imgs/ic_my_orders-2.png">\n\n                    <p>My Order</p>\n\n                </ion-col>\n\n                <ion-col col-4 menuClose (click)="my_accountPage(\'card\')">\n\n                    <img src="assets/imgs/ic_my_cards-2.png">\n\n                    <p>My Card</p>\n\n                </ion-col>\n\n                <ion-col col-4 menuClose (click)="my_accountPage(\'address\')">\n\n                    <img src="assets/imgs/ic_my_addresses-2.png">\n\n                    <p>My Addresses</p>\n\n                </ion-col> \n\n            </ion-row>\n\n            <ion-row *ngIf="!isAuthenticated">\n\n                <ion-col menuClose (click)="loginPage()">\n\n                    <p style="font-size: 13px;">Login/Signup</p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </div>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n        <div class="menu-title">\n\n            <ion-list>\n\n                <button ion-item menuClose (click)="homePage()">\n\n                    <img src=" assets/imgs/ic_home.png ">\n\n                        Stores\n\n                </button>\n\n                <button ion-item menuClose (click)="myStotesPage()" *ngIf="(isAdmin || isSuperAdmin) && isAuthenticated">\n\n                        <img src="assets/imgs/ic_my_stores.png ">\n\n                            My Stores\n\n                </button>\n\n               <!--  <button ion-item menuClose (click)="categoryPage()">\n\n                    <img src="assets/imgs/ic_categories.png ">\n\n                     Shop by Caategory                 \n\n                </button> -->\n\n                <button ion-item menuClose (click)="myorder_2Page()" *ngIf="(isAdmin || isSuperAdmin) && isAuthenticated">\n\n                        <img src="assets/imgs/ic_basket.png" class="img-transfer">\n\n                            Orders Received\n\n                </button>\n\n                <button ion-item menuClose (click)="deliveryChargesPage()" *ngIf="(isAdmin || isSuperAdmin) && isAuthenticated">\n\n                        <img src="assets/imgs/ic_my_orders-2.png" class="img-transfer">\n\n                            Charges / Coupons\n\n                </button>\n\n                <button ion-item menuClose (click)="my_accountPage(\'profile\')" *ngIf="isAuthenticated">\n\n                    <img src="assets/imgs/ic_my_account.png ">\n\n                        Settings\n\n                </button>\n\n               <!--  <button ion-item menuClose (click)="helpPage()">\n\n                    <img src="assets/imgs/ic_help.png ">\n\n                        Help Center\n\n                </button>\n\n                <button ion-item menuClose (click)="ourMissionPage()">\n\n                    <img src="assets/imgs/ic_categories.png">\n\n                        Our Mission\n\n                </button>-->\n\n                <button ion-item menuClose (click)="aboutPage()">\n\n                    <img src="assets/imgs/ic_help.png">\n\n                    About us\n\n                </button>\n\n                <button ion-item menuClose (click)="phonenumberPage()" *ngIf="isAuthenticated">\n\n                    <img src="assets/imgs/ic_logout.png ">\n\n                        Logout\n\n                </button>\n\n            </ion-list>\n\n        </div>\n\n    </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage " #content swipeBackEnabled="false "></ion-nav>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_16__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_13__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_12__providers_apis_apis__["a" /* ApisProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchPage = (function () {
    function SearchPage(appCtrl, navCtrl, viewCtrl, helper, apisProvider) {
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.helper = helper;
        this.apisProvider = apisProvider;
        this.categoryItem = new Array();
        this.categoryItemForDisplay = new Array();
        this.helper.logMessage("storeid", this.helper.decode(localStorage.getItem("storeId")));
        this.storeId = this.helper.decode(localStorage.getItem("storeId"));
        if (this.storeId != "") {
            this.loadItemsForStore();
        }
    }
    SearchPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SearchPage.prototype.setFilteredItems = function (category) {
        this.helper.logMessage("searchItem", category);
        if (category.trim() !== 'all') {
            this.categoryItemForDisplay = this.categoryItem.filter(function (item) {
                return item.itemName.toLowerCase().indexOf(category.toLowerCase()) > -1;
            });
        }
    };
    SearchPage.prototype.loadItemsForStore = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/search', this.storeId)
            .then(function (data) {
            if (data["success"]) {
                _this.helper.logMessage("data", data);
                _this.categoryItem = data["data"];
                _this.categoryItemForDisplay = _this.categoryItem;
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Not able to fetch the details, please contact admin");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    SearchPage.prototype.itemdetail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__["a" /* ItemdetailPage */], {
            'item': item
        });
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-search ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\search\search.html"*/'<ion-content class="bg-light">\n\n    <div class="d-flex searchbar-section">\n\n        <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="setFilteredItems(searchTerm)" placeholder="Search Brand of product"></ion-searchbar>\n\n        <ion-list>\n\n            <!-- <ion-item *ngFor="let item of items">\n\n                {{ item }}\n\n            </ion-item> -->\n\n        </ion-list>\n\n        <ion-icon name="md-close" class="close-icon" (click)="dismiss()"></ion-icon>\n\n    </div>\n\n\n\n    <div class="recent-search">\n\n        <!-- <ion-card>\n\n             <ion-card-header>\n\n                Recent Search\n\n                <span text-right class="right">Clear History</span>\n\n            </ion-card-header> \n\n            <ion-card-content>\n\n                    <ion-list>\n\n                            <ion-item *ngFor="let item of categoryItem">\n\n                                {{item.itemName}}\n\n                            </ion-item>\n\n                        </ion-list>\n\n            </ion-card-content>\n\n        </ion-card> -->\n\n    </div> \n\n\n\n     <div class="trending-search">\n\n        <ion-card>\n\n            <ion-card-header>\n\n                Item Search\n\n            </ion-card-header>\n\n            <ion-card-content>\n\n                    <ion-list>\n\n                        <div *ngFor="let item of categoryItemForDisplay" >\n\n                            <ion-item (click)="itemdetail(item)">\n\n                                {{item.itemName}}\n\n                            </ion-item>\n\n                            </div>\n\n                        </ion-list>\n\n               \n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>  \n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\search\search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_3__providers_apis_apis__["a" /* ApisProvider */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhonenumberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_push__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__show_items_show_items__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shippining_shippining__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var PhonenumberPage = (function () {
    function PhonenumberPage(push, fb, googlePlus, menu, events, navCtrl, apisProvider, helper, _fb, alrtCtrl, navParms) {
        this.push = push;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.menu = menu;
        this.events = events;
        this.navCtrl = navCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this._fb = _fb;
        this.alrtCtrl = alrtCtrl;
        this.navParms = navParms;
        this.isSkipLogin = false;
        this.validation_messages = {
            'usernameOrEmail': [
                { type: 'required', message: 'Username is required.' },
                { type: 'minlength', message: 'Username must be at least 5 characters.' },
                { type: 'maxlength', message: 'Username cannot be more than 39 characters.' },
                { type: 'validUsername', message: 'Your username has already been taken.' }
            ],
            'password': [
                { type: 'required', message: 'This field is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters.' },
                { type: 'maxlength', message: 'Password cannot be more than 35 characters.' }
            ],
        };
        this.onLoginForm = this._fb.group({
            password: ['', __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["f" /* Validators */].maxLength(39),
                    __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["f" /* Validators */].minLength(5)
                ])],
            usernameOrEmail: ['', __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["f" /* Validators */].maxLength(25),
                    __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["f" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["f" /* Validators */].required
                ])],
            deviceId: []
        });
        this.pushSetUp();
        this.isSkipLogin = this.navParms.get("isSkipLogin");
    }
    PhonenumberPage.prototype.signUpPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignUpPage */]);
    };
    PhonenumberPage.prototype.login = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.onLoginForm.value.deviceId = this.deviceId;
        this.apisProvider.apiMethod(this.onLoginForm.value, 'api/auth/signin')
            .then(function (data) {
            _this.helper.logMessage("Login Data", data);
            if (!_this.helper.isEmpty(data["accessToken"])) {
                localStorage.setItem("accesskey", data["accessToken"]);
                _this.events.publish('user:loggedIn', data, Date.now());
                _this.apisProvider.stopSpinner();
                if (_this.helper.isEmpty(localStorage.getItem("cartData")) && _this.helper.isEmpty(localStorage.getItem("buyNowData")))
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                else if (!_this.helper.isEmpty(localStorage.getItem("cartData")))
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__show_items_show_items__["a" /* ShowItemsPage */]);
                else if (!_this.helper.isEmpty(localStorage.getItem("buyNowData")))
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__shippining_shippining__["a" /* ShippiningPage */]);
            }
            else {
                _this.apisProvider.openErrorAlert("Login Failed!", "Oops!, Somthing went wrong. Please check your credentials.");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Login Failed!", "Oops!, Somthing went wrong. Please check your credentials.");
        });
    };
    PhonenumberPage.prototype.loginWithGoogle = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.googlePlus.login({})
            .then(function (res) {
            res.deviceId = _this.deviceId;
            _this.apisProvider.apiMethod(res, 'api/auth/google')
                .then(function (data) {
                _this.helper.logMessage("Login Data", data);
                if (!_this.helper.isEmpty(data["accessToken"])) {
                    localStorage.setItem("accesskey", data["accessToken"]);
                    _this.events.publish('user:loggedIn', data, Date.now());
                    _this.apisProvider.stopSpinner();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.apisProvider.openErrorAlert("Login Failed!", "Oops!, Somthing went wrong. Please check your credentials.");
                    _this.apisProvider.stopSpinner();
                }
            }).catch(function (result) {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Login Failed!", "Oops!, Somthing went wrong. Please check your credentials.");
            });
        });
    };
    PhonenumberPage.prototype.loginWithFB = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.fb.login(['email', 'public_profile']).then(function (response) {
            _this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(function (profile) {
                _this.facebookData = { userID: response.authResponse.userID, email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'], deviceId: _this.deviceId };
                _this.apisProvider.apiMethod(_this.facebookData, 'api/auth/facebook')
                    .then(function (data) {
                    _this.helper.logMessage("Login Data", data);
                    if (!_this.helper.isEmpty(data["accessToken"])) {
                        localStorage.setItem("accesskey", data["accessToken"]);
                        _this.events.publish('user:loggedIn', data, Date.now());
                        _this.apisProvider.stopSpinner();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                    }
                    else {
                        _this.apisProvider.openErrorAlert("Login Failed!", "Oops!, Somthing went wrong. Please check your credentials.");
                        _this.apisProvider.stopSpinner();
                    }
                }).catch(function (result) {
                    _this.apisProvider.stopSpinner();
                    _this.apisProvider.openErrorAlert("Login Failed!", "Oops!, Somthing went wrong. Please check your credentials.");
                });
            }).catch(function (e) { return _this.apisProvider.openErrorAlert("Error", JSON.stringify(e)); });
        }).catch(function (e) { return _this.apisProvider.openErrorAlert("Error", JSON.stringify(e)); });
    };
    PhonenumberPage.prototype.pushSetUp = function () {
        var _this = this;
        var options = {
            android: {
                senderID: '200119753561'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('registration').subscribe(function (registration) {
            _this.deviceId = registration.registrationId;
        });
        pushObject.on('notification').subscribe(function (notification) { });
        pushObject.on('error').subscribe(function (error) { });
    };
    PhonenumberPage.prototype.forgotPass = function () {
        var _this = this;
        var forgot = this.alrtCtrl.create({
            title: 'Forgot Password?',
            message: "Please enter your email address",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email',
                    type: 'email'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        if (_this.isValidMailFormat(data.email)) {
                            _this.apisProvider.startSpinner();
                            _this.apisProvider.apiMethod(data.email, 'api/auth/forgotPassword')
                                .then(function (data) {
                                _this.apisProvider.stopSpinner();
                                if (data["success"]) {
                                    _this.apisProvider.presentToast(data["message"]);
                                }
                                else {
                                    _this.apisProvider.presentToast(data["message"]);
                                }
                            });
                            return true;
                        }
                        else {
                            _this.apisProvider.presentToast("Invalid Emial");
                            return false;
                        }
                    }
                }
            ]
        });
        forgot.present();
    };
    PhonenumberPage.prototype.isValidMailFormat = function (email) {
        var EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (EMAIL_REGEXP.test(email)) {
            return true;
        }
        return false;
    };
    PhonenumberPage.prototype.skipLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    PhonenumberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-phonenumber ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\phonenumber\phonenumber.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            <span float-right (click)="signUpPage()">Sign Up</span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <img src="assets/imgs/logo.png" class="center-img">\n\n    <div [formGroup]="onLoginForm" class="form" padding-left padding-right>\n\n        <p text-center>Please provide your Credentials<br> to Login on Store2Door</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-input placeholder="Username" formControlName="usernameOrEmail" type="text" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.usernameOrEmail" >\n\n                    <div class="error-message" *ngIf="onLoginForm.get(\'usernameOrEmail\').hasError(validation.type) && (onLoginForm.get(\'usernameOrEmail\').dirty || onLoginForm.get(\'usernameOrEmail\').touched)">\n\n                {{ validation.message }}\n\n                    </div>\n\n            </ng-container>\n\n            <ion-item>\n\n                <ion-input placeholder="Password" formControlName="password" type="password" text-left value=""></ion-input>\n\n            </ion-item>\n\n            <ng-container *ngFor="let validation of validation_messages.password" >\n\n                    <div class="error-message" *ngIf="onLoginForm.get(\'password\').hasError(validation.type) && (onLoginForm.get(\'password\').dirty || onLoginForm.get(\'password\').touched)">\n\n                {{ validation.message }}\n\n                    </div>\n\n            </ng-container>\n\n        </ion-list>\n\n        <div style="font-size: 13px;" text-right ion-text color="dark" tappable (click)="forgotPass()">Forgot Password?</div>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="login()" [disabled]="!onLoginForm.valid">Login</button>\n\n    </div>\n\n    <!--<p text-center ion-text color="dark">Or Sign in with:</p>\n\n\n\n					<ion-grid class="btn-group" fixed>\n\n						<ion-row>\n\n							<button style="background-color: #3b5998;" ion-button icon-only block class="btn-facebook col col-4 col-md-3 col-lg-2" (click)="loginWithFB()">\n\n								<ion-icon name="logo-facebook"></ion-icon>FACEBOOK\n\n							</button>\n\n							&nbsp;&nbsp;&nbsp;\n\n							<button style="background-color: #fa3838;" ion-button icon-only block class="btn-gplus col col-4 col-md-3 col-lg-2" (click)="loginWithGoogle()">\n\n								<ion-icon name="logo-googleplus"></ion-icon>GOOGLE\n\n							</button>\n\n						</ion-row>\n\n					</ion-grid> --><br>\n\n			<ion-row *ngIf="!isSkipLogin">\n\n				<ion-col col-3></ion-col>\n\n				<ion-col col-6>\n\n					<button padding ion-button class="bg-thime btn-round btn-text" (click)="skipLogin()">Get Started</button>\n\n				</ion-col>\n\n				<ion-col col-3></ion-col>\n\n			</ion-row>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\phonenumber\phonenumber.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], PhonenumberPage);
    return PhonenumberPage;
}());

//# sourceMappingURL=phonenumber.js.map

/***/ }),

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-end>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__show_items_show_items__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(menu, helper, navCtrl, modalCtrl, apisProvider) {
        this.menu = menu;
        this.helper = helper;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.apisProvider = apisProvider;
        this.stores = new Array();
        this.selectedStore = 0;
        this.categories = new Array();
        this.storeImages = new Array();
        this.userCart = new Array();
        this.showItems = false;
        this.couponsList = new Array();
        this.slides = [
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
        this.homeicons = [
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
        this.menu.enable(true);
    }
    HomePage.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData("api/stores/loadAllStores").then(function (data) {
            _this.stores = data;
            if (!_this.helper.isEmpty(localStorage.getItem("storeId"))) {
                _this.selectedStore = Number(_this.helper.decode(localStorage.getItem("storeId")));
                _this.showItems = true;
                _this.loadCategories();
                _this.populateStoreImages();
            }
        });
        this.apisProvider.stopSpinner();
        this.loadCoupons();
        if (!this.apisProvider.authenticated()) {
            this.apisProvider.loadData('api/userFlow/loadCart', '').then(function (data) {
                if (data["success"]) {
                    _this.userCart = data["loadCartData"];
                    _this.cartItemSize = _this.userCart.length;
                }
                else {
                    _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                }
            }).catch(function (result) {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            });
        }
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.menu.enable(true);
    };
    HomePage.prototype.populateStoreImages = function () {
        for (var i = 0; i < this.stores.length; i++) {
            if (this.selectedStore == this.stores[i].id) {
                this.storeImages = this.stores[i].storeImages;
            }
        }
    };
    HomePage.prototype.onStoreSelect = function (store) {
        this.selectedStore = store.id;
        this.showItems = true;
        this.loadCategories();
    };
    HomePage.prototype.onStoreChange = function (value) {
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
    };
    HomePage.prototype.loadCategories = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/stores/loadAllCategoriesForStore', this.selectedStore)
            .then(function (data) {
            if (data["success"]) {
                _this.categories = data["categoriesList"];
                _this.helper.logMessage("categoris==>", _this.categories);
                _this.populateStoreImages();
                _this.apisProvider.stopSpinner();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Not able to fetch the details, please contact admin");
                _this.apisProvider.stopSpinner();
            }
        });
    };
    HomePage.prototype.categoryPage = function (catgory) {
        localStorage.setItem("categoryId", this.helper.encode(catgory.id.toString()));
        localStorage.setItem("storeId", this.helper.encode(this.selectedStore.toString()));
        localStorage.setItem("categoryName", this.helper.encode(catgory.categoryName));
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__show_items_show_items__["a" /* ShowItemsPage */]);
    };
    HomePage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    HomePage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function (data) {
            _this.cartItemSize = data;
        });
        modal.present();
    };
    HomePage.prototype.loadCoupons = function () {
        var _this = this;
        this.apisProvider.loadData('api/stores/loadCoupons')
            .then(function (data) {
            if (data["success"]) {
                _this.couponsList = data["couponsList"];
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\home\home.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle style="display: block !important;">\n\n           <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>Store2Door\n\n            <div class="icon-box" *ngIf="this.apisProvider.authenticated()">\n\n                <img src="assets/imgs/ic_my_cart.png" (click)="cartPage()">\n\n                <ion-badge>{{cartItemSize}}</ion-badge>\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n<ion-slides pager *ngIf="!showItems" >\n\n        <ion-slide>\n\n            <img src="assets/imgs/welcome.png" class="slide-image img-responsive" />\n\n        </ion-slide>\n\n    </ion-slides><br>\n\n    <div *ngIf="!showItems">\n\n     <ion-row *ngFor="let coupon of this.couponsList">\n\n	    <ion-card>\n\n	       <ion-card-header>\n\n	            <ion-row>\n\n	            	<ion-col col-8>\n\n	            		<p style="font-family: \'Rokkitt\', serif;">FLAT {{coupon.couponOffer}}% OFF\n\n	            	 		<span style="font-family: \'Rokkitt\', serif;" *ngIf="coupon.couponType===helper.userFirstOrder">on First Order</span>\n\n	            	 		<span style="font-family: \'Rokkitt\', serif;" *ngIf="coupon.couponType!=helper.userFirstOrder">on All Orders</span>\n\n	            	 	</p>\n\n	            	 	<p style="font-size: 9px;"><span style="font-family: \'Rokkitt\', serif;">use COUPON CODE: </span><span style="font-family: \'Staatliches\', cursive;"><strong>{{coupon.couponCode}}</strong></span></p>\n\n	            		<p style="font-size: 9px; font-family: \'Rokkitt\', serif;">DISCOUNT UP TO {{coupon.maximumLimit  | currency:"₹":0}}</p>\n\n	            	</ion-col>\n\n	            	<ion-col col-4>\n\n	            		<img src="assets/imgs/special-offer.jpg" class="slide-image img-responsive" />\n\n	            	</ion-col>\n\n	           </ion-row>\n\n	       </ion-card-header>\n\n	   </ion-card>\n\n    </ion-row>\n\n    </div>\n\n     <h4 *ngIf="!showItems" text-center >Shop by Store</h4>\n\n    \n\n		<ion-row *ngIf="stores.length > 0 && !showItems">\n\n            <ion-col style="padding-left:12px" col-4 (click)="onStoreSelect(store)" *ngFor="let store of stores;let in = index;">\n\n	                <div class="item-box">\n\n	                    <img class ="img-circle" src="data:image/png;base64,{{store.storeImages[0]}}">\n\n	                    <h4 [innerHTML]="store.storeName"></h4>\n\n	                </div>\n\n	            </ion-col>\n\n          </ion-row>\n\n 	<div *ngIf="showItems">\n\n 	<ion-item>\n\n                <ion-label>Change Store</ion-label>\n\n                <ion-select #C (ionChange)="onStoreChange(C.value)" [(ngModel)]="selectedStore">\n\n                    <ion-option *ngFor="let store of stores" [value]="store.id">{{store.storeName}}</ion-option>\n\n                </ion-select>\n\n    </ion-item>\n\n    <ion-slides pager >\n\n        <ion-slide *ngFor="let storeImage of storeImages">\n\n            <img src="data:image/png;base64,{{storeImage}}" class="slide-image img-responsive" />\n\n        </ion-slide>\n\n    </ion-slides>\n\n\n\n    <h4 text-center >Shop by category</h4>\n\n\n\n    <div class="bg-white">\n\n        <ion-row>\n\n            <ion-col style="padding-left:12px" col-4 (click)="categoryPage(catgory)" *ngFor="let catgory of categories">\n\n                <div class="item-box">\n\n                    <img class ="img-circle" src="data:image/png;base64,{{catgory.categoryImages[0]}}">\n\n                    <h4 [innerHTML]="catgory.categoryName"></h4>\n\n                </div>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_apis_apis__["a" /* ApisProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowItemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__itemdetail_itemdetail__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__search_search__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__phonenumber_phonenumber__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ShowItemsPage = (function () {
    function ShowItemsPage(viewCtrl, params, modalCtrl, navCtrl, apisProvider, helper, toastCtrl) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.apisProvider = apisProvider;
        this.helper = helper;
        this.toastCtrl = toastCtrl;
        this.items = new Array();
        this.selectedCategoryName = "Store2Door";
        this.userCart = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["h" /* UserCart */]();
        this.userCartList = new Array();
        if (!this.helper.isEmpty(localStorage.getItem("cartData"))) {
            this.cartData = JSON.parse(localStorage.getItem("cartData"));
            this.userCart.itemId = this.cartData["itemId"];
            this.userCart.storeId = this.cartData["storeId"];
            this.userCart.totalPrice = this.cartData["itemPrice"];
            this.userCart.itemQuantity = this.cartData["itemQuantity"];
            this.addToCart1();
        }
    }
    ShowItemsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.storeIdForItems = Number(this.helper.decode(localStorage.getItem("storeId")));
        this.categoryIdForItems = Number(this.helper.decode(localStorage.getItem("categoryId")));
        this.selectedCategoryName = this.helper.decode(localStorage.getItem("categoryName"));
        this.onItemCategoryChange();
        if (this.apisProvider.authenticated()) {
            this.apisProvider.loadData('api/userFlow/loadCart', '').then(function (data) {
                if (data["success"]) {
                    _this.userCartList = data["loadCartData"];
                    _this.cartSize = _this.userCartList.length;
                    _this.helper.logMessage("homeCart", _this.cartSize);
                }
                else {
                    _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                }
            }).catch(function (result) {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            });
        }
    };
    ShowItemsPage.prototype.onItemCategoryChange = function () {
        var _this = this;
        this.apisProvider.loadData('api/stores/loadAllItemsForStore', this.categoryIdForItems)
            .then(function (data) {
            if (data["success"]) {
                _this.items = data["itemsList"];
                _this.helper.logMessage("itemsList==>", _this.items);
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Not able to fetch the details, please contact admin");
            }
        });
    };
    ShowItemsPage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function (data) {
            _this.cartSize = data;
        });
        modal.present();
    };
    ShowItemsPage.prototype.addToCart = function (itemData, index) {
        if (!this.apisProvider.authenticated()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__phonenumber_phonenumber__["a" /* PhonenumberPage */], {
                'isSkipLogin': true
            });
            var cartData = {
                "itemId": itemData.id,
                "itemPrice": itemData.itemPrice,
                "itemQuantity": itemData.itemQuantity,
                "storeId": itemData.storeId
            };
            localStorage.setItem("cartData", JSON.stringify(cartData));
        }
        else {
            this.userCart.itemId = itemData.id;
            this.userCart.storeId = itemData.storeId;
            this.userCart.totalPrice = itemData.itemPrice;
            this.userCart.itemQuantity = itemData.itemQuantity;
            this.addToCart1();
        }
    };
    ShowItemsPage.prototype.addToCart1 = function () {
        var _this = this;
        this.apisProvider.loadData('api/userFlow/addCart', this.userCart).then(function (data) {
            _this.helper.logMessage("cartStatus", data);
            if (data["success"]) {
                _this.presentToast();
                _this.userCartList = data["cartData"];
                _this.cartSize = _this.userCartList.length;
                localStorage.removeItem("cartData");
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShowItemsPage.prototype.dismiss = function () {
        var _this = this;
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
        this.apisProvider.loadData('api/userFlow/loadCart', '').then(function (data) {
            if (data["success"]) {
                _this.userCartList = data["loadCartData"];
                _this.cartSize = _this.userCartList.length;
                _this.helper.logMessage("homeCart", _this.cartSize);
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShowItemsPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Item added successfully',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    ShowItemsPage.prototype.itemdetailPage = function (itemId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__itemdetail_itemdetail__["a" /* ItemdetailPage */], {
            'item': itemId
        });
    };
    ShowItemsPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    ShowItemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-show-items ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\show-items\show-items.html"*/'<ion-header class="bg-thime">\n\n        <ion-navbar>\n\n        	 <button ion-button menuToggle>\n\n		     <img src="assets/imgs/ic_menu.png">\n\n		    </button>\n\n            <ion-title>{{selectedCategoryName}}\n\n                    <div class="icon-box">\n\n                            <img src="assets/imgs/search.png" (click)="searchPage()">\n\n                            <img *ngIf="this.apisProvider.authenticated()"src="assets/imgs/ic_my_cart.png" (click)="cartPage()">\n\n                            <ion-badge *ngIf="this.apisProvider.authenticated()">{{cartSize}}</ion-badge>\n\n                    </div>\n\n            </ion-title>\n\n        </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n          <ion-row *ngIf="items.length > 0">\n\n            <ion-col col-6 *ngFor="let item of items;let in = index;">\n\n                <ion-card>\n\n                        <ion-card-header style="white-space: inherit;" (click)="itemdetailPage(item)">\n\n                            <h5 style="font-size: 1.2rem;" [innerHTML]="item.itemName"></h5>\n\n                           <!--  <small class="text-light" [innerHTML]="item.itemDescription"></small> -->\n\n                            <div class="item-box">\n\n                                <img style="border-radius: 50%;" src="data:image/png;base64,{{item.itemsImages[0]}}" style="height: 100px;">\n\n                            </div>\n\n                        </ion-card-header>\n\n                        <ion-card-content>\n\n                        	<p> <span *ngIf="item.marketPrice !=0" style="text-decoration-line: line-through;"><i class="fa fa-rupee"></i>{{item.marketPrice}}</span>\n\n                            <i class="fa fa-rupee"></i><span [innerHTML]="item.itemPrice">&nbsp;</span>&nbsp;<small>per {{item.itemQuantity}} {{item.unitofMesure}}</small>\n\n                            </p>\n\n                            <button ion-button icon-start block color="secondary" style="font-size: 10px; height:30px; border-radius: 5px;" (click)="addToCart(item,in)"> ADD TO CART\n\n                            </button>\n\n                        </ion-card-content>\n\n                </ion-card>\n\n            </ion-col>\n\n          </ion-row>\n\n        <ion-content *ngIf="items.length == 0">\n\n                <ion-card>\n\n                        <ion-card-header>\n\n                            ---No Items Found---\n\n                        </ion-card-header>\n\n                    </ion-card>\n\n        </ion-content>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\show-items\show-items.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], ShowItemsPage);
    return ShowItemsPage;
}());

//# sourceMappingURL=show-items.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShippiningPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_helpers_helper__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_apis_apis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payment_payment__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__address_address__ = __webpack_require__(359);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ShippiningPage = (function () {
    function ShippiningPage(modalCtrl, navCtrl, navParms, helper, apisProvider, popup) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParms = navParms;
        this.helper = helper;
        this.apisProvider = apisProvider;
        this.popup = popup;
        this.orderdedDetails = new Array();
        this.deviveryAddress = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["c" /* DeliveryAddress */]();
        this.addressList = new Array();
        this.deliveryCharges = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["d" /* DeliveryCharges */]();
        this.couponsList = new Array();
        this.couponCode = "";
        this.couponDicount = 0;
        this.myOrderDetails = new Array();
        this.myOrderHistoryDetailsForDisplay = new Array();
        this.isValidCoupon = false;
        this.isInvalidCoupon = false;
        this.isNotFirstOrder = false;
        this.isDateExpired = false;
        this.addCartData = new __WEBPACK_IMPORTED_MODULE_5__models_ModelObjects__["h" /* UserCart */]();
        if (!this.helper.isEmpty(localStorage.getItem("buyNowData"))) {
            this.cartData = JSON.parse(localStorage.getItem("buyNowData"));
            this.addCartData.itemId = this.cartData["itemId"];
            ;
            this.addCartData.storeId = this.cartData["storeId"];
            this.addCartData.totalPrice = this.cartData["itemPrice"];
            this.addCartData.itemQuantity = this.cartData["itemQuantity"];
            this.buyNow1();
        }
        else {
            this.orderdedDetails = [];
            this.orderdedDetails = this.navParms.get("orderData");
        }
        this.totalAmountCalculation();
        this.loadAllAddress();
        this.loadDeliveryCharges();
        this.estimatedDeliveryDate = new Date();
        this.estimatedDeliveryDate.setHours(this.estimatedDeliveryDate.getHours() + 1);
        this.loadCoupons();
        this.loadOrderedDetails();
        this.loadOrderedHistoryDetails();
    }
    ShippiningPage.prototype.paymentPage = function () {
        if (this.totalVal < this.deliveryCharges.deliveryAmountLimit)
            this.totalVal = this.totalVal + this.deliveryCharges.deliveryCharge;
        this.totalVal = this.totalVal - this.couponDicount;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__payment_payment__["a" /* PaymentPage */], {
            "tatalAmount": this.totalVal,
            "develiryAddress": this.addressList[this.selectedAddress],
            "orderDetails": this.orderdedDetails
        });
    };
    ShippiningPage.prototype.totalAmountCalculation = function () {
        var _this = this;
        this.totalVal = 0;
        this.orderdedDetails.forEach(function (val, i) {
            _this.totalVal = _this.totalVal + (val.totalPrice * val.itemQuantity);
        });
    };
    ShippiningPage.prototype.decreaseQuality = function (itemData) {
        var _this = this;
        this.apisProvider.startSpinner();
        itemData.itemQuantity = itemData.itemQuantity - 1;
        this.apisProvider.loadData('api/userFlow/addCart', itemData).then(function (data) {
            _this.helper.logMessage("cartStatus", data);
            if (data["success"]) {
                _this.apisProvider.stopSpinner();
                _this.orderdedDetails = data["cartData"];
                _this.totalAmountCalculation();
                _this.applyCoupon();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShippiningPage.prototype.increaseQuality = function (itemData, index) {
        var _this = this;
        this.apisProvider.startSpinner();
        itemData.itemQuantity = itemData.itemQuantity + 1;
        this.apisProvider.loadData('api/userFlow/addCart', itemData).then(function (data) {
            _this.helper.logMessage("cartStatus", data);
            if (data["success"]) {
                _this.apisProvider.stopSpinner();
                _this.orderdedDetails = data["cartData"];
                _this.totalAmountCalculation();
                _this.applyCoupon();
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
                _this.apisProvider.stopSpinner();
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShippiningPage.prototype.addressPopup = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__address_address__["a" /* AddressPage */]);
        modal.onDidDismiss(function (data) {
            if (data == "saved") {
                _this.loadAllAddress();
            }
        });
        modal.present();
    };
    ShippiningPage.prototype.removeItem = function (itemData) {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/userFlow/deleteItemFromCart', itemData).then(function (data) {
            if (data["success"]) {
                _this.apisProvider.stopSpinner();
                _this.orderdedDetails = data["loadCartData"];
                _this.totalAmountCalculation();
            }
            else {
                _this.apisProvider.stopSpinner();
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShippiningPage.prototype.loadAllAddress = function () {
        var _this = this;
        this.apisProvider.loadData('api/order/loadAddress', '')
            .then(function (data) {
            _this.addressList = data["address"];
            if (_this.addressList.length == 0) {
                _this.addressPopup();
            }
        });
    };
    ShippiningPage.prototype.loadDeliveryCharges = function () {
        var _this = this;
        this.apisProvider.startSpinner();
        this.apisProvider.loadData('api/order/getDeliveryCharges')
            .then(function (data) {
            _this.apisProvider.stopSpinner();
            if (data["success"]) {
                if (!_this.helper.isEmpty(data.data)) {
                    _this.deliveryCharges = data.data;
                }
            }
        }).catch(function (result) {
            _this.apisProvider.stopSpinner();
            _this.apisProvider.openErrorAlert("Failed!", "Data not saved, please contact admin");
        });
    };
    ShippiningPage.prototype.loadCoupons = function () {
        var _this = this;
        this.apisProvider.loadData('api/stores/loadCoupons', '')
            .then(function (data) {
            if (data["success"]) {
                _this.couponsList = data["couponsList"];
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShippiningPage.prototype.applyCoupon = function () {
        for (var i = 0; i < this.couponsList.length; i++) {
            if (this.couponsList[i].couponCode == this.couponCode) {
                var today = new Date();
                today.setHours(0, 0, 0, 0);
                var expiryDate = new Date(this.couponsList[i].expiryDate.split("T")[0]);
                expiryDate.setHours(0, 0, 0, 0);
                if (expiryDate >= today) {
                    if (this.couponsList[i].couponType == this.helper.userFirstOrder) {
                        if (this.myOrderDetails.length === 0 && this.myOrderHistoryDetailsForDisplay.length === 0) {
                            this.isValidCoupon = true;
                            this.isInvalidCoupon = false;
                            this.isDateExpired = false;
                            this.isNotFirstOrder = false;
                            this.couponDicount = (this.couponsList[i].couponOffer * this.totalVal) / 100;
                            if (this.couponDicount > this.couponsList[i].maximumLimit)
                                this.couponDicount = this.couponsList[i].maximumLimit;
                        }
                        else {
                            this.isDateExpired = false;
                            this.isNotFirstOrder = true;
                            this.isInvalidCoupon = false;
                            this.isValidCoupon = false;
                        }
                    }
                    else {
                        this.isValidCoupon = true;
                        this.isInvalidCoupon = false;
                        this.isDateExpired = false;
                        this.isNotFirstOrder = false;
                        this.couponDicount = (this.couponsList[i].couponOffer * this.totalVal) / 100;
                        if (this.couponDicount > this.couponsList[i].maximumLimit)
                            this.couponDicount = this.couponsList[i].maximumLimit;
                    }
                }
                else {
                    this.isDateExpired = true;
                    this.isValidCoupon = false;
                    this.isInvalidCoupon = false;
                    this.isNotFirstOrder = false;
                }
                break;
            }
            else {
                this.isInvalidCoupon = true;
                this.isValidCoupon = false;
                this.isDateExpired = false;
                this.isNotFirstOrder = false;
                this.couponDicount = 0;
            }
        }
    };
    ShippiningPage.prototype.loadOrderedDetails = function () {
        var _this = this;
        this.apisProvider.loadData('api/order/loadOrderedDetails', '')
            .then(function (data) {
            if (data["success"]) {
                _this.myOrderDetails = data["data"];
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShippiningPage.prototype.loadOrderedHistoryDetails = function () {
        var _this = this;
        this.apisProvider.loadData('api/order/loadOrderedHistoryDetails', '')
            .then(function (data) {
            if (data["success"]) {
                _this.myOrderHistoryDetailsForDisplay = data["data"];
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShippiningPage.prototype.populateDate = function (date) {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    };
    ShippiningPage.prototype.buyNow1 = function () {
        var _this = this;
        this.apisProvider.loadData('api/userFlow/addCart', this.addCartData).then(function (data) {
            _this.helper.logMessage("cartStatus", data);
            if (data["success"]) {
                _this.orderdedDetails = data["cartData"];
                localStorage.removeItem("buyNowData");
            }
            else {
                _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
            }
        }).catch(function (result) {
            _this.apisProvider.openErrorAlert("Failed!", "Somenting Went Worng, Please Try Again..!");
        });
    };
    ShippiningPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-shippining ',template:/*ion-inline-start:"D:\git\store-2-door-ui\src\pages\shippining\shippining.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n    <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>Confirm order</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n	<div style="text-align: center;margin-top: 160px;" *ngIf="orderdedDetails.length==0">\n\n		<ion-icon style="font-size: 8.2em;" ios="ios-cart" md="md-cart"></ion-icon>\n\n		<h5>Your Shopping Cart is empty</h5>\n\n	</div>\n\n    <div class="address-section" *ngIf="orderdedDetails.length!=0">\n\n        <ion-row text-center class="status">\n\n            <ion-col class="complate">\n\n                <ion-icon name="ios-checkmark-circle"></ion-icon><span>Sign in</span></ion-col>\n\n            <ion-col class="processing">\n\n                <ion-icon name="md-radio-button-off"></ion-icon><span>Shipping</span></ion-col>\n\n            <ion-col class="panding">\n\n                <ion-icon name="ion-record"></ion-icon><span>Payment</span></ion-col>\n\n        </ion-row>\n\n        <ion-card *ngIf="orderdedDetails.length!=0">\n\n            <ion-card-header>\n\n                <p>\n\n                    YOUR DELIVERY ADDRESS<span class="text-sky" (click)="addressPopup()">Add Address<ion-icon name="ios-arrow-forward" class="icon"></ion-icon></span></p>\n\n            </ion-card-header>\n\n            <ion-card-content>\n\n            	<ion-list radio-group [(ngModel)]="selectedAddress">\n\n				  <ion-item *ngFor="let address of addressList;let idx = index">\n\n				  <ion-radio value={{idx}}></ion-radio>\n\n				    <ion-label>\n\n					    <div class="addres-detail">\n\n		                    <h3>\n\n		                        <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{address.name}}\n\n		                    </h3>\n\n		                    <p>{{address.address}},{{address.streetAddress}}<br>LandMark: {{address.landMark}}<br> {{address.pin}}.<br>{{address.state}}<br>{{address.city}}</p>\n\n		                    <p>{{address.contNo}}</p>\n\n	                	</div>\n\n                	</ion-label>\n\n				  </ion-item>\n\n				</ion-list>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n    <div class="your-items" *ngFor="let orders of orderdedDetails;">\n\n        <ion-card>\n\n            <ion-card-header>\n\n                <p>YOUR ITEMS</p>\n\n            </ion-card-header>\n\n            <ion-card-content>\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <div class="img-circle">\n\n                            <img src="data:image/png;base64,{{orders.base64Image}}" style="height: 100px;">\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <h4>{{orders.categoryItemName}}<br></h4>\n\n                        <p class="d-flex">\n\n                            {{orders.totalPrice}}<span class="d-flex">per {{orders.unitofMesure}}\n\n                                <ion-icon name="md-arrow-dropdown"></ion-icon>\n\n                            </span>\n\n                        </p>\n\n                        <div class="price ">\n\n                            <div class="d-flex">\n\n                                <p class="text-red" (click)="removeItem(orders);">\n\n                                    Remove\n\n                                </p>\n\n                                <div class="d-flex btn-grup" >\n\n                                     <div class="btn text-white bg-thime green-shadow " *ngIf="orders.itemQuantity > 1" (click)="decreaseQuality(orders)">\n\n                                        -\n\n                                    </div> \n\n                                    <b><span>{{orders.itemQuantity}} {{orders.unitofMesure}}</span></b>\n\n                                    <div class="btn text-white bg-thime green-shadow "(click)="increaseQuality(orders)">\n\n                                        +\n\n                                    </div> \n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n    <div *ngIf="orderdedDetails.length!=0">\n\n   	 <ion-card padding>\n\n       <p><span>Delivery by <strong>{{estimatedDeliveryDate | date: \'d MMMM, EEEE, h:mm a\'}}</strong></span></p>\n\n     </ion-card>\n\n      <ion-card padding *ngIf="couponsList.length">\n\n      	<label>Apply Promo Code</label>\n\n      	<ion-row>\n\n      		<ion-col col-9><ion-input type="text" placeholder="Type Promo code" [(ngModel)]="couponCode"></ion-input></ion-col>\n\n      		<ion-col col-3 style="padding-top: 17px;"><span style="color: blue;" (click)="applyCoupon()">Apply</span></ion-col>\n\n      	</ion-row>\n\n       	<hr>\n\n       	<label *ngIf="isValidCoupon" style="color: #39c526;">Promo Code Applied Successfully</label>\n\n       	<label *ngIf="isInvalidCoupon && couponCode != \'\'" style="color: #ff0000;">Invalid Promo Code</label>\n\n        <label *ngIf="isNotFirstOrder" style="color: #ff0000;">This Promo code Applicable for only First order</label>\n\n        <label *ngIf="isDateExpired" style="color: #ff0000;">This Promo code has Expired</label>\n\n      </ion-card>\n\n     <ion-card>\n\n            <ion-card-header>\n\n                <p>Order price<span text-right>{{totalVal| currency:"₹":0}}</span></p>\n\n                <p *ngIf="isValidCoupon">Promo Code Discount <span text-right>- {{couponDicount | currency:"₹":0}}</span></p>\n\n                <p *ngIf="totalVal<deliveryCharges.deliveryAmountLimit">Delivery Charges<span text-right>+ {{deliveryCharges.deliveryCharge | currency:"₹":0}}</span></p>\n\n            </ion-card-header>\n\n        </ion-card>\n\n        <ion-card *ngIf="totalVal<deliveryCharges.deliveryAmountLimit">\n\n            <ion-card-header>\n\n            	 <p>Total Order price<span text-right>{{totalVal+deliveryCharges.deliveryCharge-couponDicount| currency:"₹":0}}</span></p>\n\n            </ion-card-header>\n\n        </ion-card>\n\n        <ion-card *ngIf="totalVal>deliveryCharges.deliveryAmountLimit">\n\n            <ion-card-header>\n\n            	 <p>Total Order price<span text-right>{{totalVal-couponDicount| currency:"₹":0}}</span></p>\n\n            </ion-card-header>\n\n        </ion-card>\n\n     </div>\n\n        <br><br><br>\n\n</ion-content>\n\n<ion-footer class="bg-thime">\n\n <button ion-button full class="bg-green btn-round green-shadow btn-text" *ngIf="selectedAddress && addressList != \'\' && orderdedDetails.length!=0" (click)="paymentPage()">CONTINUE</button>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\git\store-2-door-ui\src\pages\shippining\shippining.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_helpers_helper__["a" /* Helper */], __WEBPACK_IMPORTED_MODULE_3__providers_apis_apis__["a" /* ApisProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ShippiningPage);
    return ShippiningPage;
}());

//# sourceMappingURL=shippining.js.map

/***/ })

},[374]);
//# sourceMappingURL=main.js.map