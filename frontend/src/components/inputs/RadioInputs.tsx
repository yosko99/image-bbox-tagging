import React from 'react';

import { Form } from 'react-bootstrap';

interface Props {
  labels: string[];
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
}

const RadioInputs = ({ labels, setSelectedLabel, selectedLabel }: Props) => {
  const handleChange = (e: unknown) => {
    const value = ((e as HTMLFormElement).target as unknown as HTMLInputElement)
      .value;
    setSelectedLabel(value);
  };

  return (
    <Form className="fs-3 pb-2" onChange={handleChange}>
      {labels.length !== 0 &&
        labels.map((label, index) => (
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
