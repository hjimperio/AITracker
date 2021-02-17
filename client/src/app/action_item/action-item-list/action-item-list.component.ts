import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ActionItem } from 'src/app/_models/actionItem';
import { ActionItemParams } from 'src/app/_models/actionItemParams';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { ActionItemService } from 'src/app/_services/action-items.service';
import { ActionItemDetailComponent } from '../action-item-detail/action-item-detail.component';

@Component({
  selector: 'app-action-item-list',
  templateUrl: './action-item-list.component.html',
  styleUrls: ['./action-item-list.component.css']
})
export class ActionItemListComponent implements OnInit {
  actionItems: ActionItem[];
  actionItem: ActionItem;
  pagination: Pagination;
  actionItemParams: ActionItemParams;
  user: User;
  bsModalRef: BsModalRef;
  modalRef: BsModalRef;

  constructor(private actionItemService: ActionItemService, private toastr: ToastrService, 
    private modalService: BsModalService) {
    this.actionItemParams = new ActionItemParams(this.user);
  }

  ngOnInit(): void {
    this.loadActionItems();
  }

  loadActionItems() {
    this.actionItemService.getActionItems(this.actionItemParams).subscribe(response => {
      this.actionItems = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.actionItemParams = new ActionItemParams(this.user);
    this.loadActionItems();
  }

  pageChanged(event: any) {
    this.actionItemParams.pageNumber = event.page;
    this.loadActionItems();
  }

  infoActionItem(actionItemId: number) {
    this.actionItemService.getActionItem(actionItemId)
      .subscribe(actionItem => {
        this.actionItem = actionItem;
        const initialState = {
          title: "Sample",
          actionItem: this.actionItem
        };
        this.bsModalRef = this.modalService.show(ActionItemDetailComponent, {initialState});
      });
  }

  deleteActionItem(actionItemId: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.actionItemService.deleteActionItem(actionItemId).subscribe(response => {
        this.toastr.success("Action Item deleted successfully");
        this.loadActionItems();
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
