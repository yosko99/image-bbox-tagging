import React from 'react';

import { Card } from 'react-bootstrap';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';

interface Props {
  imageURL: string;
  message: string;
}

const LabeledImageCard = ({ imageURL, message }: Props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <a
        href={PUBLIC_IMAGES_PREFIX + imageURL}
        target="_blank"
        rel="noreferrer"
      >
        <Card.Img variant="top" src={PUBLIC_IMAGES_PREFIX + imageURL} />
      </a>
      <Card.Body>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LabeledImageCard;
