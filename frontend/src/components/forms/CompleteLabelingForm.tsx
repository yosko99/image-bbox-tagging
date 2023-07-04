/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import axios from 'axios';
import { Stage } from 'konva/lib/Stage';
import { Button, Form } from 'react-bootstrap';
import { useQueryClient } from 'react-query';

import { getCompleteTagRoute } from '../../constants/apiRoutes';
import defaultTagValues from '../../data/defaultTagValue';
import fillFormDataWithLabelInfo from '../../functions/fillFormDataWithLabelInfo';
import ILabel from '../../interfaces/Ilabel';
import { ITag } from '../../interfaces/ITag';

interface Props {
  labels: ILabel[];
  hiddenCanvasRef: React.RefObject<Stage>;
  id: string;
  setCurrentTag: React.Dispatch<React.SetStateAction<ITag>>;
}

const CompleteLabelingForm = ({
  labels,
  id,
  hiddenCanvasRef,
  setCurrentTag
}: Props) => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (labels.length === 0) {
      window.alert('First label something.');
    } else {
      fetch(hiddenCanvasRef.current!.toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'File name.jpg', {
            type: 'image/jpeg'
          });

          const formData = new FormData(e.target as HTMLFormElement);
          fillFormDataWithLabelInfo(formData, file, labels, message);

          axios.post(getCompleteTagRoute(id), formData).then((response) => {
            queryClient.refetchQueries();
            setCurrentTag(defaultTagValues);
          });
        });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="fs-4">Message:</Form.Label>
        <hr className="m-0 mb-2" />
        <Form.Control
          as="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
        <Button type="submit" variant="info" className="w-100 mt-2">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default CompleteLabelingForm;
