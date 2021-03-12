import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionItem } from '../_models/actionItem';
import { ActionItemParams } from '../_models/actionItemParams';
import { ActionItemReportParams } from '../_models/actionItemReportParams';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ActionItemService {
  baseUrl = environment.apiUrl;
  actionItems: ActionItem[] = [];
  user: User;
  actionItemsCache = new Map();
  actionItemParams: ActionItemParams;

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.actionItemParams = new ActionItemParams(user);
    });
  }

  getActionItemParams() {
    return this.actionItemParams;
  }

  setActionItemParams(params) {
    this.actionItemParams = params;
  }

  resetActionItemParams() {
    this.actionItemParams = new ActionItemParams(this.user);
    return this.actionItemParams;
  }

  getActionItems(actionItemParams: ActionItemParams) {
    // var response = this.actionItemsCache.get(Object.values(actionItemParams).join('-'));
    // if (response) {
    //   console.log(this.actionItemsCache.values());
    //   return of(response);
    // }

    let params = getPaginationHeaders(actionItemParams.pageNumber, actionItemParams.pageSize);

    params = params.append('orderBy', actionItemParams.orderBy);
    params = params.append('mapStatus', actionItemParams.mapStatus);
    params = params.append('actionItemNumber', actionItemParams.actionItemNumber);
    params = params.append('taskNumber', actionItemParams.taskNumber);
    params = params.append('internalEmailSubject', actionItemParams.internalEmailSubject);
    params = params.append('externalEmailSubject', actionItemParams.externalEmailSubject);
    params = params.append('workOrderTypeRequest', actionItemParams.workOrderTypeRequest);
    params = params.append('metSLO', actionItemParams.metSLO);
    params = params.append('metElapsedTarget', actionItemParams.metElapsedTarget);
    params = params.append('dateStartedFrom', actionItemParams.dateFromStarted);
    params = params.append('dateStartedTo', actionItemParams.dateToStarted);
    params = params.append('dateResolvedFrom', actionItemParams.dateFromResolved);
    params = params.append('dateResolvedTo', actionItemParams.dateToResolved);
    
    return getPaginatedResult<ActionItem[]>(this.baseUrl + 'actionitems', params, this.http)
      // .pipe(map(response => {
      //   this.actionItemsCache.set(Object.values(actionItemParams).join('-'), response);
      //   return response;
      // }));
  }

  getActionItem(actionItemId: number) {
    // const actionItem = [...this.actionItemsCache.values()]
    //   .reduce((arr, elem) => arr.concat(elem.result), [])
    //   .find((actionItem: ActionItem) => actionItem.id === actionItemId);

    // if (actionItem) {
    //   return of(actionItem);
    // }
    
    return this.http.get<ActionItem>(this.baseUrl + 'actionitems/' + actionItemId);
  }

  generateReport(actionItemReportParams: ActionItemReportParams) {
    console.log(actionItemReportParams);
    let params = new HttpParams();

    params = params.append('orderBy', actionItemReportParams.orderBy);
    params = params.append('mapStatus', actionItemReportParams.mapStatus);
    params = params.append('workOrderTypeRequest', actionItemReportParams.workOrderTypeRequest);
    params = params.append('metSLO', actionItemReportParams.metSLO);
    params = params.append('metElapsedTarget', actionItemReportParams.metElapsedTarget);
    params = params.append('dateFrom', actionItemReportParams.dateFrom);
    params = params.append('dateTo', actionItemReportParams.dateTo);

    return this.http.get(this.baseUrl + 'actionitems/reports', { responseType: 'blob', params });
  }

  addActionItem(model: any) {
    return this.http.post(this.baseUrl + 'actionitems', model).pipe(
      map((actionItem: ActionItem) => {
        //this.actionItems.push(model);
        console.log(actionItem);
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
