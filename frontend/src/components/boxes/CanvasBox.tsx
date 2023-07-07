/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';
import { Alert, Button } from 'react-bootstrap';

import { currentTagAtom } from '../../atoms/currentTag.atom';
import { labelsAtom } from '../../atoms/labels.atom';
import { selectedLabelAtom } from '../../atoms/selectedLabel.atom';
import { upNextImagesAtom } from '../../atoms/upNextImages.atom';
import BrokenImageButton from '../buttons/BrokenImageButton';
import MainCanvas from '../canvas/MainCanvas';
import CompleteLabelingForm from '../forms/CompleteLabelingForm';

const CanvasBox = () => {
  const [currentTag] = useAtom(currentTagAtom);
  const [upNextImages] = useAtom(upNextImagesAtom);
  const [selectedLabel] = useAtom(selectedLabelAtom);
  const [labels, setLabels] = useAtom(labelsAtom);

  return (
    <div className="shadow" id="canvas-holder">
      {upNextImages.length === 0 ? (
        <p className="display-4 p-5 text-center">
          You are all done. Go home now
        </p>
      ) : (
        <>
          {currentTag.id === '' ? (
            <Alert variant="info" className="text-center fs-1 m-5">
              Select a image
            </Alert>
          ) : (
            <div className="py-3 d-flex justify-content-center align-items-center">
              {selectedLabel === '' ? (
                <Alert variant="warning" className="fs-1">
                  Select or write a label
                </Alert>
              ) : (
                <MainCanvas imageURL={currentTag.imageURL} />
              )}
            </div>
          )}
          <div className="d-flex justify-content-between px-5">
            <div>
              <BrokenImageButton />
              <Button variant="warning" onClick={() => setLabels([])}>
                Reset
              </Button>
            </div>
          </div>
          <div className="px-5 mt-3 pb-2">
            {currentTag.imageURL !== '' && <CompleteLabelingForm />}
          </div>
        </>
      )}
    </div>
  );
};

export default CanvasBox;
