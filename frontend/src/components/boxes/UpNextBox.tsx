import React from 'react';

import { Image } from 'react-bootstrap';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import { ITag } from '../../interfaces/ITag';

interface Props {
  tags: ITag[];
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTag: React.Dispatch<React.SetStateAction<ITag>>;
}

const UpNextBox = ({ tags, setCurrentTag, setSelectedLabel }: Props) => {
  const handleChangeImage = (index: number) => {
    setCurrentTag(tags[index]);
    setSelectedLabel('');
  };

  return (
    <React.Fragment>
      <div
        className="shadow fs-1 ms-2 mt-2 ps-2 mt-2"
        style={{ height: '700px', overflow: 'scroll' }}
      >
        <p>Up next</p>
        {tags.map((tag, index) => (
          <Image
            className="p-3 pt-1 ms-0 ps-0"
            key={index}
            onClick={() => handleChangeImage(index)}
            role="button"
            src={PUBLIC_IMAGES_PREFIX + tag.imageURL}
            fluid
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default UpNextBox;
