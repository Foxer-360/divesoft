import * as React from 'react';
import HeaderLogo from '@source/partials/HeaderLogo';
import Button from '@source/partials/Button';
import HeaderNav from './HeaderNav';

const links = [
  {
    title: 'Odkaz 1',
    url: '/en',
  },
  {
    title: 'Odkaz 1',
    url: '/en',
  },
  {
    title: 'Odkaz 1',
    url: '/en',
  },
];

const MicrositeHeader = () => {
  return (
    <header className="productMicrosite__header">
      <HeaderLogo url="/en" />
      <HeaderNav links={links} />
      <Button>Objednat</Button>
    </header>
  );
};

export default MicrositeHeader;
