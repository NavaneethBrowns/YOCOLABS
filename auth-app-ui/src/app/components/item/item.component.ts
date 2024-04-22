import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../../services/items.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() item: any;
  @Input() mode: any;

  show: boolean = false;
  itemForm: any;
  hasError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemsService,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mode = this.item ? 'Update' : 'Add';
    this.initForm();
  }

  initForm() {
    this.itemForm = this.fb.group({
      name: [
        this.item ? this.item.name : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      description: [
        this.item ? this.item.description : '',
        Validators.maxLength(50),
      ],
    });
  }

  onSubmit() {
    this.show = false;
    if (this.itemForm.valid) {
      if (this.mode == 'Add') {
        this.itemService.addItem(this.itemForm.value).subscribe({
          next: (res: any) => {
            if (res) {
              this.activeModal.close();
            }
          },
          error: () => {
            console.error('Error adding item');
          },
        });
      } else {
        this.itemService
          .updateItem(this.item.id, {
            name: this.itemForm.value.name,
            description: this.itemForm.value.description,
          })
          .subscribe({
            next: () => {
              this.activeModal.close();
            },
            error: () => {
              console.error('Error updating item');
            },
          });
      }
    }
  }

  handleError(error: HttpErrorResponse) {
    sessionStorage.clear();
    if (error.status == 401 || error.status == 403) {
      this.router.navigate(['/login']);
    }
  }
}
