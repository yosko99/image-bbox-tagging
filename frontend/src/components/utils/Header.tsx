import React, { ReactNode } from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

const Header = ({ children }: Props) => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  return (
    <div className="bg-dark w-100 text-white d-flex align-items-center py-2 justify-content-between px-3 fs-3 m-0">
      <div className="d-flex">
        <p className="m-0">Image bbox tagging</p>
        <Button
          variant="info"
          disabled={pathname === '/'}
          className="mx-3"
          onClick={() => navigate('/')}
        >
          Label images
        </Button>
        <Button
          variant="info"
          disabled={pathname === '/labeled-images'}
          onClick={() => navigate('/labeled-images')}
        >
          See labeled images
        </Button>
      </div>
      {children}
    </div>
  );
};

export default Header;
