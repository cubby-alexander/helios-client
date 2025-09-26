export interface MeceOrgResponse {
  content: MeceOrgContent | { raw_content: string };
  raw_content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: string;
}

export interface MeceOrgContent {
  groups: MeceOrgGroup[];
}

export interface MeceOrgGroup {
  group: string;
  activities: string[];
}

export interface MeceOpsResponse {
  content: MeceOpsContent;
  raw_content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: string;
}

export interface MeceOpsContent {
  scope: string;
  operation: string;
  activities: string[];
}

export interface RSSFilterResponse {
  rssFilter: RSSFilterContent;
  raw_content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: string;
}

export interface RSSFilterContent {
  definitelyObservable: string[];
  maybeObservable: string[];
}

export interface ApplicationQuestionsResponse {
  questions: string[];
  raw_content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: string;
}
