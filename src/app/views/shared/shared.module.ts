import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  BsDatepickerModule,
  PaginationModule,
  ModalModule,
  BsDropdownModule,
  AlertModule,
  TabsModule,
  TimepickerModule,
  TypeaheadModule 
} from 'ngx-bootstrap';

import { CardLoaderComponent } from './card-loader/card-loader.component';
import { DescriptionBlockComponent } from './description-block/description-block.component';
import { ToastrModule } from '../../../../node_modules/ngx-toastr';
import { NgxCurrencyModule } from "ngx-currency";
import { FilterPipeModule } from 'ngx-filter-pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxCurrencyModule,
    FilterPipeModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot() // ToastrModule added
  ],
  declarations: [
    CardLoaderComponent,
    DescriptionBlockComponent
  ],
  providers: [
    
  ],
  exports: [
    NgxCurrencyModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule,
    BsDatepickerModule,
    TimepickerModule,
    PaginationModule,
    ModalModule,
    AlertModule,
    TabsModule,
    TypeaheadModule,
    ToastrModule,
    
    CardLoaderComponent,
    DescriptionBlockComponent
  ]
})
export class SharedModule { }
