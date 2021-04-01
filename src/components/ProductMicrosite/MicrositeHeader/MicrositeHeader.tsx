import * as React from 'react';
import HeaderLogo from '@source/partials/HeaderLogo';
import Button from '@source/partials/Button';

const MicrositeHeader = () => {
  return (
    <header className="productMicrosite__header">
      <HeaderLogo url="/en" />
      <Button>Objednat</Button>
    </header>
  );
};

export default MicrositeHeader;
