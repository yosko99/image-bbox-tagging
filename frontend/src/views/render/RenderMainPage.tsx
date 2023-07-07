/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { Col, Row } from 'react-bootstrap';

import { currentTagAtom } from '../../atoms/currentTag.atom';
import { labelsAtom } from '../../atoms/labels.atom';
import { upNextImagesAtom } from '../../atoms/upNextImages.atom';
import AnnotationBox from '../../components/boxes/AnnotationBox';
import CanvasBox from '../../components/boxes/CanvasBox';
import InfoBox from '../../components/boxes/InfoBox';
import UpNextBox from '../../components/boxes/UpNextBox';
import SortButtons from '../../components/buttons/SortButtons';
import LabelInput from '../../components/inputs/LabelInput';
import RadioInputs from '../../components/inputs/RadioInputs';
import Header from '../../components/utils/Header';
import useUpdateCanvasWidthAndHeight from '../../hooks/useUpdateCanvasWidthAndHeight';
import { ITag } from '../../interfaces/ITag';
import MainFlexContainer from '../../styles/MainFlexContainer';

interface Props {
  tags: ITag[];
}

const RenderMainPage = ({ tags }: Props) => {
  const [labels, setLabels] = useAtom(labelsAtom);
  const [upNextImages, setUpNextImages] = useAtom(upNextImagesAtom);
  const [currentTag] = useAtom(currentTagAtom);
  const [canvasHolderDivWidth, setCanvasHolderDivWidth] = useState(650);
  const [areTagsSorted, setAreTagsSorted] = useState(false);

  useEffect(() => {
    setLabels([]);
  }, [currentTag.imageURL]);

  useEffect(() => {
    setUpNextImages(tags);
  }, [tags.length]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setCanvasHolderDivWidth(
        document.getElementById('canvas-holder')?.clientWidth! / 1.5
      );
    });
  }, []);

  useUpdateCanvasWidthAndHeight(canvasHolderDivWidth);

  return (
    <div>
      <Header>
        <SortButtons
          setTags={setUpNextImages}
          setAreTagsSorted={setAreTagsSorted}
        />
      </Header>
      <Row>
        <Col lg={9}>
          <Row>
            <MainFlexContainer>
              <Col lg={2} xs={12}>
                <div className="shadow fs-1 ms-2 mt-2 ps-2 mt-2">
                  <p>Labels</p>
                  {currentTag.withLabels ? <RadioInputs /> : <LabelInput />}
                </div>
                <UpNextBox
                  areTagsSorted={areTagsSorted}
                  setAreTagsSorted={setAreTagsSorted}
                />
              </Col>
              <Col lg={10} xs={12}>
                <CanvasBox />
              </Col>
            </MainFlexContainer>
          </Row>
        </Col>
        <Col lg={3}>
          <InfoBox tag={currentTag} />
          {currentTag.imageURL !== '' && (
            <AnnotationBox imageURL={currentTag.imageURL} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default RenderMainPage;
