import React, { useState } from 'react';

import compareArrayByUrgency from '../../functions/compareArrayByUrgency';
import { ITag } from '../../interfaces/ITag';

interface Props {
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
  setAreTagsSorted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortButtons = ({ setTags, setAreTagsSorted }: Props) => {
  const [currentSortingSelected, setCurrentSortingSelected] = useState('');

  const handleSorting = (sortBy: 'urgency' | 'date') => {
    if (sortBy === 'date') {
      setTags((tags) =>
        tags.sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        )
      );
    } else {
      setTags((tags) => tags.sort(compareArrayByUrgency));
    }

    setCurrentSortingSelected(sortBy);
    setAreTagsSorted(true);
  };

  return (
    <div className="d-flex align-items-center mb-3 justify-content-center">
      <p className="m-0">Sort by:</p>
      <p
        className={`m-0 ms-5 ${
          currentSortingSelected !== 'urgency' && 'text-muted'
        }`}
        onClick={() => handleSorting('urgency')}
        role="button"
      >
        Urgency
      </p>
      <p
        className={`m-0 ms-5 ${
          currentSortingSelected !== 'date' && 'text-muted'
        }`}
        onClick={() => handleSorting('date')}
        role="button"
      >
        Date{' '}
      </p>
    </div>
  );
};

export default SortButtons;
