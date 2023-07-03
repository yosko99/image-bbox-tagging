import React from 'react';

import { ITag } from '../../interfaces/ITag';

interface Props {
  tag: ITag;
}

const InfoBox = ({ tag }: Props) => {
  return (
    <React.Fragment>
      <div className="shadow fs-2 ms-2 mt-2 ps-2 mt-2 pb-2">
        <p>Info</p>
        <div className="fs-5">
          <p>Instructions: {tag.instructions}</p>
          <p>Tag ID: {tag.id}</p>
          <p>Created at: {tag.createdAt}</p>
          <p>With labels: {String(tag.withLabels)}</p>
          <p>Urgency: {tag.urgency}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InfoBox;
