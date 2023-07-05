import React from 'react';

import { Form } from 'react-bootstrap';

interface Props {
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
}

const LabelInput = ({ setSelectedLabel, selectedLabel }: Props) => {
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
