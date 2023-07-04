import React from 'react';

import ILabel from '../../interfaces/Ilabel';

interface Props {
  labels: ILabel[];
}

const AnnotationBox = ({ labels }: Props) => {
  return (
    <div
      className="shadow fs-2 ms-2 mt-2 ps-2 mt-2 pb-2 h-50"
      style={{ overflow: 'scroll' }}
    >
      <p>Annotations</p>
      {labels.map((label, index) => (
        <div
          key={index}
          className="fs-5 p-1 text-black my-2"
          style={{ backgroundColor: 'lightgray' }}
        >
          <p>
            Object: <span>{label.label}</span>
          </p>
          <p>
            Corner:{' '}
            <span>
              {label.x}x{label.y}
            </span>
          </p>
          <p>
            Size:{' '}
            <span>
              {Math.abs(label.width)}x{Math.abs(label.height)}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnnotationBox;
