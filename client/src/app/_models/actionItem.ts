export interface ActionItem {
    id: number;
    region: string;
    division: string;
    internalEmailSubject: string;
    externalEmailSubject: string;
    workOrderTypeRequest: string;
    feedback: boolean;
    notes: string;
    taskNumber: string;
    actionItemNumber: string;
    aiCreatedBy: number;
    dateCreated: Date;
    dateStarted: Date;
    dateResolved: Date;
    mapStatus: string;
}