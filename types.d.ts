interface IIntents {
  id: number;
  intent: string;
  patterns: string[];
  responses: string[];
  createdAt: string;
}

interface ILogs {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
}

interface IQuestion {
  id: number;
  question: string;
  createdAt: string;
}
