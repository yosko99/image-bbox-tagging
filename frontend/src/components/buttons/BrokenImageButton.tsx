import React from 'react';

import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';

import { getProcessingTagByIDRoute } from '../../constants/apiRoutes';

interface Props {
  id: string;
}

const BrokenImageButton = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const handleClick = () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      axios.delete(getProcessingTagByIDRoute(id)).then((_data) => {
        queryClient.refetchQueries();
      });
    }
  };

  return (
    <Button variant="danger" disabled={id === ''} onClick={handleClick}>
      Broken
    </Button>
  );
};

export default BrokenImageButton;
