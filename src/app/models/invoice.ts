export class Invoice{
    code : string;
    type : string;
    branchCode : string;
    vendorId:string;
    vendorName : string;
    creator : string;
    status: string;
    note: string;
    startPeriod : Date;
    endPeriod : Date;
    createdDate : Date;
    remainingAmount : number;
    invoiceItems : InvoiceItems[] = [];
    items : InvoiceItems[] = [];
}

export class InvoiceItems{
    purchaseOrderCode : string;
    vendorInvoiceNo : string;
    type : string;
    dueDate : Date;
    startPeriod : any;
    endPeriod : any;
    poQuatity : number;
    invoiceQuantity : number;
    unitOfMeasure : string;
    unitPrice : number;
    totalBill : number;
    totalBillPo : number;
    deviation : number;
    note : string;
    period : string;
    isDisabled : boolean = false;
}