import React from 'react';

import { useAtom } from 'jotai';
import { Form } from 'react-bootstrap';

import { selectedLabelAtom } from '../../atoms/selectedLabel.atom';

const LabelInput = () => {
  const [selectedLabel, setSelectedLabel] = useAtom(selectedLabelAtom);

  const handleChange = (e: unknown) => {
    const value = ((e as HTMLFormElement).target as unknown as HTMLInputElement)
      .value;
    setSelectedLabel(value);
  };

  return (
    <Form.Group className="mb-3 pe-3 pb-3">
      <Form.Control
        value={selectedLabel}
        onChange={(e) => handleChange(e)}
        type="text"
      />
    </Form.Group>
  );
};

export default LabelInput;
