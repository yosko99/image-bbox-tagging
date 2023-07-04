import { ITag, Urgency } from '../interfaces/ITag';

const defaultTagValues: ITag = {
  createdAt: '',
  id: '',
  imageURL: '',
  instructions: '',
  objectsToAnnotate: [],
  urgency: Urgency.LOW,
  withLabels: false
};

export default defaultTagValues;
