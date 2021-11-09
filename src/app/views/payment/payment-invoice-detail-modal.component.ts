import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice, InvoiceItems } from '../../models';
import { InvoiceService } from '../../services';
import * as moment from 'moment';


@Component({
  templateUrl: './payment-invoice-detail-modal.component.html',
  styleUrls: ['./payment-invoice-detail-modal.component.scss']
})
export class PaymentInvoiceDetailComponent implements OnInit {

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  public isModalShown: boolean = true;
  private code: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private invoiceService : InvoiceService
  ){
    let params = this.activatedRoute.snapshot.params;
    this.code = params.code;
  }
  
  public loading: boolean = false;
  public data: Invoice;
  public invoiceitems: InvoiceItems[] = [];

  ngOnInit() {
    this.getData(this.code);
  }  

  getData(code: string){
    this.loading = true;

    this.invoiceService.get(code).subscribe(res => {
      this.loading = false;
      this.data = res;
      this.invoiceitems = this.data.items;
      this.invoiceitems.forEach(element =>{
        element.dueDate = new Date(moment.utc(element.dueDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    },res =>{
      this.loading = false;
      let error = res.error;
    });
  }

  onHidden() {
    this.router.navigate(['payment/create']);
  }  

  closeModal() {
    this.router.navigate(['payment/create']);
  }
}