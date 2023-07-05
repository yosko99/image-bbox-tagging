import { ITag, Urgency } from '../interfaces/ITag';

const compareArrayByUrgency = (a: ITag, b: ITag): number => {
  const urgencyOrder: { [key in Urgency]: number } = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1
  };

  return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
};

export default compareArrayByUrgency;
