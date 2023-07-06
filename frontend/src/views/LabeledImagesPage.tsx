/* eslint-disable multiline-ternary */
import React from 'react';

import { Alert, Col, Container, Row } from 'react-bootstrap';

import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import LabeledImageCard from '../components/cards/LabeledImageCard';
import Header from '../components/utils/Header';
import { getProcessedTagsRoute } from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import ILabeledImage from '../interfaces/ILabeledImage';

const LabeledImagesPage = () => {
  const { isLoading, data, error } = useFetch(
    'processed_tags',
    getProcessedTagsRoute(),
    true
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const labeledImages = data as ILabeledImage[];

  return (
    <div>
      <Header />
      <Container>
        {labeledImages.length === 0 ? (
          <Alert
            className="mt-5 display-5 text-center shadow-lg"
            variant="info"
          >
            No labeled images yet
          </Alert>
        ) : (
          <Row className="mt-3">
            {labeledImages.map((labeledImage, index) => (
              <Col key={index} className="p-2">
                <LabeledImageCard
                  imageURL={labeledImage.imageURL}
                  message={labeledImage.message}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default LabeledImagesPage;
