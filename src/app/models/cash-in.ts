export class WaybillDeposit{
    amount: number = 0;
    awbNumber: string;
    awbStatus: string = "";
    code: string = "";
    codType: string;
    courierName:string="";
    isChecked : boolean = false;
    paymentMethodCode : string;
    status : string = "";
    waybillType : string = "";
    transactionDate: Date = new Date();
    deliveryDate: Date = new Date();
}

export class CashDeposit{
    code : string = "";
    createdBy : string = "";
    branchCode : string = "";
    grandTotal : number;
    status : string = "";
    type : string = "";
    totalWaybill : number;
    createdDate: Date = new Date();
    cashDepositItems : CashDepositItem[] = [];
}

export class CashDepositItem{
    amount : number = 0;
    awbNumber : string = "";
    code : string = ""
    codeDepositCode : string = ""
    codType : string = "";
    branchCode : string = "";
    grandTotal : number;
    status : string = "";
    paymentMethodCode : string = "";
    transactionDate: Date = new Date();
}