export interface OrgOpsList {
  groups: OrgOpsListItem[];
}

export interface OrgOpsListItem {
  group: string;
  activities: string[];
}

export interface RefinedOpsList {
  [key: string]: any;
}

export interface OpsQuestionSet {
  questions: string[];
  operation: string;
}

export type OpsQuestionList = OpsQuestionSet[];
