import React from 'react';

import axios from 'axios';
import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';

import { currentTagAtom } from '../../atoms/currentTag.atom';
import { getProcessingTagByIDRoute } from '../../constants/apiRoutes';
import defaultTagValues from '../../data/defaultTagValue';

const BrokenImageButton = () => {
  const [currentTag, setCurrentTag] = useAtom(currentTagAtom);

  const queryClient = useQueryClient();

  const handleClick = () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      axios.delete(getProcessingTagByIDRoute(currentTag.id)).then((_data) => {
        queryClient.refetchQueries();
        setCurrentTag(defaultTagValues);
      });
    }
  };

  return (
    <Button
      variant="danger"
      disabled={currentTag.id === ''}
      onClick={handleClick}
    >
      Broken
    </Button>
  );
};

export default BrokenImageButton;
