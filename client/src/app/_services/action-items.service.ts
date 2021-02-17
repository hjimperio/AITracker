import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionItem } from '../_models/actionItem';
import { ActionItemParams } from '../_models/actionItemParams';
import { PaginatedResult } from '../_models/pagination';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ActionItemService {
  baseUrl = environment.apiUrl;
  actionItems: ActionItem[] = [];

  constructor(private http: HttpClient) { }

  getActionItems(actionItemParams: ActionItemParams) {
    let params = getPaginationHeaders(actionItemParams.pageNumber, actionItemParams.pageSize);

    params = params.append('orderBy', actionItemParams.orderBy);
    params = params.append('mapStatus', actionItemParams.mapStatus);
    params = params.append('actionItemNumber', actionItemParams.actionItemNumber);
    
    return getPaginatedResult<ActionItem[]>(this.baseUrl + 'actionitems', params, this.http)
  }

  getActionItem(actionItemId: number) {
    const actionItem = this.actionItems.find(x => x.id === actionItemId);
    if (actionItem !== undefined) return of(actionItem);
    return this.http.get<ActionItem>(this.baseUrl + 'actionitems/' + actionItemId);
  }

  addActionItem(model: any) {
    console.log(model);
    return this.http.post(this.baseUrl + 'actionitems', model).pipe(
      map((actionItem: ActionItem) => {
        //this.actionItems.push(model);
      })
    );
  }

  updateActionItem(actionItem: ActionItem, actionItemId: number) {
    return this.http.put(this.baseUrl + 'actionitems/' + actionItemId, actionItem).pipe(
      map(() => {
        const index = this.actionItems.indexOf(actionItem);
        this.actionItems[index] = actionItem;
      })
    );
  }

  deleteActionItem(actionItemId: number) {
    return this.http.delete(this.baseUrl + 'actionitems/' + actionItemId);
  }
}
