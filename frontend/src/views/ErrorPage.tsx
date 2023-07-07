import React from 'react';

import { Alert, Container } from 'react-bootstrap';
import { BiSolidErrorAlt } from 'react-icons/bi';

import Header from '../components/utils/Header';

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Alert
          className="shadow-lg d-flex flex-column align-items-center"
          variant="danger"
        >
          <BiSolidErrorAlt color="red" size={150} />
          <p className="display-5 text-center">
            Something went wrong, or you are not supposed to be here
          </p>
        </Alert>
      </Container>
    </>
  );
};

export default ErrorPage;
