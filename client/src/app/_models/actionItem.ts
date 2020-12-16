export interface ActionItem {
    id: number;
    category: string;
    division: string;
    request: string;
    dateCreated: string;
    internalEmailSubject: string;
    assignedToId: number;
    workOrderTypeRequest: string;
    feedback: boolean;
    notes: string;
    tgocp: string;
    taskNumber: string;
    actionItemNumber: string;
    deliveryManagerSupportId: number;
    externalEmailSubject: string;
    dateStarted: string;
    currentTeamOwner: string;
    currentIndividualAssigned: string;
    remarks: string;
    mapStatus: string;
    dateResolved: string;
}