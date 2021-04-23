import * as React from 'react';
import HeaderLogo from '@source/partials/HeaderLogo';
import Button from '@source/partials/Button';
import Subtitle from '../MicrositeContent/Subtitle';

interface IProps {
  productName: string;
  productUrl: string;
}

const MicrositeHeader = ({ productName, productUrl }: IProps) => {
  return (
    <header className="productMicrosite__header">
      <HeaderLogo url="/en" />
      <Subtitle>{productName}</Subtitle>
      <a href={productUrl} target="__blank">
        <Button>Objednat</Button>
      </a>
    </header>
  );
};

export default MicrositeHeader;
