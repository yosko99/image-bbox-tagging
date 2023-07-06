import React, { useState } from 'react';

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useQueryClient } from 'react-query';

import { getTagsRoute } from '../../constants/apiRoutes';
import CustomInputGroup from '../inputs/CustomInputGroup';
import UrgencySelectInput from '../inputs/UrgencySelectInput';

const UploadImageForm = () => {
  const [labels, setLabels] = useState<React.ReactNode[]>([]);
  const queryClient = useQueryClient();

  const handleAddLabel = () => {
    setLabels((labels) => [
      ...labels,
      <CustomInputGroup key={labels.length + 1} />
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    axios.post(getTagsRoute(), formData).then((response) => {
      queryClient.refetchQueries();
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 pe-3 pb-3">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          required
          className="mb-3"
          name="instructions"
          type="text"
        />
        <Form.Label>Image</Form.Label>
        <Form.Control
          required
          accept="image/tiff, image/jpeg"
          name="image"
          type="file"
          className="mb-3"
        />
        <UrgencySelectInput />
        <Form.Label>Labels</Form.Label>
        {labels}
        <Button variant="info" onClick={handleAddLabel} className="w-100 mb-3">
          <AiOutlinePlusCircle size={25} />
        </Button>
        <Button variant="info" type="submit" className="w-100">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UploadImageForm;
