import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagina } from '../../../model/comum/pagina.model';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent implements OnInit {

  size = 10;
  page;
  @Input('page') public set value(page: any) {
      if (!page) {
        return;
      }
      this.page = page;
      this.setPagetion();
  }
  @Output() public  paginationEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  changePage(page?) {
    setTimeout(() => {
        this.paginationEvent.emit({page: page ? page : 0, size: this.size});
    });
  }

  changeTotal(total?) {
    this.size = total;
    setTimeout(() => {
        this.paginationEvent.emit({page: 0, size: total});
    });
  }

  setPagetion() {
      const pages = new Array<number>();
      const inc =  (this.page.number - 2) <= 0 ? (4 - this.page.number) : 2;
      const dec =  (this.page.number + 2) >= this.page.totalPages ? (5 - (this.page.totalPages - this.page.number)) : 2;
      const inicio = (this.page.number - dec) <= 0 ? 0 : (this.page.number - dec);
      const fim = (this.page.number + inc) < this.page.totalPages ? (this.page.number + inc) : (this.page.totalPages - 1);
      for (let i = inicio; i <= fim; i++) {
          pages.push(i);
      }
      this.page.pages = pages;
  }

}
