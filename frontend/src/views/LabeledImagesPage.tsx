import React from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';

import LoadingPage from './LoadingPage';
import Header from '../components/utils/Header';
import {
  PROXY_URL,
  PUBLIC_IMAGES_PREFIX,
  getProcessedTagsRoute
} from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import ILabeledImage from '../interfaces/ILabeledImage';

const LabeledImagesPage = () => {
  const { isLoading, data } = useFetch(
    'processed_tags',
    getProcessedTagsRoute(),
    true
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  const labeledImages = data as ILabeledImage[];

  return (
    <div>
      <Header />
      <Container>
        <Row className="mt-3">
          {labeledImages.map((labeledImage, index) => (
            <Col key={index} className="p-2">
              <Card style={{ width: '18rem' }}>
                <a
                  href={
                    PROXY_URL + PUBLIC_IMAGES_PREFIX + labeledImage.imageURL
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <Card.Img
                    variant="top"
                    src={PUBLIC_IMAGES_PREFIX + labeledImage.imageURL}
                  />
                </a>
                <Card.Body>
                  <Card.Text>{labeledImage.message}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LabeledImagesPage;
