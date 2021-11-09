export class Budget{
    branchCode: string;
    code: string;
    createdBy: string;
    grandTotal: number = 0;
    month: string = "";
    status: string = "";
    year : number = 0;
    createdDate: Date = new Date();
    vmBudgetItems : VMBudgetItem[] = [];
    budgetItems : BudgetItem[] = [];
}

export class VMBudgetItem{
    budgetType : string ="";
    week1 : number;
    week2 : number;
    week3 : number;
    week4 : number;
    week5 : number;
    typeSum : number = 0;
}

export class BudgetItem{
    type : string = "";
    week : string = "";
    amount : number = 0;
}