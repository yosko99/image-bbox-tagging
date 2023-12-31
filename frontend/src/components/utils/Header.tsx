import React, { ReactNode } from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CustomModal from './CustomModal';
import UploadImageForm from '../forms/UploadImageForm';

interface Props {
  children?: ReactNode;
}

const Header = ({ children }: Props) => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mb-0 py-3">
      <Navbar.Brand className="ms-5 me-0">Image bbox tagging</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto ps-5">
          <Nav.Link
            disabled={pathname === '/'}
            className={pathname === '/' ? 'text-dark' : ''}
            onClick={() => navigate('/')}
          >
            Home
          </Nav.Link>
          <Nav.Link
            disabled={pathname === '/labeled-images'}
            className={pathname === '/labeled-images' ? 'text-dark' : ''}
            onClick={() => navigate('/labeled-images')}
          >
            Labeled images
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav>
            {children}{' '}
            <CustomModal
              activateButtonClassName="mx-5 mb-3"
              activateButtonText="Upload image"
              body={<UploadImageForm />}
              title="Upload image"
            />
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
