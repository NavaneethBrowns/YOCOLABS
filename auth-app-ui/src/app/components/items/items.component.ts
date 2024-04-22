import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';
import { ItemComponent } from '../item/item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {

  tableRequest: any;
  search: string = '';
  Items: any[] = [];
  totalItems: number = 0;
  role:string = 'user';

  constructor(
    private itemsService: ItemsService,
    public modalService: NgbModal,
    private router: Router) {
      this.role = sessionStorage.getItem('role') || 'user';
    }

  ngOnInit(): void {
    this.tableRequest = {
      limit: 10,
      page: 1,
    };
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getItems(this.tableRequest).subscribe({
      next: (res: any) => {
        if (res) {
          this.Items = res.items;
          this.totalItems = res.totalCount;
        }
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  onPageChange(page: number) {
    this.tableRequest.page = page;
    this.loadItems();
  }

  navigateToItem(item: any) {
    this.router.navigate(['/item', item.id]);
  }

  deleteItem(item: any) {
    this.itemsService.deleteItem(item.id).subscribe({
      next: () => {
        this.loadItems();
      },
      error: (error) => {
        console.error('Error deleting item');
        this.handleError(error);
      },
    });
  }

  updateItem(item: any) {
    const modalRef = this.modalService.open(ItemComponent, {
      centered: true,
      size: "lg",
      scrollable: true,
    });
    modalRef.componentInstance.item = item;
    modalRef.result.then(() => {
      this.loadItems();
    });
  }

  addItem() {    
    const modalRef = this.modalService.open(ItemComponent, {
      centered: true,
      size: "lg",
      scrollable: true,
    });
    modalRef.result.then(() => {
      this.loadItems();
    });
  }  

  handleError(error: HttpErrorResponse) {
    sessionStorage.clear();
    if (error.status == 401) {
      this.router.navigate(['/login']);
    }
  }
}
