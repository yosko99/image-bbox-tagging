/* eslint-disable multiline-ternary */
import React, { useEffect, useRef, useState } from 'react';

import { Stage } from 'konva/lib/Stage';
import { Col, Row, Button, Alert } from 'react-bootstrap';

import LoadingPage from './LoadingPage';
import AnnotationBox from '../components/boxes/AnnotationBox';
import InfoBox from '../components/boxes/InfoBox';
import UpNextBox from '../components/boxes/UpNextBox';
import BrokenImageButton from '../components/buttons/BrokenImageButton';
import MainCanvas from '../components/canvas/MainCanvas';
import CompleteLabelingForm from '../components/forms/CompleteLabelingForm';
import RadioInputs from '../components/inputs/RadioInputs';
import { getAllProcessingTagsRoute } from '../constants/apiRoutes';
import defaultTagValues from '../data/defaultTagValue';
import useFetch from '../hooks/useFetch';
import ILabel from '../interfaces/Ilabel';
import { ITag } from '../interfaces/ITag';

const MainPage = () => {
  const { isLoading, data } = useFetch(
    'processing_tags',
    getAllProcessingTagsRoute(),
    true
  );
  const [selectedLabel, setSelectedLabel] = useState('');
  const [labels, setLabels] = useState<ILabel[]>([]);
  const hiddenCanvasRef = useRef<Stage>(null);

  const [currentTag, setCurrentTag] = useState<ITag>(defaultTagValues);

  useEffect(() => {
    setLabels([]);
  }, [currentTag.imageURL]);

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
            <p>Labels</p>
            <RadioInputs
              selectedLabel={selectedLabel}
              labels={currentTag.objectsToAnnotate}
              setSelectedLabel={setSelectedLabel}
            />
          </div>
          <UpNextBox
            setSelectedLabel={setSelectedLabel}
            setCurrentTag={setCurrentTag}
            tags={tags}
          />
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
                  <Alert variant="info" className="text-center fs-1 m-5">
                    Select a tag from the left side
                  </Alert>
                ) : (
                  <div className="py-3 d-flex justify-content-center align-items-center">
                    {selectedLabel === '' ? (
                      <Alert variant="warning" className="fs-1">
                        Select label first
                      </Alert>
                    ) : (
                      <MainCanvas
                        labels={labels}
                        hiddenCanvasRef={hiddenCanvasRef}
                        setLabels={setLabels}
                        selectedLabel={selectedLabel}
                        imageURL={currentTag.imageURL}
                      />
                    )}
                  </div>
                )}
                <div className="d-flex justify-content-between px-5">
                  <div>
                    <BrokenImageButton
                      setCurrentTag={setCurrentTag}
                      id={currentTag.id}
                    />
                    <Button variant="warning" onClick={() => setLabels([])}>
                      Reset
                    </Button>
                  </div>
                </div>
                <div className="px-5 mt-3 pb-2">
                  {currentTag.imageURL !== '' && (
                    <CompleteLabelingForm
                      setCurrentTag={setCurrentTag}
                      hiddenCanvasRef={hiddenCanvasRef}
                      id={currentTag.id}
                      labels={labels}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </Col>
        <Col lg={3}>
          <InfoBox tag={currentTag} />
          {currentTag.imageURL !== '' && (
            <AnnotationBox imageURL={currentTag.imageURL} labels={labels} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
