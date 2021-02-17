import { ActionItem } from "./actionItem";
import { User } from "./user";

export class ActionItemParams {
    pageNumber = 1;
    pageSize = 5;
    mapStatus = "all";
    orderBy = "created";
    actionItemNumber = "";

    constructor(user?: User) {
        //this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}