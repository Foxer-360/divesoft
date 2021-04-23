import * as React from 'react';
import HeaderLogo from '@source/partials/HeaderLogo';
import Subtitle from '../Subtitle';
import OrderLink from '../OrderLink';

interface IProps {
  productName: string;
  productUrl: string;
}

const MicrositeHeader = ({ productName, productUrl }: IProps) => {
  return (
    <header className="productMicrosite__header">
      <HeaderLogo url="/en" />
      <Subtitle>{productName}</Subtitle>
      <OrderLink url={productUrl} />
    </header>
  );
};

export default MicrositeHeader;
