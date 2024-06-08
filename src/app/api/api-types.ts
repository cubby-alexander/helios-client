export interface MeceOrgResponse {}

export interface MeceOpsResponse {
  data: MeceOpsData[];
}

export interface MeceOpsData {
  content: {
    text: {
      value: string;
    };
  }[];
}

export interface RSSFilterResponse {}
