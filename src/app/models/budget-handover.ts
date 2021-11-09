export class BudgetHandover{
    amount: number;
    branchCode: string;
    code: string;
    createdBy: string;
    creator: string;
    month: string = "";
    message : string;
    note: string = "";
    receiver : string;
    status: string;
    total: number;
    week: string = "";
    year : number = 0;
    receivedDate: Date = new Date();
    createdDate: Date;
}