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
