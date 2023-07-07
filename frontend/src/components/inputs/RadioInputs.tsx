import React from 'react';

import { useAtom } from 'jotai';
import { Form } from 'react-bootstrap';

import { currentTagAtom } from '../../atoms/currentTag.atom';
import { selectedLabelAtom } from '../../atoms/selectedLabel.atom';

const RadioInputs = () => {
  const [selectedLabel, setSelectedLabel] = useAtom(selectedLabelAtom);
  const [{ objectsToAnnotate }] = useAtom(currentTagAtom);

  const handleChange = (e: unknown) => {
    const value = ((e as HTMLFormElement).target as unknown as HTMLInputElement)
      .value;
    setSelectedLabel(value);
  };

  return (
    <Form className="fs-3 pb-2" onChange={handleChange}>
      {objectsToAnnotate.length !== 0 &&
        objectsToAnnotate.map((label, index) => (
          <Form.Check
            key={index}
            value={label}
            label={label}
            type="radio"
            checked={selectedLabel === label}
            name="label"
            id={`label-${label}-1`}
          />
        ))}
    </Form>
  );
};

export default RadioInputs;
