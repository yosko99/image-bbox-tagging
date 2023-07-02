export enum Urgency {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface ITag {
  id: string;
  instructions: string;
  imageURL: string;
  objectsToAnnotate: string[];
  withLabels: boolean;
  urgency: Urgency;
  createdAt: string;
}
