import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionItem } from '../_models/actionItem';
import { ActionItemParams } from '../_models/actionItemParams';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ActionItemService {
  baseUrl = environment.apiUrl;
  actionItems: ActionItem[] = [];

  constructor(private http: HttpClient) { }

  getActionItems(actionItemParams: ActionItemParams) {
    let params = this.getPaginationHeaders(actionItemParams.pageNumber, actionItemParams.pageSize);

    params = params.append('orderBy', actionItemParams.orderBy);
    params = params.append('mapStatus', actionItemParams.mapStatus);
    
    return this.getPaginatedResult<ActionItem[]>(this.baseUrl + 'actionitems', params)
  }

  getActionItem(actionItemId: number) {
    const employee = this.actionItems.find(x => x.id === actionItemId);
    if (employee !== undefined) return of(employee);
    return this.http.get<ActionItem>(this.baseUrl + 'actionitems/' + actionItemId);
  }

  addActionItem(model: any) {
    return this.http.post(this.baseUrl + 'actionitems', model).pipe(
      map(() => {
        //this.actionItems.push(model);
      })
    );
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

}