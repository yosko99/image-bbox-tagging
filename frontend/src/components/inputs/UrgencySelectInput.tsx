import React from 'react';

import { Form } from 'react-bootstrap';

const UrgencySelectInput = () => {
  return (
    <>
      <Form.Label>Urgency</Form.Label>
      <Form.Select
        required
        name="urgency"
        defaultValue={'HIGH'}
        aria-label="Urgency"
        className="mb-3"
      >
        <option className="bg-danger text-white" value="HIGH">
          High
        </option>
        <option className="bg-warning" value="MEDIUM">
          Medium
        </option>
        <option className="bg-info" value="LOW">
          Low
        </option>
      </Form.Select>
    </>
  );
};

export default UrgencySelectInput;
