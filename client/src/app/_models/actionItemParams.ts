import { ActionItem } from "./actionItem";
import { User } from "./user";

export class ActionItemParams {
    pageNumber = 1;
    pageSize = 5;
    mapStatus = "all";
    orderBy = "created";
    actionItemNumber = "";
    taskNumber = "";
    internalEmailSubject = "";
    externalEmailSubject = "";
    workOrderTypeRequest = "";
    metSLO = "";
    metElapsedTarget = "";


    constructor(user?: User) {
        //this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}