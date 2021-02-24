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
    dueDate: string;
    sloDays: number;
    metSLO: boolean;
    elapsedDueDate: string;
    metElapsedTarget: boolean;
    daysAndHoursSpent: string;
    targetElapsedDays: number;
    elapsedDays: number;
    reason?: string;
    aiCreatedByName?: string;
    createdBy?: string;
}