export interface MeceOrgResponse {
  output: {
    data: MeceOrgData[];
  };
  status: number;
}

export interface MeceOrgData {
  content: {
    text: {
      value: string;
    };
  }[];
}

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
