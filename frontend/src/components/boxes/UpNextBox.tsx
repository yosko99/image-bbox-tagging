import React, { useEffect } from 'react';

import { useAtom } from 'jotai';
import { Image } from 'react-bootstrap';

import { currentTagAtom } from '../../atoms/currentTag.atom';
import { selectedLabelAtom } from '../../atoms/selectedLabel.atom';
import { upNextImagesAtom } from '../../atoms/upNextImages.atom';
import { PUBLIC_IMAGES_PREFIX } from '../../constants/apiRoutes';
import getUrgencyColor from '../../functions/getUrgencyColor';

interface Props {
  setAreTagsSorted: React.Dispatch<React.SetStateAction<boolean>>;
  areTagsSorted: boolean;
}

const UpNextBox = ({ areTagsSorted, setAreTagsSorted }: Props) => {
  const [selectedLabel, setSelectedLabel] = useAtom(selectedLabelAtom);
  const [currentTag, setCurrentTag] = useAtom(currentTagAtom);
  const [upNextImages] = useAtom(upNextImagesAtom);

  const handleChangeImage = (index: number) => {
    setCurrentTag(upNextImages[index]);
    setSelectedLabel('');
  };

  useEffect(() => {
    setAreTagsSorted(false);
  }, [areTagsSorted]);

  return (
    <React.Fragment>
      <div
        className="shadow fs-1 ms-2 mt-2 ps-2 mt-2 d-flex align-items-center flex-column"
        style={{ height: '700px', overflow: 'scroll' }}
      >
        <p>Up next</p>
        {upNextImages.map((tag, index) => (
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
