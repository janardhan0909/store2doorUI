export class SignUpRequest{
    id:number;
    name : string;
    username : string;
    email : string;
    password : string;
    phoneNumber : string;
    newPassword:string;
}
export class LoginRequest{
    usernameOrEmail : string;
    password : string;
}
export class MrGreenStores{
    id: number;
    storeName: string;
    storeLocation: string;
    storePhoneNumber: string;
    storeEmail: string;
    deleteFlag : any;
    storeAdminId : number;
    userId : number;
    storeImages:string[];
}
export class StoreCategories{
    id : number;
    categoryName: string;
    categoryDescription: string;
    deleteFlag : any;
    storeId: number;
    categoryImages:string[] = new Array();
}
export class CategoryItems{
    id:number;
    itemName:string;
    itemDescription:string;
    itemPrice:number;
    itemQuantity:number;
    deleteFlag:any;
    storeId:number;
    categoryId:number;
    unitofMesure: string;
    itemsImages:string[];
    marketPrice:number;
    displayOrder:number;
}
export class UserCart{
    id: number;
    itemId: number;
    categoryItemName: string;
    storeId: number;
    mrGreenStoreName: string;
    itemQuantity: number;
    totalPrice: number;
    itemStatus:string
    packed:string;
    shipped:string;
    delivery:string
    rating:number;
    reviewComments:string;
}
export class DeliveryAddress{
    id: number;
    name: string;
    address: string;
    streetAddress: string;
    pin: string;
    state: string;
    contNo: string;
    city: string;
}
export class UserOrderDetails{
    orderForm:number;
    paymentType:string;
    totalPrice:number;
    orderAddressId:number;
    orderItemsData:UserCart[];
    orderStatus:string;
    orderPlacedItems:UserCart[];
    shippedItmes:UserCart[];
    outForDelieryItems:UserCart[];
    cancelledItems:UserCart[];
    deliveredItems:UserCart[];
}
export class LookUpItems{
    id:number;
    key:string;
    value:string;
    displayOrder:string;
    createdBy:number;
}
export class UserOrderItem{
    id:number;
    itemId:number;
    itemQuantity:number;
    itemPrice:number;
    orderId:number
    temStatus:string;
}
export class ZipCode{
    id:number;
    city:string;
    district:string;
    pincode:string;
    state:string;
    country:string;
}
export class DeliveryCharges{
    id:number;
    deliveryCharge:number;
    deliveryAmountLimit:number;
}
export class Coupons{
    id:number;
    couponCode:any;
    expiryDate:any;
    couponOffer:any
    couponType:any;
    maximumLimit:any;
}