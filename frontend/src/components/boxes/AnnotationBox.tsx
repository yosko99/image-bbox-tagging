import React from 'react';

import useGetImageAndScaling from '../../hooks/useGetImageAndScaling';
import ILabel from '../../interfaces/Ilabel';

interface Props {
  labels: ILabel[];
  imageURL: string;
}

const AnnotationBox = ({ labels, imageURL }: Props) => {
  const { scaleX, scaleY } = useGetImageAndScaling(imageURL);

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
              {Math.round(label.x * scaleX)}x{Math.round(label.y * scaleY)}
            </span>
          </p>
          <p>
            Size:{' '}
            <span>
              {Math.abs(Math.round(label.width * scaleX))}x
              {Math.round(label.height * scaleY)}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnnotationBox;
