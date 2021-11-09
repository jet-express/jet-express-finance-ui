export class PurchaseOrder{
    code : string;
    type : string = "";
    branchCode : string;
    vendorId:string;
    vendorName : string;
    creator : string;
    manifestNo : string;
    status: string;
    startPeriod : Date;
    endPeriod : Date;
    createdDate : Date;
    grandTotal : number;
    purchaseOrderItems : PurchaseOrderItem[] = [];
    data : any;
    items : PurchaseOrderItem[] = [];
}

export class PurchaseOrderItem{
    name : string;
    quantity : number;
    unitOfMeasure : string;
    unitPrice : number;
}