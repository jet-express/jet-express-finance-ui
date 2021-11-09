import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService, VendorService, InvoiceService, AuthService } from '../../services';
import { Invoice, InvoiceItems, Branch, UserProfile } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import * as moment from 'moment';

@Component({
  templateUrl: 'invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  public currentBranch: Branch;
  public user : UserProfile;

  constructor(
    private authService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private invoiceService: InvoiceService,
    private vendorService: VendorService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.currentBranch = this.authService.getCurrentBranch();
    this.user = this.authService.getCurrentUserProfile();

    this.dataVendor = Observable.create((observer: any) => {
      this.loadingVendor = true;
      this.vendorService.getVendor(this.vendorSelected).then((result: any) => {
        var data = result.data.map(dt => {
          return { id: dt.id, name: dt.name, label: dt.label }
        })
        observer.next(data);
        this.loadingVendor = false;
      })
    });
  }

  public dataVendor: Observable<any>;
  public vendorSelected: string = '';
  public data: Invoice = new Invoice();
  public result: Invoice = new Invoice();
  public period: string = "";
  public loadingVendor: boolean = false;
  public loading: boolean = false;
  public loadingPo: boolean = false;
  public noResult: boolean;
  public isSelected: boolean = false;
  public isPrinting: boolean = false;
  public errors = [];

  ngOnInit() {
    this.addRow();
  }


  save(data: Invoice) {
    this.errors = [];
    this.loading = true;
    this.data.branchCode = this.currentBranch.code;
    this.data.creator = this.user.fullname;

    this.invoiceService.create(data)
      .subscribe(res => {
        this.loading = false;
        this.result = res;
        this.isPrinting = true;
        this.toastrService.success(`Success`);
      }, res => {
        this.loading = false;
        let error = res.error;
        this.toastrService.error(error.message || 'An error has occurred');
        this.errors = error.errors;
      });
  }

  getPo(i) {
    var month = new Array();
    month[0] = "Januari";
    month[1] = "Februari";
    month[2] = "Maret";
    month[3] = "April";
    month[4] = "Mei";
    month[5] = "Juni";
    month[6] = "Juli";
    month[7] = "Agustus";
    month[8] = "September";
    month[9] = "Oktober";
    month[10] = "November";
    month[11] = "Desember";
    if (this.data.invoiceItems[i].purchaseOrderCode != "") {
      this.loadingPo = true;
      this.purchaseOrderService.getPoByVendor(this.data.vendorName, this.data.invoiceItems[i].purchaseOrderCode)
        .subscribe(res => {
          if (res.data.length > 0) {
            this.loadingPo = false;

            var existingPoCode = this.data.invoiceItems.filter(x => x.purchaseOrderCode == res.data[0].code);
            if (existingPoCode.length > 1) {
              this.toastrService.error("Purchase order code " + this.data.invoiceItems[i].purchaseOrderCode + " has been added ");
              this.data.invoiceItems[i].purchaseOrderCode = "";
              return;
            }

            this.data.invoiceItems[i].type = res.data[0].type;
            this.data.invoiceItems[i].startPeriod = new Date(moment.utc(res.data[0].startPeriod).local().format('YYYY-MM-DD HH:mm:ss'));
            this.data.invoiceItems[i].endPeriod = new Date(moment.utc(res.data[0].endPeriod).local().format('YYYY-MM-DD HH:mm:ss'));

            var startPeriod = this.data.invoiceItems[i].startPeriod.getDate() + " " + month[this.data.invoiceItems[i].startPeriod.getMonth()] + " " + this.data.invoiceItems[i].startPeriod.getFullYear();
            var endPeriod = this.data.invoiceItems[i].endPeriod.getDate() + " " + month[this.data.invoiceItems[i].endPeriod.getMonth()] + " " + this.data.invoiceItems[i].endPeriod.getFullYear();
            if (res.data[0].startPeriod != "" && res.data[0].endPeriod != "")
              this.data.invoiceItems[i].period = startPeriod + " s/d " + endPeriod;
            else
              this.data.invoiceItems[i].period = " - ";

            this.data.invoiceItems[i].poQuatity = 0;
            res.data[0].items.forEach(element => {
              this.data.invoiceItems[i].poQuatity += element.quantity;
              this.data.invoiceItems[i].unitOfMeasure = element.unitOfMeasure;
            });
          } else {
            this.loadingPo = false;
            this.toastrService.error("Purchase order code " + this.data.invoiceItems[i].purchaseOrderCode + " is not found ");
            this.data.invoiceItems[i].purchaseOrderCode = "";
          }
        });
    }
  }

  addRow() {
    this.data.invoiceItems.push(new InvoiceItems());
  }

  deleteRow(index) {
    this.data.invoiceItems.splice(index, 1);
  }

  changePo(i) {
    this.data.invoiceItems[i].poQuatity = 0;
    this.data.invoiceItems[i].period = "";
    this.data.invoiceItems[i].type = "";
  }


  changeTypeaheadLoading(e: boolean): void {
    this.loadingVendor = e;
    this.data.vendorId = "";
    this.data.vendorName = "";
    this.isSelected = false;
    this.data.invoiceItems.forEach(element => {
      element.purchaseOrderCode = "";
      element.poQuatity = 0;
      element.period = "";
      element.type = "";
    });
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  onSelect(event: TypeaheadMatch): void {
    this.data.vendorId = event.item.id;
    this.data.vendorName = event.item.name;
    this.isSelected = true;
  }
}
