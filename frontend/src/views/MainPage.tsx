/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { Col, Row, Image, Button, Form } from 'react-bootstrap';

import LoadingPage from './LoadingPage';
import InfoBox from '../components/boxes/InfoBox';
import UpNextBox from '../components/boxes/UpNextBox';
import {
  PUBLIC_IMAGES_PREFIX,
  getAllProcessingTagsRoute
} from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';
import { ITag, Urgency } from '../interfaces/ITag';

const MainPage = () => {
  const { isLoading, data } = useFetch(
    'processing_tags',
    getAllProcessingTagsRoute(),
    true
  );

  const [currentTag, setCurrentTag] = useState<ITag>({
    createdAt: '',
    id: '',
    imageURL: '',
    instructions: '',
    objectsToAnnotate: [],
    urgency: Urgency.LOW,
    withLabels: false
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const tags = data as ITag[];

  return (
    <div>
      <div className="bg-dark w-100 text-white d-flex align-items-center py-2 justify-content-between px-3 fs-3 m-0">
        <p className="m-0">Image bbox tagging</p>
        <div className="d-flex">
          <p className="m-0">Sort by:</p>
          <p className="m-0 ms-5" role="button">
            Urgency
          </p>
          <p className="m-0 ms-5" role="button">
            Date created
          </p>
        </div>
      </div>
      <Row>
        <Col lg={2}>
          <div className="shadow fs-1 ms-2 mt-2 ps-2 mt-2">
            <p>Objects</p>
            <Form className="fs-3 pb-2">
              {currentTag.objectsToAnnotate.length !== 0 &&
                currentTag.objectsToAnnotate.map((label, index) => (
                  <Form.Check
                    key={index}
                    label={label}
                    type="radio"
                    name="label"
                    id={`label-${label}-1`}
                  />
                ))}
            </Form>
          </div>
          <UpNextBox setCurrentTag={setCurrentTag} tags={tags} />
        </Col>
        <Col lg={7}>
          <div className="shadow">
            {tags.length === 0 ? (
              <p className="display-4 p-5 text-center">
                You are all done. Go home now
              </p>
            ) : (
              <>
                {currentTag.id === '' ? (
                  <p className="text-center fs-1 pt-5">
                    Select a tag from the left side
                  </p>
                ) : (
                  <Image
                    fluid
                    src={PUBLIC_IMAGES_PREFIX + currentTag.imageURL}
                    className="p-5 pt-3 pb-2"
                  />
                )}
                <div className="d-flex justify-content-between px-5">
                  <div>
                    <Button variant="danger">Broken</Button>
                    <Button variant="warning">Reset</Button>
                  </div>
                  <Button variant="info">Submit</Button>
                </div>
                <div className="px-5 mt-3 pb-2">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className="fs-4">Message:</Form.Label>
                    <hr className="m-0 mb-2" />
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </div>
              </>
            )}
          </div>
        </Col>
        <Col lg={3}>
          <InfoBox tag={currentTag} />
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
