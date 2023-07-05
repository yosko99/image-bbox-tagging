import React, { useEffect } from 'react';

import { Image } from 'react-bootstrap';

import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import getUrgencyColor from '../../functions/getUrgencyColor';
import { ITag } from '../../interfaces/ITag';

interface Props {
  tags: ITag[];
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTag: React.Dispatch<React.SetStateAction<ITag>>;
  setAreTagsSorted: React.Dispatch<React.SetStateAction<boolean>>;
  areTagsSorted: boolean;
}

const UpNextBox = ({
  tags,
  setCurrentTag,
  setSelectedLabel,
  areTagsSorted,
  setAreTagsSorted
}: Props) => {
  const handleChangeImage = (index: number) => {
    setCurrentTag(tags[index]);
    setSelectedLabel('');
  };

  useEffect(() => {
    setAreTagsSorted(false);
  }, [areTagsSorted]);

  return (
    <React.Fragment>
      <div
        className="shadow fs-1 ms-2 mt-2 ps-2 mt-2 d-flex justify-content-center align-items-center flex-column"
        style={{ height: '700px', overflow: 'scroll' }}
      >
        <p>Up next</p>
        {tags.map((tag, index) => (
          <div key={index} className="p-3 pt-1 ms-0 ps-0">
            <Image
              className={`border border-${getUrgencyColor(
                tag.urgency
              )} border-3`}
              key={index}
              onClick={() => handleChangeImage(index)}
              role="button"
              src={PUBLIC_IMAGES_PREFIX + tag.imageURL}
              fluid
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default UpNextBox;
