import { Urgency } from '../interfaces/ITag';

const getUrgencyColor = (urgency: Urgency) => {
  switch (urgency) {
    case Urgency.HIGH:
      return 'danger';
    case Urgency.MEDIUM:
      return 'warning';
    case Urgency.LOW:
      return 'info';
  }
};

export default getUrgencyColor;
