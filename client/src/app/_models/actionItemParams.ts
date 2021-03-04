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
    dateFromStarted = "";
    dateToStarted = ""
    dateFromResolved = "";
    dateToResolved = "";

    constructor(user?: User) {
        //this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}